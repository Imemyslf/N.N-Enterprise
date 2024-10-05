import { useState, useEffect } from "react";
import axios from "axios";

export const ListCompany = () => {
  const [companyList, setCompanyList] = useState([]);
  const [updatedCompanyList, setUpdatedCompanyList] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [sort, setSort] = useState(false);

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

  const handleSort = async (type) => {
    const method = sort ? "desc" : "asc";
    setSort(!sort);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/company/sort?methods=${type}&sorting=${method}`
      );

      if (response.data.length > 0) {
        setCompanyList(response.data);
      } else {
        console.log(`Couldn't get the response`);
      }
    } catch (err) {
      console.log(err.message);
    }
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
                  <th onClick={() => handleSort("name")}>Company Name</th>
                  <th onClick={() => handleSort("address")}>Company Address</th>
                  <th onClick={() => handleSort("GSTNos")}>GST Number</th>
                  <th onClick={() => handleSort("email")}>Email</th>
                  <th onClick={() => handleSort("stateCode")}>State Code</th>
                </tr>
              </thead>
              <tbody>
                {companyList.map((companyInfo, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{companyInfo.name}</td>
                    <td>{companyInfo.address}</td>
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
