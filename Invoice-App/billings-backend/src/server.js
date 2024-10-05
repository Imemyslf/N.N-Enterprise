import express from "express";
import { db, connectToDb } from "./database.js";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";

const app = express();
const port = 8000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

if (!fs.existsSync("Invoice")) {
  fs.mkdirSync("Invoice");
  console.log("Invoice created successfully");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Invoice/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".pdf";
    console.log("File original name", file.originalname);
    console.log("Date now + ext", file.originalname + ext);
    cb(null, file.originalname + ext);
  },
});

const getNextInvoiceNos = async () => {
  const counterDoc = await db
    .collection("invoiceCounters")
    .findOneAndUpdate(
      { _id: "invoiceNos" },
      { $inc: { sequence_value: 1 } },
      { returnDocument: "after", upsert: true }
    );

  // Check if the document exists and has a sequence_value
  if (!counterDoc.value || !counterDoc.value.sequence_value) {
    // Initialize with a default starting number if not present
    const newDoc = await db
      .collection("invoiceCounters")
      .findOneAndUpdate(
        { _id: "invoiceNos" },
        { $set: { sequence_value: 240001 } },
        { returnDocument: "after", upsert: true }
      );
    return newDoc.value ? newDoc.value.sequence_value : 240001;
  }

  return counterDoc.value.sequence_value;
};

const upload = multer({ storage: storage });
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
      .findOne({ invoiceNos: parseInt(invoiceNos, 10) });
    if (invoiceInfo) {
      if (invoiceInfo.invoiceGenerated === true) {
        console.log("Invoice Generated");
      } else {
        const result = await db
          .collection("billings")
          .updateOne(
            { invoiceNos: parseInt(invoiceNos, 10) },
            { $set: { invoiceGenerated: true } }
          );
        if (result.acknowledged) {
          console.log("Invoice updated successfully");
        } else {
          console.log("Invoice updatedaion failed");
        }
      }
    } else {
      console.log("Invoice not found");
      return res.status(404).send("Invoice not found");
    }

    res.status(200).send("Invoice updated and file uploaded successfully");
  } catch (e) {
    console.log(`Error message: \n ${e.message}`);
    res.status(500).send("Internal Server Error");
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
      .find({ name: { $regex: name, $options: "i" } })
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
  let { name, GSTNos, email, stateCode } = req.body;
  console.log(name, GSTNos, email, stateCode);

  name = name.trim();
  GSTNos = GSTNos.trim();
  email = email.trim();
  stateCode = parseInt(stateCode, 10);

  const response = await db.collection("company").findOne({ name });

  if (response) {
    res.status(400).send(`Company already exists!!`);
  } else {
    const newComp = { name, GSTNos, email, stateCode };
    const result = await db.collection("company").insertOne(newComp);

    if (result.acknowledged) {
      console.log(result.acknowledged);
      console.log(`Successfully added`);
      res.status(200).send(newComp);
    } else {
      res.status(500).send("Failed to insert the company");
    }
  }
});

//deletion of speific company
app.delete("/api/company/delete/:name", async (req, res) => {
  const { name } = req.params;
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

//Billing List Name(GET)
app.get(`/api/billings`, async (req, res) => {
  const billings = await db.collection("billings").find().toArray();
  if (billings.length > 0) {
    // console.log(billings);
    res.send(billings);
  } else {
    res.sendStatus(404);
  }
});

//Specific Comapny Billing Search(GET)
app.get(`/api/billings/company/search/:companyName`, async (req, res) => {
  let { companyName } = req.params;

  companyName = companyName.trim();

  const response = await db.collection("billings").findOne({ companyName });

  if (response) {
    console.log(response);
    res.json(response);
  } else {
    res.status(404).send(`Company ${name} is not found`);
  }
});

//Specific Invoice Billing Search(GET)
app.get(`/api/billings/invoice/search/:invoiceNos`, async (req, res) => {
  let { invoiceNos } = req.params;
  invoiceNos = parseInt(invoiceNos, 10);
  console.log(`invoiceNos;- ${invoiceNos}`);

  if (isNaN(invoiceNos)) {
    return res.status(400).send("Invalid invoice number");
  }

  const response = await db.collection("billings").findOne({ invoiceNos });

  if (response) {
    console.log(response);
    res.json(response);
  } else {
    res.status(404).send(`Invoice nos ${invoiceNos} not found`);
  }
});

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
  console.log(companyInfo);
  // const { GSTNos, email, stateCode } = companyInfo;

  const updatedMaterials = [];
  for (let i = 0; i < companyMaterials.length; i++) {
    let { name, kg } = companyMaterials[i];
    name = name.trim();
    kg = parseInt(kg, 10);

    const material = await db
      .collection("materials")
      .findOne({ name: { $regex: new RegExp(name, "i") } });
    console.log(material);
    if (!material) {
      return res.status(400).send(`Material ${name} does not exist`);
    }

    const { _id, ...restOfMaterials } = material;
    updatedMaterials.push({ ...restOfMaterials, kg: kg });
  }

  console.log(`\n\nFinal updatedMaterials:- `, updatedMaterials);
  const lastBill = await db
    .collection("billings")
    .find()
    .sort({ invoiceNos: -1 })
    .limit(1)
    .toArray();
  // const newInvoiceNos = lastBill.length ? lastBill[0].invoiceNos + 1 : 240001;
  const newInvoiceNos = await getNextInvoiceNos();
  const daysLeft = 365;
  const invoiceGenerated = false;

  const { _id, name, ...restOfCompanyInfo } = companyInfo;

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const newBill = {
    invoiceNos: newInvoiceNos,
    companyName,
    ...restOfCompanyInfo,
    companyMaterials: updatedMaterials,
    date,
    time,
    daysLeft,
    invoiceGenerated,
  };

  console.log(`\n\nNewbill:- ${newBill}`);
  try {
    const result = await db.collection("billings").insertOne(newBill);
    // console.log(`Result:- ${JSON.stringify(result, null, 2)}}`);

    if (result.acknowledged) {
      console.log(result.acknowledged);
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

app.delete("/api/billings/delete", async (req, res) => {
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

app.delete("/api/billings/delete/:invoiceNos", async (req, res) => {
  let { invoiceNos } = req.params;
  invoiceNos = parseInt(invoiceNos, 10);
  try {
    const result = await db.collection("billings").deleteOne({ invoiceNos });
    if (result.deletedCount === 0) {
      res.status(200).send({ message: "No documents to be deleted" });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.put(`/api/billings/paid/:invoiceNos`, async (req, res) => {
  const { invoiceNos } = req.params;
  const new_invoice = parseInt(invoiceNos, 10);
  try {
    const response = await db
      .collection("billings")
      .updateOne(
        { invoiceNos: new_invoice },
        { $set: { invoiceGenerated: true } }
      );

    if (response.acknowledged) {
      console.log(response);
      res.status(200).send(response);
    } else {
      res.status(400).send({ message: "Error updating billings" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const deductDay = async () => {
  try {
    const response = await db.collection("billings").find().toArray();
    if (response.length > 0) {
      const currentDate = new Date();
      for (const billInfo of response) {
        const date = billInfo.date.split("/");
        const old_date = new Date(date[2], date[1] - 1, date[0]);
        const timeDiff = Math.floor(
          (currentDate - old_date) / (1000 * 60 * 60 * 24)
        );

        const dayLeft = 365 - timeDiff;

        if (timeDiff !== 365) {
          await db
            .collection("billings")
            .updateOne(
              { invoiceNos: billInfo.invoiceNos },
              { $set: { daysLeft: dayLeft } }
            );
        }

        if (timeDiff === 0) {
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
