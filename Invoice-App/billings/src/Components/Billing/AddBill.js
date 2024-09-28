import { useState, useEffect } from "react";
import "../../styles/Billing.css";
import axios from "axios";
import { Button, Form, Row, Col } from "react-bootstrap";
import "../../styles/Company/Company.css";
import CompanyInput from "./CompanyNameMate/SearchCompany";
import MaterialInput from "./CompanyNameMate/SearchMaterial";

// Define AddBill component
export const AddBill = () => {
  const [billingDetails, setBillingDetails] = useState({
    companyName: "",
    companyMaterials: [],
  });

  const [suggesttedCompanyName, setSuggesttedCompanyName] = useState([]);
  const [suggesttedMaterialName, setSuggesttedMaterialName] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [activeMaterialIndex, setActiveMaterialIndex] = useState(null); // Track active material input index

  // Handle change for company name input
  const handleCompany = async (e) => {
    const { value } = e.target;
    setBillingDetails((prevalue) => ({
      ...prevalue,
      companyName: value,
    }));

    if (value.trim() === "") {
      setSuggesttedCompanyName([]);
      console.log("Company suggestion cleared");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/company/search/${value}`
      );

      setSuggesttedCompanyName(response.data || []);
    } catch (e) {
      console.log("No matching company", e);
      setSuggesttedCompanyName([]);
    }
  };

  const handleSelectCompany = (company) => {
    setBillingDetails((prevalue) => ({
      ...prevalue,
      companyName: company.name,
    }));
    setSuggesttedCompanyName([]);
    setSelectedCompany([company]);
    console.log(`handleSelectCompany:-`, selectedCompany);
  };

  // Handle input for material name and kg (weight)
  const handleMaterialChange = async (index, field, e) => {
    const { value } = e.target;
    const newMaterials = [...billingDetails.companyMaterials];
    newMaterials[index] = {
      ...newMaterials[index],
      [field]: value,
    };
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: newMaterials,
    }));

    // Set the active material index
    setActiveMaterialIndex(index);

    // Handle suggestion clearing and fetching only for the material name
    if (field === "name") {
      const name = value.trim();

      // Clear suggestions only if the input is empty
      if (name === "") {
        setSuggesttedMaterialName([]);
        console.log("Material suggestion cleared because input is empty");
        return;
      }

      // Fetch material suggestions if input is not empty
      try {
        const material = await axios.get(
          `http://localhost:8000/api/materials/search/${name}`
        );

        setSuggesttedMaterialName(material.data || []);
      } catch (e) {
        console.error(`No materials found for ${name}, \n Error:-${e}`);
        setSuggesttedMaterialName([]);
      }
    }
  };

  // Add new material input fields
  const addMaterialInput = () => {
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: [...prev.companyMaterials, { name: "", kg: "" }],
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
    e.preventDefault();
    console.log("Billing Details Submitted:", billingDetails.companyName);

    billingDetails.companyMaterials.forEach((material, index) => {
      console.log(`Material ${index}:`, material);
      console.log(`Type of kg for material ${index}:`, typeof material.kg);
    });

    // Try submitting the billing details to the server
    try {
      const result = await axios.post(
        `http://localhost:8000/api/billings`,
        billingDetails
      );

      // Check if the submission was successful (status code 201)
      if (result.status === 201) {
        alert(
          `Result-Status: ${result.status}\n Bill Information Added successfully`
        );
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

  // Function to handle selecting a material from suggestions
  const selectMaterial = (material, index) => {
    console.log(`Selected material:`, material.name, `at index:`, index);

    // Update only the specific material at the provided index
    const newMaterials = [...billingDetails.companyMaterials];
    newMaterials[index] = {
      ...newMaterials[index],
      name: material.name, // Update the name field with the selected material name
    };

    // Update the state with the modified materials array
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: newMaterials,
    }));

    // Clear the material suggestions after selection
    setSuggesttedMaterialName([]);
    console.log(`Updated materials array:`, billingDetails.companyMaterials);
  };

  return (
    <>
      <Form className="form-container">
        <h3 className="form-header">ADD NEW BILL</h3>

        <CompanyInput
          id="companyNameInput"
          value={billingDetails.companyName}
          placeholder="Enter Company Name"
          change={handleCompany}
          company={billingDetails.companyName}
          companyname={suggesttedCompanyName}
          suggestcompany={suggesttedCompanyName}
          selectcompany={handleSelectCompany}
        />

        {billingDetails.companyMaterials.map((material, index) => (
          <MaterialInput
            key={index}
            material={material}
            index={index}
            handleMaterialChange={handleMaterialChange}
            deleteMaterialInput={deleteMaterialInput}
            suggesttedMaterialName={suggesttedMaterialName}
            activeMaterialIndex={activeMaterialIndex}
            setActiveMaterialIndex={setActiveMaterialIndex}
            selectMaterial={selectMaterial}
          />
        ))}

        <Row className="mb-4" style={{ marginTop: "50px" }}>
          <Col style={{ marginLeft: "170px" }}>
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
