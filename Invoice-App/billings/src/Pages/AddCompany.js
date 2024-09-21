import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import "../styles/Company.css";

const Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyGST, setCompanyGST] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyStateCode, setCompanyStateCode] = useState("");
  const [validated, setValidated] = useState(false); // validation useState. . .

  /* Validation source */
    // const handleSubmit = (event) => {
    //   const form = event.currentTarget;
    //   if (form.checkValidity() === false) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //   }
    //   setValidated(true);
    // };

  const handleSubmitt = async () => {
    try {
      const inputs = {
        name: companyName,
        GSTNos: companyGST,
        email: companyEmail,
        stateCode: companyStateCode,
      };
      const response = await axios.post(
        `http://localhost:8000/api/company`,
        inputs
      );

      if (response.status === 200) {
        console.log(`Company Added Succesfully`);
        alert(`Company Added Succesfully`);
      }
    } catch (err) {
      console.error("Error submitting data:", err);
    }
  };

  return (
    <>
      <Form
        className="form-container"
        noValidate
        validated={validated}
        // onSubmit={handleSubmit}
      >
        <h3 className="form-header">ADD NEW COMPANY</h3>
        <Col sm="12">
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCompanyName">
              <Form.Label>Company name</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={companyName}
                  placeholder="Eg:- N.N Enterprises"
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCompanyGSTNo">
              <Form.Label>Company GSTIN no.</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={companyGST}
                  placeholder="Eg:- 30ABXYP2839XYZ"
                  onChange={(e) => setCompanyGST(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
          </Row>
        </Col>
        <Col sm="9">
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCompanyEmail">
              <Form.Label>Company email</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  value={companyEmail}
                  placeholder="Eg:- Maysurtraders-goa@gmail.com"
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formGridStateCode">
              <Form.Label>Company state code</Form.Label>
              <Form.Control
                type="number"
                value={companyStateCode}
                placeholder="Eg:- 35"
                onChange={(e) => setCompanyStateCode(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
        </Col>

        <Button variant="primary" onClick={handleSubmitt}>
          SUBMIT
        </Button>
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
