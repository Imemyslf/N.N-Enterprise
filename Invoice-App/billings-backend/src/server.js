import express from "express";
import { db, connectToDb } from "./database.js";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import nodemailer from "nodemailer";
import os from "os";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import companyRoute from "./route/companyRoute.js";
import materialRoute from "./route/materialRoute.js";
import billingRoute from "./route/billingRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

// console.log(process.env.USER_EMAIL);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

const dirPDF = path.join(path.join(os.homedir(), "Downloads"), "Invoice");

if (!fs.existsSync(dirPDF)) {
  fs.mkdirSync(dirPDF, { recursive: true }); // Ensures that nested directories are created
  console.log("Invoice directory created successfully at", dirPDF);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirPDF);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".pdf";
    console.log("File original name", file.originalname);
    console.log("Date now + ext", file.originalname + ext);
    cb(null, file.originalname + ext);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.post(`/api/invoice/upload`, upload.single("file"), async (req, res) => {
  console.log("Inside");
  try {
    if (!req.file) {
      return res.status(400).send("No file Uploaded");
    }

    const filePath = req.file.path;
    console.log("File uploaded successfully at  ", filePath);

    const invoiceNos = req.body.invoiceNos;
    console.log("Inovoice Nos", invoiceNos);

    const extraInfo = JSON.parse(req.body.ExtraInfo);
    console.log("Extra Info:- \n", extraInfo);

    if (extraInfo) {
      try {
        const result = await db.collection("billings").updateOne(
          { invoiceNos: invoiceNos },
          {
            $set: {
              vehicleNos: extraInfo.vehicleNos,
              orderNos: extraInfo.orderNos,
              dueDate: extraInfo.dueDate,
            },
          }
        );
        if (result.modifiedCount > 0) {
          console.log("Extra info updated successfully");
        } else {
          console.log("No matching invoice found or no changes made");
        }
      } catch (e) {
        console.log("Error while updating extra info", e);
      }
    }

    const invoiceInfo = await db
      .collection("billings")
      .findOne({ invoiceNos: invoiceNos });
    if (invoiceInfo) {
      if (invoiceInfo.invoiceGenerated === true) {
        console.log("Invoice Generated");
        return res.status(200).send({ message: "Invoice Already Generated" });
      } else {
        const result = await db
          .collection("billings")
          .updateOne(
            { invoiceNos: invoiceNos },
            { $set: { invoiceGenerated: true } }
          );
        if (result.acknowledged) {
          console.log("Invoice updated successfully");
          return res.status(200).send({
            message: "Invoice Genrated Successfully",
            path: "DownloadsInvoice",
          });
        } else {
          console.log("Invoice updatedaion failed");
          return res.status(500).send("Invoice update failed");
        }
      }
    } else {
      console.log("Invoice not found");
      return res.status(404).send("Invoice not found");
    }

    res.status(200).send("Invoice updated and file uploaded successfully");
  } catch (e) {
    console.log(`Error message: \n ${e.message}`);
    res.status(500).send("Interna Server Error");
  }
});


app.use(`/api/company`,companyRoute);
app.use(`/api/materials`,materialRoute);
app.use(`/api/billings`,billingRoute);

app.get(`/api/company`, async (req, res) => {
  console.log(`inside company`);
  const company = await db.collection("company").find({}).toArray();
  if (company.length > 0) {
    console.log(company);
    res.json(company);
  } else {
    res.sendStatus(404);
  }
});

//Material List Name(GET)
app.get(`/api/materials`, async (req, res) => {
  const materials = await db.collection("materials").find().toArray();
  if (materials.length > 0) {
    console.log(materials);
    res.send(materials);
  } else {
    res.sendStatus(404);
  }
});

//Billing List Name(GET)
app.get(`/api/billings`, async (req, res) => {
  const billings = await db.collection("billings").find({}).toArray();
  if (billings.length > 0) {
    // console.log(billings);
    res.send(billings);
  } else {
    res.sendStatus(404);
  }
});


const getNextInvoiceNos = async () => {
  const result = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: "invoiceNos" },
      { $inc: { seq: 1 } },
      { returnOriginal: false }
    );

  return result.seq;
};

const retrieveInvoice = async (invoiceFileName) => {
  // const homeDir = os.homedir();
  // const downloadsDir = path.join(homeDir, "Downloads", "Invoice");
  const invoicePath = path.join(dirPDF, invoiceFileName);

  try {
    // Check if the file exists
    const result = await fs.promises.access(invoicePath); // Use promises for cleaner async/await handling

    if (result) {
      console.log(`Invoice ${invoiceFileName} read successfully.`);
    } else {
      console.log(`Invoice ${invoiceFileName} read not  successfully.`);
    }

    // Return the path instead of the buffer
    return invoicePath;
  } catch (error) {
    console.error(`Error retrieving invoice: ${error.message}`);
    return null;
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

app.get(`/api/sendMail`, async (req, res) => {
  const { email, invoice } = req.query;
  console.log(email, invoice);

  const file = await retrieveInvoice(`${invoice}.pdf`);

  if (file) {
    console.log("File found");
  }

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: "Invoice",
    attachments: [{ filename: `${invoice}.pdf`, path: file }],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent mail successfully");
      res.status(200).send(`Email received ${email}`);
    }
  });
});

const deductDay = async () => {
  try {
    const response = await db.collection("billings").find({}).toArray();
    if (response.length > 0) {
      const currentDate = new Date();
      for (const billInfo of response) {
        const date = billInfo.date.split("/");
        const old_date = new Date(date[2], date[1] - 1, date[0]);
        const timeDiff = Math.floor(
          (currentDate - old_date) / (1000 * 60 * 60 * 24)
        );

        const dayLeft = 31 - timeDiff;

        if (timeDiff <= 31) {
          await db
            .collection("billings")
            .updateOne(
              { invoiceNos: billInfo.invoiceNos },
              { $set: { daysLeft: dayLeft } }
            );
        }

        if (billInfo.daysLeft === 0) {
          await db
            .collection("billings")
            .deleteOne({ invoiceNos: billInfo.invoiceNos });

          console.log(`Invoice deleted: ${billInfo.invoiceNos}`);
        }
        console.log(`${billInfo.invoiceNos}:- ${billInfo.daysLeft}`);
      }
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

//Checking db connect and server connection.
connectToDb(() => {
  console.log("Successfully connected to Database");
  deductDay();
  app.listen(port, "localhost", () => {
    console.log(`listening on port ${port}`);
  });
});
