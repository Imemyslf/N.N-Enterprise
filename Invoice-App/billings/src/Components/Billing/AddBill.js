import { useState } from "react";
import "../../styles/Billing.css";
import axios from "axios";

export const AddBill = () => {
  const [billingDetails, setBillingDetails] = useState({
    companyName: "",
    companyMaterials: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCompany = (e) => {
    const { value } = e.target;
    setBillingDetails((prevalue) => ({
      ...prevalue,
      companyName: value,
    }));
  };

  // Handle input for material name and kg
  const handleMaterialChange = (index, field, value) => {
    console.log("Handling change:", { index, field, value });
    const newMaterials = [...billingDetails.companyMaterials];
    newMaterials[index] = {
      ...newMaterials[index],
      [field]: value,
    };
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: newMaterials,
    }));
  };

  // Add new material inputs
  const addMaterialInput = () => {
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: [...prev.companyMaterials, { name: "", kg: "" }],
    }));
  };

  // Remove material from the array
  const deleteMaterialInput = (index) => {
    const newMaterials = billingDetails.companyMaterials.filter(
      (_, i) => i !== index
    );
    setBillingDetails((prev) => ({
      ...prev,
      companyMaterials: newMaterials,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmitted(true); // Set the submission flag to true
    console.log("Billing Details Submitted:", billingDetails);

    billingDetails.companyMaterials.forEach((material, index) => {
      console.log(`Material ${index}:`, material);
      console.log(`Type of kg for material ${index}:`, typeof material.kg);
    });
    try {
      const result = await axios.post(
        `http://localhost:8000/api/billings`,
        billingDetails
      );

      if (result.status === 201) {
        alert(
          `Result-Status: ${result.status}\n Bill Information Added successfully`
        );

        console.log(result.data);
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

  return (
    <>
      <div className="center-div">
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
                onChange={handleCompany}
                required
              />
              <br />
              <br />
              {/* Render dynamic material input fields */}
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
                      value={material.name}
                      onChange={(e) =>
                        handleMaterialChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="second-kg">
                    <label htmlFor={`kg-${index}`}>KG: </label>
                    <br />
                    <input
                      type="number"
                      placeholder="KG"
                      value={material.kg}
                      onChange={(e) =>
                        handleMaterialChange(index, "kg", e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Delete button for material */}
                  <button
                    type="button"
                    onClick={() => deleteMaterialInput(index)}
                  >
                    Delete
                  </button>
                  <br />
                  <br />
                </div>
              ))}
              {/* Button to add new material input */}
              <div className="center-btn">
                <div>
                  <button type="button" onClick={addMaterialInput}>
                    More Materials
                  </button>
                </div>
                <div>
                  {/* Submit button */}
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
