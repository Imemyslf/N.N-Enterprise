import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Material/ListMaterial.css";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";

// import { MaterialsList } from "../../Pages/Materials";

export const ListMaterial = () => {
  const navigate = useNavigate();
  const [materialList, setMaterialList] = useState([]);
  const [updatedMaterialList, setUpdatedMaterialList] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCompany, setSelectedMaterial] = useState(null);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`/api/materials`);
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
        const response = await axios.get(`/api/materials/search/${name}`);
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

  const handleSort = async (type) => {
    const method = sort ? "desc" : "asc";
    setSort(!sort);

    try {
      const response = await axios.get(
        `/api/materials/sort?methods=${type}&sorting=${method}`
      );

      if (response.data.length > 0) {
        setMaterialList(response.data);
      } else {
        console.log(`Couldn't get the response`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteMaterials = async () => {
    try {
      await axios.delete(`/api/materials/delete`);
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdateMaterial = (material, index) => {
    console.log(material);
    console.log(index);

    navigate(`/materials-form`, { state: material });
  };

  const handleDeleteMaterial = async (materialsName) => {
    console.log("Materials Name at:-", materialsName);

    try {
      const result = await axios.delete(
        `/api/materials/delete/${materialsName}`
      );

      if (result.status === 200) {
        const updatedList = materialList.filter(
          (material) => material.name !== materialsName
        );

        setMaterialList(updatedList);
        setUpdatedMaterialList(updatedList);
      }
    } catch (err) {
      console.log("Error:- ", err.message);
    }
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
        <h1 onClick={() => deleteMaterials()}>Material List</h1>
        <div className="table-wrapper">
          <div className="material-table">
            {materialList.length > 0 ? (
              <table>
                <thead style={{ background: "blue !important" }}>
                  <tr>
                    <th>Sr No.</th>
                    <th onClick={() => handleSort("name")}>Material Name</th>
                    <th onClick={() => handleSort("rate")}>Rate</th>
                    <th>Update/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {materialList.map((materialInfo, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{materialInfo.name}</td>
                      <td>{materialInfo.rate}</td>
                      <td>
                        <div className="update-delete">
                          <div
                            onClick={() =>
                              handleUpdateMaterial(materialInfo, index)
                            }
                          >
                            <UpdateIcon />
                          </div>
                          <div
                            onClick={() =>
                              handleDeleteMaterial(materialInfo.name)
                            }
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: "center" }}>No material found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
