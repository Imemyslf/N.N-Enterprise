import { useState, useEffect } from "react";
import { Input } from "../Components/Input";
import { Label } from "../Components/Label";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import "../styles/Company.css";

const Company = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyGST, setCompanyGST] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyStateCode, setCompanyStateCode] = useState("");
  const [name, setName] = useState({});
  const [validated, setValidated] = useState(false); // validation useState. . .

  useEffect(() => {
    const companyInfo = async () => {
      const response = await axios.get(`http://localhost:8000/api/company/`);
      const data = response.data;
      console.log(data);
    };

    companyInfo();
  }, []);

  /* Validation source */
  //   const handleSubmit = (event) => {
  //     const form = event.currentTarget;
  //     if (form.checkValidity() === false) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //     }
  //     setValidated(true);
  //   };

  const handleSubmitt = () => {
    const inputs = [companyName, companyEmail, companyGST, companyStateCode];
    console.log(inputs);
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
<<<<<<< HEAD
        <Col sm="12">
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCompanyName">
              <Form.Label>Company name</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  //   value={companyName}
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
=======
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
>>>>>>> f79a7804fa433079165e0ec484f2077ea96ab153
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
