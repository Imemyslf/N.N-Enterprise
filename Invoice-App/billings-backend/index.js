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
import downloadsFolder from "downloads-folder";

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(express.json());

console.log(process.env.USER_EMAIL);
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

//Company List Name(GET)
app.get(`/api/company`, async (req, res) => {
  const company = await db.collection("company").find().toArray();
  if (company.length > 0) {
    console.log(company);
    res.json(company);
  } else {
    res.sendStatus(404);
  }
});

//Specific Company Name Search(GET)
app.get(`/api/company/search/:name`, async (req, res) => {
  let { name } = req.params;
  name = name.trim();

  try {
    const response = await db
      .collection("company")
      // .find({ name: { $regex: name, $options: "i" } })
      .find({ name: { $regex: name } })
      .toArray();
    console.log(`Company data found: ${JSON.stringify(response)}`);
    if (response.length > 0) {
      console.log(response);
      res.send(response);
    } else {
      res.status(404).send(`No companies found matching ${name}`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(`Server error ${e}`);
  }
});

//Insertion of Company(POST)
app.post(`/api/company/insert`, async (req, res) => {
  let { name, address, GSTNos, email, stateCode } = req.body;
  console.log(name, address, GSTNos, email, stateCode);

  name = name.trim();
  address = address.trim();
  GSTNos = GSTNos.trim();
  email = email.trim();
  stateCode = parseInt(stateCode, 10);

  const response = await db.collection("company").findOne({ name });

  if (response) {
    res.status(400).send(`Company already exists!!`);
  } else {
    const newComp = { name, address, GSTNos, email, stateCode };
    const result = await db.collection("company").insertOne(newComp);
    console.log(result);
    if (result.acknowledged) {
      console.log(result.acknowledged);
      console.log(`Successfully added`);
      res.status(200).send(newComp);
    } else {
      res.status(500).send("Failed to insert the company");
    }
  }
});

app.put(`/api/company/update`, async (req, res) => {
  let { _id, name, address, GSTNos, email, stateCode } = req.body;
  console.log(
    "Before Update:- \n",
    _id,
    name,
    address,
    GSTNos,
    email,
    stateCode
  );

  console.log("Object id:- ", new ObjectId(_id));

  if (!ObjectId.isValid(_id)) {
    console.log("Invalid Id", id);
    return res.status(400).send("Invalid company ID");
  }

  _id = new ObjectId(_id);
  console.log("Object id:-", _id);
  name = name.trim();
  address = address.trim();
  GSTNos = GSTNos.trim();
  email = email.trim();
  stateCode = parseInt(stateCode, 10);

  try {
    console.log("Inside try");
    const update = await db
      .collection("company")
      .findOneAndUpdate(
        { _id: _id },
        { $set: { name, address, GSTNos, email, stateCode } },
        { returnOriginal: true }
      );
    console.log(update);
    if (update) {
      console.log("After update:- \n", update);
      res.status(200).json(update);
    }
  } catch (e) {
    console.log("Error in server", e.message);
  }
});

//Deletion of speific company
app.delete("/api/company/delete/:name", async (req, res) => {
  const { name } = req.params;
  console.log(`inside delete company:- `, name);
  try {
    const result = await db.collection("company").deleteOne({ name });
    if (result.deletedCount === 0) {
      res.status(200).send({ message: "No documents to be deleted" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Deletion of all Companies
app.delete("/api/company/detele", async (req, res) => {
  try {
    const result = await db.collection("company").deleteMany({});
    if (result.deletedCount === 0) {
      res.status(200).send({ message: "No documents to be deleted" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

//Sorting of Company List
app.get(`/api/company/sort`, async (req, res) => {
  console.log(`inside sort`);
  const { methods, sorting } = req.query; // Using req.query for query parameters
  const sort = sorting === "asc" ? 1 : -1;

  let type = "";

  if (methods === "stateCode") {
    type = "stateCode";
  } else if (methods === "GSTNos") {
    type = "GSTNos";
  } else if (methods === "email") {
    type = "email";
  } else {
    type = "name"; // default to name
  }

  try {
    const companies = await db
      .collection("company")
      .find({})
      .sort({ [type]: sort }) // Use [type] for dynamic field sorting
      .toArray();

    console.log(`companies:- \n`, companies);
    if (companies.length > 0) {
      res.send(companies);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err.message);
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

//Material Company Name Search(GET)
app.get(`/api/materials/search/:name`, async (req, res) => {
  let { name } = req.params;
  console.log(name);
  name = name.trim();
  try {
    const response = await db
      .collection("materials")
      .find({ name: { $regex: name, $options: "i" } })
      .toArray();
    console.log(response);
    console.log(`Materials data found: ${JSON.stringify(response)}`);

    if (response.length > 0) {
      console.log(response);
      res.send(response);
    } else {
      res.status(404).send(`No materials found matching ${name}`);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server error ${err}`);
  }
});

//Insertion of Material(POST)
app.post(`/api/materials/insert`, async (req, res) => {
  let { name, rate, kg } = req.body;
  console.log(name, rate, kg);

  name = name.trim();
  rate = parseInt(rate.trim(), 10);
  kg = parseInt(kg.trim(), 10);

  const response = await db.collection("materials").findOne({ name });

  if (response) {
    res.status(400).send(`Material already exists!!`);
  } else {
    let newName = "";
    for (let i = 0; i < name.length; i++) {
      i === 0 ? (newName += name[i].toUpperCase()) : (newName += name[i]);
    }
    console.log(newName);
    const newMate = { name: newName, rate, kg };
    console.log(newMate);
    const result = await db.collection("materials").insertOne(newMate);

    if (result.acknowledged) {
      console.log("Material Added successfully");
      res.status(201).send(newMate);
    } else {
      res.status(500).send(`Failed to insert the materials`);
    }
  }
});

app.put(`/api/materials/update`, async (req, res) => {
  let { _id, name, rate, kg } = req.body;
  console.log("Before Update:- \n", _id, name, rate, kg);

  console.log("Object id:- ", new ObjectId(_id));

  if (!ObjectId.isValid(_id)) {
    console.log("Invalid Id", id);
    return res.status(400).send("Invalid company ID");
  }

  _id = new ObjectId(_id);
  console.log("Object id:-", _id);
  name = name.trim();

  try {
    console.log("Inside try");
    const update = await db
      .collection("materials")
      .findOneAndUpdate(
        { _id: _id },
        { $set: { name, rate, kg } },
        { returnOriginal: true }
      );
    console.log(update);
    if (update) {
      console.log("After update:- \n", update);
      res.status(200).json(update);
    }
  } catch (e) {
    console.log("Error in server", e.message);
  }
});

//deletion of materials
app.delete("/api/materials/delete", async (req, res) => {
  try {
    const result = await db.collection("materials").deleteMany({});
    if (result.deletedCount === 0) {
      res.status(200).send({ message: "No documents to be deleted" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

//deletion of specific material
app.delete("/api/materials/delete/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const result = await db.collection("materials").deleteOne({ name });
    if (result.deletedCount === 0) {
      res.status(200).send({ message: "No documents to be deleted" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.get(`/api/materials/sort`, async (req, res) => {
  console.log(`inside sort`);
  const { methods, sorting } = req.query; // Using req.query for query parameters
  const sort = sorting === "asc" ? 1 : -1;

  let type = "";

  if (methods === "rate") {
    type = "rate";
  } else {
    type = "name"; // default to name
  }

  try {
    const materials = await db
      .collection("materials")
      .find({})
      .sort({ [type]: sort }) // Use [type] for dynamic field sorting
      .toArray();

    console.log(`materials:- \n`, materials);
    if (materials.length > 0) {
      res.send(materials);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err.message);
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

//Specific Invoice Billing Search(GET)
app.get(`/api/billings/invoice/search/:invoiceNos`, async (req, res) => {
  let { invoiceNos } = req.params;
  console.log(`invoiceNos;- ${invoiceNos}`);

  const response = await db.collection("billings").findOne({ invoiceNos });

  if (response) {
    console.log(response);
    res.json(response);
  } else {
    res.status(404).send(`Invoice nos ${invoiceNos} not found`);
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

//Insertion Billings For The Companies(POST)
app.post(`/api/billings/insert`, async (req, res) => {
  console.log("Request Body:", req.body);
  let { companyName, companyMaterials } = req.body;
  companyName = companyName.trim();

  if (!companyName || !Array.isArray(companyMaterials)) {
    return res.status(400).send("Missing required fields");
  }

  console.log(companyName, companyMaterials);

  const companyInfo = await db
    .collection("company")
    .findOne({ name: { $regex: new RegExp(companyName, "i") } });

  if (!companyInfo) {
    console.log(` Companyinfo failed:- ${companyInfo}`);
    return res.status(400).send("Company does not exist");
  }
  console.log(`Company info insdie insert`, companyInfo);

  const updatedMaterials = [];
  for (let i = 0; i < companyMaterials.length; i++) {
    let { name, kg } = companyMaterials[i];
    name = name.trim();
    kg = parseInt(kg, 10);

    const material = await db
      .collection("materials")
      .findOne({ name: { $regex: new RegExp(name, "i") } });
    console.log(`Materials inside insert`, material);
    if (!material) {
      return res.status(400).send(`Material ${name} does not exist`);
    }

    const { _id, ...restOfMaterials } = material;
    updatedMaterials.push({ ...restOfMaterials, kg: kg });
  }

  console.log(`\n\nFinal updatedMaterials:- `, updatedMaterials);
  const newInvoiceNos = await getNextInvoiceNos();
  const daysLeft = 365;
  const invoiceGenerated = false;

  const { _id, name, ...restOfCompanyInfo } = companyInfo;

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const newBill = {
    invoiceNos: newInvoiceNos.toString(),
    companyName,
    ...restOfCompanyInfo,
    companyMaterials: updatedMaterials,
    date,
    time,
    daysLeft,
    invoiceGenerated,
  };

  console.log(`\n\nNewbill:- `, newBill);
  try {
    const result = await db.collection("billings").insertOne(newBill);
    // console.log(`Result:- ${JSON.stringify(result, null, 2)}}`);

    if (result.acknowledged) {
      // console.log(result.acknowledged);
      res.status(201).send(newBill);
    } else {
      console.log(result.status);
      res.status(500).send(`Failed to insert the materials`);
    }
  } catch (err) {
    console.error("Error during insertion:", err); // Log error details
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/billings/delete/:invoiceNos", async (req, res) => {
  let { invoiceNos } = req.params;
  console.log(`invoice nos inside delete:- `, invoiceNos);
  try {
    const result = await db
      .collection("billings")
      .deleteOne({ invoiceNos: invoiceNos });

    console.log(`result after deletion`, result);

    if (result.deletedCount === 0) {
      return res.status(200).send(result);
    }
    console.log("Deleted successfully");
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.delete("/api/billings/detele", async (req, res) => {
  try {
    const result = await db.collection("billings").deleteMany({});
    if (result.deletedCount === 0) {
      res.status(200).send({ message: "No documents to be deleted" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.put(`/api/billings/paid/:invoiceNos`, async (req, res) => {
  console.log("inside paid");
  const { invoiceNos } = req.params;
  // const new_invoice = parseInt(invoiceNos, 10);
  try {
    const response = await db
      .collection("billings")
      .updateOne(
        { invoiceNos: invoiceNos },
        { $set: { invoiceGenerated: true } }
      );

    if (response.acknowledged) {
      console.log(`inside paid:-`, response);
      res.status(200).send(response);
    } else {
      res.status(400).send({ message: "Error updating billings" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

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

        const dayLeft = 365 - timeDiff;

        if (timeDiff <= 365) {
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
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
