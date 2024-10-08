import { useState } from "react";
import "../../styles/Billing.css";
import axios from "axios";
import { Form } from "react-bootstrap";
import "../../styles/Company/Company.css";
import CompanyInput from "./CompanyNameMate/SearchCompany";
import MaterialInput from "./CompanyNameMate/SearchMaterial";
import Buttons from "./CompanyNameMate/Buttons";
import { useNavigate } from "react-router-dom";

export const AddBill = () => {
  const [billingDetails, setBillingDetails] = useState({
    companyName: "",
    companyMaterials: [],
  });

  const navigate = useNavigate();
  const [suggesttedCompanyName, setSuggesttedCompanyName] = useState([]);
  const [suggesttedMaterialName, setSuggesttedMaterialName] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [activeMaterialIndex, setActiveMaterialIndex] = useState(null);

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
        `/api/company/search/${value}`
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
    alert("Selected company", selectedCompany[0]);
    console.log(`handleSelectCompany:-`, selectedCompany);
  };

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

    setActiveMaterialIndex(index);

    if (field === "name") {
      const name = value.trim();

      if (name === "") {
        setSuggesttedMaterialName([]);
        console.log("Material suggestion cleared because input is empty");
        return;
      }

      try {
        const material = await axios.get(
          `/api/materials/search/${name}`
        );

        setSuggesttedMaterialName(material.data || []);
      } catch (e) {
        console.error(`No materials found for ${name}, \n Error:-${e}`);
        setSuggesttedMaterialName([]);
      }
    }
  };

  const addMaterialInput = () => {
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: [...prev.companyMaterials, { name: "", kg: "" }],
    }));
  };

  const deleteMaterialInput = (index) => {
    const newMaterials = billingDetails.companyMaterials.filter(
      (_, i) => i !== index
    );
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: newMaterials,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`BillingsDetail"-`, billingDetails);
    if (billingDetails.companyName.trim() === "") {
      alert("Company name is required.");
      return;
    }

    if (billingDetails.companyMaterials.length === 0) {
      alert("At least one material must be added.");
      return;
    }

    for (const material of billingDetails.companyMaterials) {
      if (material.name.trim() === "") {
        alert("Material name is required for all materials.");
        return;
      }
      if (!material.kg || material.kg <= 0) {
        alert("Material KG must be a positive number.");
        return;
      }
    }

    console.log("Billing Details Submitted:", billingDetails.companyName);
    billingDetails.companyMaterials.forEach((material, index) => {
      console.log(`Material ${index}:`, material);
      console.log(`Type of kg for material ${index}:`, typeof material.kg);
    });

    try {
      const result = await axios.post(
        `/api/billings/insert`,
        billingDetails
      );

      if (result.status === 201) {
        let lastBill;
        alert(
          `Result-Status: ${result.status}\n Bill Information Added successfully`
        );
        try {
          const result = await axios.get(`/api/billings`);
          console.log(`result:- `, result.data);
          lastBill = result.data[result.data.length - 1];
          console.log(`lastBill:`, lastBill);
        } catch (err) {
          console.log(err);
        }
        navigate(`/billings/invoice/${lastBill.invoiceNos}`, {
          state: billingDetails,
        });
      } else {
        alert(
          `Result-Status: ${result.status}\n Failed in Addition of Bill Information`
        );
      }
    } catch (error) {
      console.error("Error adding billing details:", error);
      alert("Failed to add billing details. Please try again later.");
    }
  };

  const selectMaterial = (material, index) => {
    console.log(`Selected material:`, material.name, `at index:`, index);

    const newMaterials = [...billingDetails.companyMaterials];
    newMaterials[index] = {
      ...newMaterials[index],
      name: material.name,
    };

    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: newMaterials,
    }));

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

        <Buttons
          addMaterialInput={addMaterialInput}
          handleSubmit={handleSubmit}
        />
      </Form>
    </>
  );
};
