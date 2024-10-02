import { useState, useEffect } from "react";
import axios from "axios";

export const ListMaterial = () => {
  const [materialList, setMaterialList] = useState([]); // All company data displayed
  const [updatedMaterialList, setUpdatedMaterialList] = useState([]); // Backup of all companies
  const [materialName, setMaterialName] = useState(""); // Company name typed by the user
  const [suggestions, setSuggestions] = useState([]); // Suggested company names based on input
  const [selectedCompany, setSelectedMaterial] = useState(null); // Selected company details

  useEffect(() => {
    // Fetch all companies initially
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/materials`);
        if (response) {
          setMaterialList(response.data); // Show full list initially
          setUpdatedMaterialList(response.data); // Backup of all company data
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMaterials();
  }, []);

  const handleMaterialNameChange = async (e) => {
    const name = e.target.value;
    setMaterialName(name);

    if (name.length >= 1) {
      // Fetch suggestions based on typed name
      try {
        const response = await axios.get(
          `http://localhost:8000/api/materials/search/${name}`
        );
        if (response.data) {
          setSuggestions(response.data); // Update suggestions based on search result
          setMaterialList(response.data); // Also update the materialList to show the matching companies
        }
      } catch (err) {
        console.error("No matching companies found", err);
        setSuggestions([]);
        setMaterialList([]); // If no match, clear the materialList
      }
    } else {
      // If input is cleared, reset the company list to the full list
      setSuggestions([]);
      setMaterialList(updatedMaterialList); // Reset to full company list
    }
  };

  const handleSelectMaterial = (material) => {
    // When a material is selected from the dropdown
    setSelectedMaterial(material); // Set the selected material
    setMaterialName(material.name); // Show the selected material name in the input
    setSuggestions([]); // Clear the suggestions dropdown
    setMaterialList([material]); // Show only the selected company's details
  };

  return (
    <>
      <div className="search-comp">
        <div className="search">
          <input
            type="text"
            value={materialName}
            onChange={handleMaterialNameChange}
            placeholder="Search Material by Name"
          />
          {/* Show autocomplete suggestions in a dropdown */}
          {suggestions.length > 0 && (
            <ul className="autocomplete-suggestions">
              {suggestions.map((material, index) => (
                <li key={index} onClick={() => handleSelectMaterial(material)}>
                  {material.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="co-container">
        <h1>Material List</h1>
        <div className="co-list">
          {materialList.length > 0 ? (
            materialList.map((materialInfo, index) => (
              <div key={index}>
                <h2>Material {index + 1}:-</h2>
                <h3>{materialInfo.name}</h3>
                <h4>{materialInfo.rate}</h4>
                <h5>{materialInfo.kg}</h5>
              </div>
            ))
          ) : (
            <p>No material found</p>
          )}
        </div>
      </div>
    </>
  );
};
