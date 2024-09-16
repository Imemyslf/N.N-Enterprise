import express from 'express';


const app = express();
const port = 8000;


app.use(express.json());

const company = [
    {
        "name": 'abc',
        "GSTNos": '123456789',
        "email": 'abc@gmail.com',
        "stateCode": 30
    },
    {
        "name": 'xyz',
        "GSTNos": '135791113',
        "email": 'xyz@gmail.com',
        "stateCode": 30
    },
]

app.get(`/api/company`,(req,res) => {
    if (company.length > 0){
        console.log(company);
        res.send(company);
    }
    else {
        res.sendStatus(404);
    }
});

app.get(`/api/company/:companyName`,(req,res) => {
    const { companyName } = req.params;

    const response = company.find(cName => cName.name === companyName);

    if (response){
        console.log(response);
        res.send(response);
    }
    else {
        res.sendStatus(404);
    }
});

app.post(`/api/company`,(req,res) => {
    const { name,GSTNos, email, stateCode } = req.body;
    console.log(name,GSTNos,email,stateCode);

    const comp = company.filter(c => c.name === name);

    if (comp.length > 0) {
        res.sendStatus(400).send(`Company already exists!!`);
    }
    else{
        const newComp = { name, GSTNos, email, stateCode };
        company.push(newComp);
        res.sendStatus(201).send(newComp);
    }
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});