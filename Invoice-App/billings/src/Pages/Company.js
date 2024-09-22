import "../styles/Company/Company.css";
import "../styles/Company/ListCompany.css";
import { AddCompanies } from "../Components/Company/AddCompanies";
import { ListCompany } from "../Components/Company/ListCompany";

const CompanyList = () => {
  return (
    <>
      <ListCompany />
    </>
  );
};
const AddCompany = () => {
  return (
    <>
      <AddCompanies />
    </>
  );
};

export { CompanyList, AddCompany };
