import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";

export const AddCompanies = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyGST, setCompanyGST] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyStateCode, setCompanyStateCode] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmitt = async () => {
    try {
      const inputs = {
        name: companyName,
        address: companyAddress,
        GSTNos: companyGST,
        email: companyEmail,
        stateCode: companyStateCode,
      };

      const response = await axios.post(
        `http://localhost:8000/api/company/insert`,
        inputs
      );

      if (response.status === 200) {
        console.log(`Company Added Successfully`);
        alert(`Company Added Successfully`);
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
        style={{ width: "965px" }}
      >
        <h3 className="form-header">ADD NEW COMPANY</h3>
        <Col sm="12">
          {" "}
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCompanyName">
              <Form.Label>Company name</Form.Label>
              <Col sm="9">
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
              <Col sm="9">
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
          {" "}
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCompanyEmail">
              <Form.Label>Company email</Form.Label>
              <Col sm="9">
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

        <Row className="mb-4">
          <Form.Group as={Col} md="4">
            <Form.Label>Company Address</Form.Label>
            <Col sm="12">
              <Form.Control
                as="textarea"
                rows={3}
                type="email"
                value={companyAddress}
                placeholder="Eg:- Nerul,Bardez, Goa, 403114."
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
              />
            </Col>
          </Form.Group>
        </Row>

        <Button variant="primary" onClick={handleSubmitt}>
          SUBMIT
        </Button>
      </Form>
    </>
  );
};
