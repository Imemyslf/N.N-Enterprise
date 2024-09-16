import express from "express";
import { db, connectToDb } from "./database.js";

const app = express();
const port = 8000;

app.use(express.json());

//Company List Name(GET)
app.get(`/api/company`, async (req, res) => {
  const company = await db.collection("company").find().toArray();
  if (company.length > 0) {
    console.log(company);
    res.send(company);
  } else {
    res.sendStatus(404);
  }
});

//Specific Company Name Search(GET)
app.get(`/api/company/:name`, async (req, res) => {
  let { name } = req.params;
  name = name.toLowerCase();

  const response = await db.collection("company").findOne({ name });
  console.log(`Company data found: ${JSON.stringify(response)}`);
  if (response) {
    console.log(response);
    res.json(response);
  } else {
    res.status(404).send(`Company ${name} is not found`);
  }
});

//Insertion of Company(POST)
app.post(`/api/company`, async (req, res) => {
  const { name, GSTNos, email, stateCode } = req.body;
  console.log(name, GSTNos, email, stateCode);

  const response = await db
    .collection("company")
    .findOne({ name: new RegExp(`^${name}`, "i") });

  if (response) {
    res.status(400).send(`Company already exists!!`);
  } else {
    const newComp = { name, GSTNos, email, stateCode };
    const result = await db.collection("company").insertOne(newComp);

    if (result.acknowledged) {
      console.log(result.acknowledged);
      console.log(`Successfully added`);
      res.status(201).send(newComp);
    } else {
      res.status(500).send("Failed to insert the company");
    }
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
app.get(`/api/materials/:name`, async (req, res) => {
  let { name } = req.params;
  console.log(name);
  name = name.toLowerCase();

  const response = await db.collection("materials").findOne({ name });
  console.log(`Materials data found: ${JSON.stringify(response)}`);

  if (response) {
    console.log(response);
    res.send(response);
  } else {
    res.status(404).send(`Material ${name} is not found`);
  }
});

//Insertion of Material(POST)
app.post(`/api/materials`, async (req, res) => {
  const { name, rate, kg } = req.body;
  console.log(name, rate, kg);

  const response = await db
    .collection("materials")
    .findOne({ name: new RegExp(`^${name}$`, "i") });

  if (response) {
    res.status(400).send(`Material already exists!!`);
  } else {
    const newMate = { name, rate, kg };
    const result = await db.collection("materials").insertOne(newMate);

    if (result.acknowledged) {
      console.log("Material Added successfully");
      res.status(201).send(newMate);
    } else {
      res.status(500).send(`Failed to insert the materials`);
    }
  }
});

//Billing List Name(GET)
app.get(`/api/billings`, async (req, res) => {
  const billings = await db.collection("billings").find().toArray();
  if (billings.length > 0) {
    console.log(billings);
    res.send(billings);
  } else {
    res.sendStatus(404);
  }
});

//Specific Comapny Billing Search(GET)
app.get(`/api/billings/company/:name`, async (req, res) => {
  const { name } = req.params;

  const response = await db
    .collection("billings")
    .findOne({ companyName: name });

  if (response) {
    console.log(response);
    res.json(response);
  } else {
    res.status(404).send(`Company ${name} is not found`);
  }
});

//Specific Invoice Billing Search(GET)
app.get(`/api/billings/invoice/:invoiceNos`, async (req, res) => {
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
app.post(`/api/billings`, (req, res) => {
  const { companyName, companyMaterials } = req.body;

  const companyInfo = company.find(
    (c) => c.name.toLowerCase() === companyName.toLowerCase()
  );

  if (!companyInfo) {
    return res.status(400).send("Company does not exist");
  }

  const { GSTNos, email, stateCode } = companyInfo;

  const updatedMaterials = [];
  for (let i = 0; i < companyMaterials.length; i++) {
    const { name, kg } = companyMaterials[i];
    const material = materials.find(
      (m) => m.name.toLowerCase() === name.toLowerCase()
    );

    if (!material) {
      return res.status(400).send(`Material ${name} does not exist`);
    }

    updatedMaterials.push({ ...material, kg });
  }

  const lastBill = billings[billings.length - 1];
  const newInvoiceNos = lastBill ? lastBill.invoiceNos + 1 : 240001;

  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const newBill = {
    companyName,
    invoiceNos: newInvoiceNos,
    GSTNos,
    email,
    stateCode,
    companyMaterials: updatedMaterials,
    date,
    time,
  };

  billings.push(newBill);
  res.status(201).send(newBill);
});

//Checking db connect and server connection.
connectToDb(() => {
  console.log("Successfully connected to Database");
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
