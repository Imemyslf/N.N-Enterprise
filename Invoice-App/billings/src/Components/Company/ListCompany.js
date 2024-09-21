import { useState, useEffect } from "react";
import axios from "axios";
import { CompanyList } from "../../Pages/Company";

export const ListCompany = () => {
  const [companyList, setCompanyList] = useState([]);
  const [companyStatus, setCompanyStatus] = useState(false);

  useEffect(() => {
    const showCompany = () => async () => {
      const company = await axios.get(`/api/company`);

      if (company.length > 0) {
        setCompanyList(company.data);
        setCompanyStatus(true);
      }
    };

    showCompany();
  });

  return <>{companyStatus && companyList.map((companyInfo, index) => {
      return (
        <>
          
        </>
      )
  })}</>;
};
