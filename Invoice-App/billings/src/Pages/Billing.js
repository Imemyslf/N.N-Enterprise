import "../styles/Billing.css";
import { AddBill } from "../Components/Billing/AddBill";
import { ShowBill } from "../Components/Billing/ShowBill";
import { BillList } from "../Components/Billing/BillList";

const BillingList = () => {
  return (
    <>
      <ShowBill />
    </>
  );
};

const AddBilling = () => {
  return (
    <>
      <AddBill />
    </>
  );
};

const SearchBilling = () => {
  return (
    <>
      <BillList />
    </>
  );
};

export { BillingList, AddBilling, SearchBilling };
