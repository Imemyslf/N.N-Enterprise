import { useState, useEffect } from "react";
import axios from "axios";

export const ListCompany = () => {
  const [companyList, setCompanyList] = useState([]);
  const [updatedCompanyList, setUpdatedCompanyList] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/company`);
        if (response) {
          setCompanyList(response.data);
          setUpdatedCompanyList(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyNameChange = async (e) => {
    const name = e.target.value;
    setCompanyName(name);

    if (name.length >= 1) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/company/search/${name}`
        );
        if (response.data) {
          setSuggestions(response.data);
          setCompanyList(response.data);
        }
      } catch (err) {
        console.error("No matching companies found", err);
        setSuggestions([]);
        setCompanyList([]);
      }
    } else {
      setSuggestions([]);
      setCompanyList(updatedCompanyList);
    }
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setCompanyName("");
    setSuggestions([]);
    setCompanyList([company]);
  };

  return (
    <>
      <div className="search-comp">
        <div className="search">
          <input
            type="text"
            value={companyName}
            onChange={handleCompanyNameChange}
            placeholder="Search Company by Name"
          />
          <button
            className="refresh-button"
            onClick={() => window.location.reload()}
          >
            &#x27F3;
          </button>
          {suggestions.length > 0 && (
            <ul className="autocomplete-suggestions">
              {suggestions.map((company, index) => (
                <li key={index} onClick={() => handleSelectCompany(company)}>
                  {company.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="co-container">
        <h1>Company List</h1>
        <div className="company-table">
          {companyList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company Name</th>
                  <th>GST Number</th>
                  <th>Email</th>
                  <th>State Code</th>
                </tr>
              </thead>
              <tbody>
                {companyList.map((companyInfo, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{companyInfo.name}</td>
                    <td>{companyInfo.GSTNos}</td>
                    <td>{companyInfo.email}</td>
                    <td>{companyInfo.stateCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No company found</p>
          )}
        </div>
      </div>
    </>
  );
};
