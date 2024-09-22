import { useState, useEffect } from "react";
import axios from "axios";

export const ListCompany = () => {
  const [companyList, setCompanyList] = useState([]); // All company data displayed
  const [updatedCompanyList, setUpdatedCompanyList] = useState([]); // Backup of all companies
  const [companyName, setCompanyName] = useState(""); // Company name typed by the user
  const [suggestions, setSuggestions] = useState([]); // Suggested company names based on input
  const [selectedCompany, setSelectedCompany] = useState(null); // Selected company details

  useEffect(() => {
    // Fetch all companies initially
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/company`);
        if (response) {
          setCompanyList(response.data); // Show full list initially
          setUpdatedCompanyList(response.data); // Backup of all company data
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
      // Fetch suggestions based on typed name
      try {
        const response = await axios.get(
          `http://localhost:8000/api/company/search/${name}`
        );
        if (response.data) {
          setSuggestions(response.data); // Update suggestions based on search result
          setCompanyList(response.data); // Also update the companyList to show the matching companies
        }
      } catch (err) {
        console.error("No matching companies found", err);
        setSuggestions([]);
        setCompanyList([]); // If no match, clear the companyList
      }
    } else {
      // If input is cleared, reset the company list to the full list
      setSuggestions([]);
      setCompanyList(updatedCompanyList); // Reset to full company list
    }
  };

  const handleSelectCompany = (company) => {
    // When a company is selected from the dropdown
    setSelectedCompany(company); // Set the selected company
    setCompanyName(company.name); // Show the selected company name in the input
    setSuggestions([]); // Clear the suggestions dropdown
    setCompanyList([company]); // Show only the selected company's details
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
          {/* Show autocomplete suggestions in a dropdown */}
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
        <div className="co-list">
          {companyList.length > 0 ? (
            companyList.map((companyInfo, index) => (
              <div key={index}>
                <h2>Company {index + 1}:-</h2>
                <h3>{companyInfo.name}</h3>
                <h4>{companyInfo.GSTNos}</h4>
                <h5>{companyInfo.email}</h5>
                <p>{companyInfo.stateCode}</p>
              </div>
            ))
          ) : (
            <p>No company found</p>
          )}
        </div>
      </div>
    </>
  );
};
