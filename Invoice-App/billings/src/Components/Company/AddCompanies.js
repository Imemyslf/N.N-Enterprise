import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React
import axios from "axios"; // Import axios for making HTTP requests
import { Button, Form, Row, Col } from "react-bootstrap"; // Import necessary components from react-bootstrap for styling and layout

// AddCompanies component to add new company information
export const AddCompanies = () => {
  // Define state variables for each input field
  const [companyName, setCompanyName] = useState(""); // Store company name
  const [companyGST, setCompanyGST] = useState(""); // Store company GST number
  const [companyEmail, setCompanyEmail] = useState(""); // Store company email
  const [companyStateCode, setCompanyStateCode] = useState(""); // Store company state code
  const [validated, setValidated] = useState(false); // State for form validation feedback

  // Function to handle form submission
  const handleSubmitt = async () => {
    try {
      // Prepare the data to be sent in the request
      const inputs = {
        name: companyName, // company name
        GSTNos: companyGST, // company GST number
        email: companyEmail, // company email
        stateCode: companyStateCode, // company state code
      };

      // Send POST request to the server to add a new company
      const response = await axios.post(
        `http://localhost:8000/api/company/insert`, // API endpoint
        inputs
      );

      // If the response is successful (status 200), display a success message
      if (response.status === 200) {
        console.log(`Company Added Successfully`);
        alert(`Company Added Successfully`);
      }
    } catch (err) {
      // If there's an error during submission, log the error
      console.error("Error submitting data:", err);
    }
  };

  return (
    <>
      {/* Form to add a new company */}
      <Form
        className="form-container" // Apply custom CSS for styling the form container
        noValidate // Disable default HTML form validation
        validated={validated} // Enable Bootstrap validation feedback
      >
        <h3 className="form-header">ADD NEW COMPANY</h3> {/* Form header */}
        <Col sm="12">
          {" "}
          {/* Column to structure the form */}
          <Row className="mb-4">
            {/* Form group for company name input */}
            <Form.Group as={Col} controlId="formGridCompanyName">
              <Form.Label>Company name</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text" // Input type for company name
                  value={companyName} // Bind the input value to the state
                  placeholder="Eg:- N.N Enterprises" // Placeholder text
                  onChange={(e) => setCompanyName(e.target.value)} // Update state on input change
                  required // Make this field required for form submission
                />
              </Col>
            </Form.Group>

            {/* Form group for company GST number input */}
            <Form.Group as={Col} controlId="formGridCompanyGSTNo">
              <Form.Label>Company GSTIN no.</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text" // Input type for GST number
                  value={companyGST} // Bind the input value to the state
                  placeholder="Eg:- 30ABXYP2839XYZ" // Placeholder text
                  onChange={(e) => setCompanyGST(e.target.value)} // Update state on input change
                  required // Make this field required for form submission
                />
              </Col>
            </Form.Group>
          </Row>
        </Col>
        <Col sm="9">
          {" "}
          {/* Another column for additional fields */}
          <Row className="mb-4">
            {/* Form group for company email input */}
            <Form.Group as={Col} controlId="formGridCompanyEmail">
              <Form.Label>Company email</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email" // Input type for email
                  value={companyEmail} // Bind the input value to the state
                  placeholder="Eg:- Maysurtraders-goa@gmail.com" // Placeholder text
                  onChange={(e) => setCompanyEmail(e.target.value)} // Update state on input change
                  required // Make this field required for form submission
                />
              </Col>
            </Form.Group>

            {/* Form group for company state code input */}
            <Form.Group as={Col} md="4" controlId="formGridStateCode">
              <Form.Label>Company state code</Form.Label>
              <Form.Control
                type="number" // Input type for state code (number)
                value={companyStateCode} // Bind the input value to the state
                placeholder="Eg:- 35" // Placeholder text
                onChange={(e) => setCompanyStateCode(e.target.value)} // Update state on input change
                required // Make this field required for form submission
              />
            </Form.Group>
          </Row>
        </Col>
        {/* Submit button to trigger handleSubmitt function */}
        <Button variant="primary" onClick={handleSubmitt}>
          SUBMIT
        </Button>
      </Form>
    </>
  );
};
