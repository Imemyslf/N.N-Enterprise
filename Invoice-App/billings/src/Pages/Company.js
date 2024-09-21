import "../styles/Company.css";
import { AddCompanies } from "../Components/Company/AddCompanies";
import { ListCompany } from "../Components/Company/ListCompany";
import { ShowCompany } from "../Components/Company/ShowCompany";

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

const SearchCompany = () => {
  return (
    <>
      <ShowCompany />
    </>
  );
};

export { CompanyList, AddCompany, SearchCompany };
