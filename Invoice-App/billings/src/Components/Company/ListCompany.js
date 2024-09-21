import { useState, useEffect } from "react";
import axios from "axios";

export const ListCompany = () => {
  const [companyList, setCompanyList] = useState([]);
  const [companyStatus, setCompanyStatus] = useState(false);

  useEffect(() => {
    const showCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/company`);

        if (response) {
          setCompanyList(response.data);
          setCompanyStatus(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    showCompany();
  }, []);

  return (
    <>
      <div className="search-comp">
        <div className="search">
          <input type="text" />
          <button>Search</button>
        </div>
      </div>
      <div className="co-container">
        <h1>Company List</h1>
        <div className="co-list">
          {companyStatus &&
            companyList.map((companyInfo, index) => {
              return (
                <>
                  <div key={index}>
                    <h2>Company {index + 1}:- </h2>
                    <h3>{companyInfo.name}</h3>
                    <h4>{companyInfo.GSTNos}</h4>
                    <h5>{companyInfo.email}</h5>
                    <p>{companyInfo.stateCode}</p>
                  </div>
                  <br />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
