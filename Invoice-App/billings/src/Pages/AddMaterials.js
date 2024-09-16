import React from "react";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const AddMaterials = () =>{

  const [materialName, setMaterialName] = useState("");
  const [materialGST, setMaterialRate] = useState("");
  const [materialEmail, setMaterialKgs] = useState("");
  const [validated, setValidated] = useState(false);
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
      <Form className="form-container" noValidate validated={validated} onSubmit={handleSubmit} >
        <h3 className="form-header">ADD NEW MATERIALS</h3>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCompanyName">
            <Form.Label>Material name</Form.Label>
            <Form.Control type="text" placeholder="PVC Plastic" change={(e) => setMaterialName(e.target.value)} required />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCompanyGSTNo">
            <Form.Label>Material rate</Form.Label>
            <Form.Control type="number" placeholder="250" change={(e) => setMaterialRate(e.target.value)} required />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="formGridCompanyEmail">
            <Form.Label>Material quantity (Kgs)</Form.Label>
            <Form.Control type="number" placeholder="5" change={(e) => setMaterialKgs(e.target.value)} required />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          SUBMIT
        </Button>
      </Form>
    </>

    )
}

export default AddMaterials;