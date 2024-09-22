import { useState } from "react"; // Import useState hook from React
import "../../styles/Billing.css"; // Import the required CSS file for styling
import axios from "axios"; // Import axios for making HTTP requests
import { Button, Form, Row, Col } from "react-bootstrap";
import "../../styles/Company/Company.css";
// Define AddBill component
export const AddBill = () => {
  // Set up state for billing details (company name and materials) and form submission status
  const [billingDetails, setBillingDetails] = useState({
    companyName: "", // Initialize company name as an empty string
    companyMaterials: [], // Initialize an empty array for company materials
  });
  const [submitted, setSubmitted] = useState(false); // State to track if the form has been submitted

  // Handle change for company name input
  const handleCompany = (e) => {
    const { value } = e.target; // Extract the input value from the event
    setBillingDetails((prevalue) => ({
      ...prevalue,
      companyName: value, // Update the company name in the billing details state
    }));
  };

  // Handle input for material name and kg (weight)
  const handleMaterialChange = (index, field, value) => {
    console.log("Handling change:", { index, field, value }); // Debugging log
    const newMaterials = [...billingDetails.companyMaterials]; // Make a copy of the companyMaterials array
    newMaterials[index] = {
      ...newMaterials[index],
      [field]: value, // Update the specific field (name or kg) for the material at the given index
    };
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: newMaterials, // Update the state with the modified materials array
    }));
  };

  // Add new material input fields
  const addMaterialInput = () => {
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: [...prev.companyMaterials, { name: "", kg: "" }], // Add a new empty material object to the array
    }));
  };

  // Remove material input from the array based on index
  const deleteMaterialInput = (index) => {
    const newMaterials = billingDetails.companyMaterials.filter(
      (_, i) => i !== index // Filter out the material at the specified index
    );
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: newMaterials, // Update the state with the new array after removal
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setSubmitted(true); // Set the submitted state to true
    console.log("Billing Details Submitted:", billingDetails); // Log the submitted billing details for debugging

    // Log each material and its kg field type for debugging
    billingDetails.companyMaterials.forEach((material, index) => {
      console.log(`Material ${index}:`, material);
      console.log(`Type of kg for material ${index}:`, typeof material.kg);
    });

    // Try submitting the billing details to the server
    try {
      const result = await axios.post(
        `http://localhost:8000/api/billings`, // API endpoint for submitting billing details
        billingDetails
      );

      // Check if the submission was successful (status code 201)
      if (result.status === 201) {
        alert(
          `Result-Status: ${result.status}\n Bill Information Added successfully`
        );
        console.log(result.data); // Log the response data for debugging
      } else {
        alert(
          `Result-Status: ${result.status}\n Failed in Addition of Bill Information`
        );
      }
    } catch (error) {
      // Catch and handle any errors during the submission process
      console.error("Error adding billing details:", error);
      alert("Failed to add billing details. Please try again later.");
    }
  };

  return (
    <>
      {/* <div className="center-div">
        <div className="billing-form">
          <h1>Billing Form</h1>

          <div className="b-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="companyName">Company Name: </label>
              <br />
              <input
                type="text"
                placeholder="Company Name"
                value={billingDetails.companyName}
                onChange={handleCompany} // Handle company name change
                required // Make the field required for form submission
              />
              <br />
              <br />

              {/* Render dynamic material input fields 
              {billingDetails.companyMaterials.map((material, index) => (
                <div className="matkg" key={index}>
                  <div className="first-material">
                    <label htmlFor={`material-${index}`}>
                      Material: {index + 1}{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="Material Name"
                      value={material.name} // Value of the material name
                      onChange={(e) =>
                        handleMaterialChange(index, "name", e.target.value)
                      } // Handle material name change
                      required // Make the field required for form submission
                    />
                  </div>
                  <div className="second-kg">
                    <label htmlFor={`kg-${index}`}>KG: </label>
                    <br />
                    <input
                      type="number"
                      placeholder="KG"
                      value={material.kg} // Value of the material weight
                      onChange={(e) =>
                        handleMaterialChange(index, "kg", e.target.value)
                      } // Handle kg change
                      required // Make the field required for form submission
                    />
                  </div>

                  {/* Delete button for material 
                  <button
                    type="button"
                    onClick={() => deleteMaterialInput(index)} // Remove the material input
                  >
                    Delete
                  </button>
                  <br />
                  <br />
                </div>
              ))}

              {/* Button to add new material input 
              <div className="center-btn">
                <div>
                  <button type="button" onClick={addMaterialInput}>
                    More Materials
                  </button>
                </div>
                <div>
                  {/* Submit button 
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br /> */}
      {/* <Form className="form-container">
        <h3 className="form-header">ADD NEW BILL</h3>
        <Row className="mb-4">
          <Form.Label>Company Name </Form.Label>
          <Col sm="4">
            <Form.Control
              type="text"
              value={billingDetails.companyName}
              placeholder="Enter Company Name"
              onChange={handleCompany} // Handle company name change
              required // Make the field required for form submission
            />
          </Col>
        </Row>
        {billingDetails.companyMaterials.map((material, index) => (
          <>
            <Row className="mb-4">
              <Form.Group as={Col} sm="4">
                <Form.Label>Material {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Material Name"
                  value={material.name}
                  onChange={(e) =>
                    handleMaterialChange(index, "name", e.target.value)
                  } // Handle material name change
                  required
                />
              </Form.Group>
              <Form.Group as={Col} sm="4">
                <Form.Label>KG </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="KG"
                  value={material.kg} // Value of the material weight
                  onChange={(e) =>
                    handleMaterialChange(index, "kg", e.target.value)
                  }
                  required
                />
              </Form.Group>
              <Form.Group as={Col} sm="2" className="d-flex align-items-center">
                <Button
                  variant="danger"
                  onClick={() => deleteMaterialInput(index)}
                >
                  DELETE
                </Button>
              </Form.Group>
            </Row>
          </>
        ))}
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Button
              varient="primary"
              onClick={addMaterialInput}
              className="mr-2"
            >
              MORE MATERIALS
            </Button>
            <Button varient="primary" onClick={handleSubmit}>
              SUBMIT
            </Button>
          </Form.Group>
        </Row>
      </Form> */}
      <Form
        className="form-container"
        style={{ width: "1000px", marginLeft: "350px" }}
      >
        <h3 className="form-header">ADD NEW BILL</h3>

        <Row className="mb-4">
          <Form.Label>Company Name </Form.Label>
          <Col sm="4">
            <Form.Control
              type="text"
              value={billingDetails.companyName}
              placeholder="Enter Company Name"
              onChange={handleCompany}
              required
            />
          </Col>
        </Row>

        {billingDetails.companyMaterials.map((material, index) => (
          <Row className="mb-4" key={index}>
            <Form.Group as={Col} sm="5">
              <Form.Label>Material {index + 1}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Material Name"
                value={material.name}
                onChange={(e) =>
                  handleMaterialChange(index, "name", e.target.value)
                }
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm="5">
              <Form.Label>KG</Form.Label>
              <Form.Control
                type="number"
                placeholder="KG"
                value={material.kg}
                onChange={(e) =>
                  handleMaterialChange(index, "kg", e.target.value)
                }
                required
              />
            </Form.Group>

            <Form.Group as={Col} sm="2" className="d-flex align-items-center">
              <Button
                variant="danger" // Makes the button red
                onClick={() => deleteMaterialInput(index)}
                style={{ marginTop: "30px" }}
              >
                DELETE
              </Button>
            </Form.Group>
          </Row>
        ))}

        <Row className="mb-4" style={{ marginTop: "50px" }}>
          <Col style={{ marginLeft: "130px" }}>
            <Button
              variant="primary"
              onClick={addMaterialInput}
              className="mr-2"
            >
              MORE MATERIALS
            </Button>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleSubmit} className="ml-2">
              SUBMIT
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
