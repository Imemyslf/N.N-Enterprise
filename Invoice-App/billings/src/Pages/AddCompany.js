import { useState } from "react";
import { Input } from "../Components/Input";
import { Label } from "../Components/Label";
import { Button, Form, Row, Col } from "react-bootstrap";
import "../styles/Company.css";

const Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyGST, setCompanyGST] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyStateCode, setCompanyStateCode] = useState("");
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false); // validation useState. . .

  const displayName = (e) => {
    e.preventDefault();
    const obj = [companyName, companyEmail, companyGST, companyStateCode];
    setName(obj);
  };

  /* Validation source */
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if(form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      <Form className="form-container" noValidate validated={validated} onSubmit={handleSubmit}>
        <h3 className="form-header">ADD NEW COMPANY</h3>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCompanyName">
            <Form.Label>Company name</Form.Label>
            <Form.Control type="text" placeholder="N.N Enterprises" change={(e) => setCompanyName(e.target.value)} required />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCompanyGSTNo">
            <Form.Label>Company GSTIN no.</Form.Label>
            <Form.Control type="text" placeholder="30ABXYP2839XYZ" change={(e) => setCompanyGST(e.target.value)} required />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="formGridCompanyEmail">
            <Form.Label>Company email</Form.Label>
            <Form.Control type="email" placeholder="Maysurtraders-goa@gmail.com" change={(e) => setCompanyEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="formGridStateCode">
            <Form.Label>Company state code</Form.Label>
            <Form.Control type="number" placeholder="35" change={(e) => setCompanyStateCode(e.target.value)} required />
          </Form.Group>
        </Row>
        
        <Button variant="primary" type="submit">SUBMIT</Button>
      </Form>

      {/* <h1>{name}</h1>
      <form action="">
        <Label name="Company's Name:-" /> <br />
        <Input
          type="text"
          placeholder="Enter Company's name"
          value={companyName}
          change={(e) => setCompanyName(e.target.value)}
        />
        <br />
        <Label name="Company's GST Nos:-" /> <br />
        <Input
          type="text"
          placeholder="Enter Company's GST Nos"
          value={companyGST}
          change={(e) => setCompanyGST(e.target.value)}
        />
        <br />
        <Label name="Company's Email:-" /> <br />
        <Input
          type="text"
          placeholder="Enter Company's name"
          value={companyEmail}
          change={(e) => setCompanyEmail(e.target.value)}
        />
        <br />
        <Label name="Company's GST Nos:-" /> <br />
        <Input
          type="text"
          placeholder="Enter Company's name"
          value={companyStateCode}
          change={(e) => setCompanyStateCode(e.target.value)}
        />
        <br />
        <br />
        <button onClick={displayName}>Click Me!!</button>
      </form> */}
    </>
  );
};

export default Company;
