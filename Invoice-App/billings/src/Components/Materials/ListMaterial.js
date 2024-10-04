import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Material/ListMaterial.css";

export const ListMaterial = () => {
  const [materialList, setMaterialList] = useState([]);
  const [updatedMaterialList, setUpdatedMaterialList] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCompany, setSelectedMaterial] = useState(null);

  useEffect(() => {
    // Fetch all companies initially
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/materials`);
        if (response) {
          setMaterialList(response.data);
          setUpdatedMaterialList(response.data);
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
      try {
        const response = await axios.get(
          `http://localhost:8000/api/materials/search/${name}`
        );
        if (response.data) {
          setSuggestions(response.data);
          setMaterialList(response.data);
        }
      } catch (err) {
        console.error("No matching companies found", err);
        setSuggestions([]);
        setMaterialList([]);
      }
    } else {
      setSuggestions([]);
      setMaterialList(updatedMaterialList);
    }
  };

  const handleSelectMaterial = (material) => {
    setSelectedMaterial(material);
    setMaterialName("");
    setSuggestions([]);
    setMaterialList([material]);
  };

  return (
    <>
      <div className="search-mat">
        <div className="search">
          <input
            type="text"
            value={materialName}
            onChange={handleMaterialNameChange}
            placeholder="Search Material by Name"
          />
          <button
            className="refresh-button"
            onClick={() => window.location.reload()}
          >
            &#x27F3;
          </button>
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

      <div className="mat-container">
        <h1>Material List</h1>
        <div className="material-table">
          {materialList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Material Name</th>
                  <th>Rate</th>
                  <th>Kg</th>
                </tr>
              </thead>
              <tbody>
                {materialList.map((materialInfo, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{materialInfo.name}</td>
                    <td>{materialInfo.rate}</td>
                    <td>{materialInfo.kg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No material found</p>
          )}
        </div>
      </div>
    </>
  );
};
