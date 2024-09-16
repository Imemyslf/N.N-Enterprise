import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const company = [
  {
    name: "abc",
    GSTNos: "123456789",
    email: "abc@gmail.com",
    stateCode: 30,
  },
  {
    name: "xyz",
    GSTNos: "135791113",
    email: "xyz@gmail.com",
    stateCode: 30,
  },
];

const materials = [
  {
    name: "metal",
    rate: 30,
    kg: 0,
  },
  {
    name: "cardboard",
    rate: 20,
    kg: 0,
  },
  {
    name: "plastic",
    rate: 20,
    kg: 0,
  },
];

const billings = [];

app.get(`/api/company`, (req, res) => {
  if (company.length > 0) {
    console.log(company);
    res.send(company);
  } else {
    res.sendStatus(404);
  }
});

app.get(`/api/company/:companyName`, (req, res) => {
  const { companyName } = req.params;

  const response = company.find(
    (cName) => cName.name.toLowerCase() === companyName.toLowerCase()
  );

  if (response) {
    console.log(response);
    res.send(response);
  } else {
    res.status(404).send(`Company ${companyName} is not found`);
  }
});

app.post(`/api/company`, (req, res) => {
  const { name, GSTNos, email, stateCode } = req.body;
  console.log(name, GSTNos, email, stateCode);

  const comp = company.filter(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  if (comp.length > 0) {
    res.status(400).send(`Company already exists!!`);
  } else {
    const newComp = { name, GSTNos, email, stateCode };
    company.push(newComp);
    res.status(201).send(newComp);
  }
});

app.get(`/api/materials`, (req, res) => {
  if (materials.length > 0) {
    console.log(materials);
    res.send(materials);
  } else {
    res.sendStatus(404);
  }
});

app.get(`/api/materials/:materialName`, (req, res) => {
  const { materialName } = req.params;

  const response = materials.find(
    (mName) => mName.name.toLowerCase() === materialName.toLowerCase()
  );

  if (response) {
    console.log(response);
    res.send(response);
  } else {
    res.status(404).send(`Material ${materialName} is not found`);
  }
});

app.post(`/api/materials`, (req, res) => {
  const { name, rate, kg } = req.body;
  console.log(name, rate, kg);

  const mate = materials.filter(
    (m) => m.name.toLowerCase() === name.toLowerCase()
  );

  if (mate.length > 0) {
    res.status(400).send(`Material already exists!!`);
  } else {
    const newMate = { name, rate, kg };
    materials.push(newMate);
    res.status(201).send(newMate);
  }
});

app.get(`/api/billings`, (req, res) => {
  if (billings.length > 0) {
    console.log(billings);
    res.send(billings);
  } else {
    res.sendStatus(404);
  }
});

app.get(`/api/billings/:companyName`, (req, res) => {
  const { companyName } = req.params;

  const response = billings.filter(
    (cName) => cName.companyName.toLowerCase() === companyName.toLowerCase()
  );

  if (response.length > 0) {
    console.log(response);
    res.json(response);
  } else {
    res.status(404).send(`Company ${companyName} is not found`);
  }
});

app.get(`/api/billings/invoice/:invoiceNos`, (req, res) => {
  let { invoiceNos } = req.params;
  invoiceNos = parseInt(invoiceNos, 10);
  console.log(`invoiceNos;- ${invoiceNos}`);

  if (isNaN(invoiceNos)) {
    return res.status(400).send("Invalid invoice number");
  }

  const response = billings.filter(
    (cInvoice) => cInvoice.invoiceNos === invoiceNos
  );

  if (response.length > 0) {
    console.log(response);
    res.json(response);
  } else {
    res.status(404).send(`Invoice nos ${invoiceNos} not found`);
  }
});

app.post(`/api/billings`, (req, res) => {
  const { companyName, companyMaterials } = req.body;

  const companyInfo = company.find(
    (c) => c.name.toLowerCase() === companyName.toLowerCase()
  );

  if (!companyInfo) {
    return res.status(400).send("Company does not exist");
  }

  const { GSTNos, email, stateCode } = companyInfo;

  // Validate and update materials
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

  // Create the new bill
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
