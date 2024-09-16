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

const billings = [
  {
    companyName: "abc",
    GSTNos: "123456789",
    email: "abc@gmail.com",
    stateCode: 30,
    companyMaterials: [
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
    ],
    date: "15/09/2024 ",
    timing: "07:08:54 PM",
  },
  {
    companyName: "xyz",
    GSTNos: "135791113",
    email: "xyz@gmail.com",
    stateCode: 30,
    companyMaterials: [
      {
        name: "metal",
        rate: 30,
        kg: 0,
      },
      {
        name: "plastic",
        rate: 20,
        kg: 0,
      },
    ],
    date: "15/09/2024 ",
    timing: "08:08:54 PM",
  },
];

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
    res.sendStatus(404);
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
    res.sendStatus(404);
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

  const response = billings.find(
    (cName) => cName.companyName.toLowerCase() === companyName.toLowerCase()
  );

  if (response) {
    console.log(response);
    res.send(response);
  } else {
    res.sendStatus(404);
  }
});

app.post(`/api/billings`, (req, res) => {
  const { companyName, companyMaterials } = req.body;

  const billing = billings.find(
    (c) => c.companyName.toLowerCase() === companyName.toLowerCase()
  );

  if (billing) {
    res.status(400).send(`Company bills already exists!!`);
  } else {
    const companyInfo = company.find(
      (c) => c.name.toLowerCase() === companyName.toLowerCase()
    );
    if (!companyInfo) {
      res.status(400).send("Company does not exist");
      return;
    }
    const { GSTNos, email, stateCode } = companyInfo;
    console.log(companyName, GSTNos, email, stateCode, materials);
    const updatedMaterials = [];

    for (let i = 0; i < companyMaterials.length; i++) {
      const materialName = companyMaterials[i];
      const material = materials.find(
        (m) => m.name.toLowerCase() === materialName.toLowerCase()
      );

      if (!material) {
        res.status(400).send(`Material ${materialName} does not exist`);
        return;
      }
      updatedMaterials.push(material);
    }

    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const newBill = {
      companyName,
      GSTNos,
      email,
      stateCode,
      companyMaterials: updatedMaterials,
      date,
      time,
    };
    billings.push(newBill);
    res.status(201).send(newBill);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
