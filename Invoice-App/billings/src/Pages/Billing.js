import "../styles/Billing.css";
import { AddBill } from "../Components/Billing/AddBill";
import { BillList } from "../Components/Billing/BillList";

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

export { AddBilling, SearchBilling };
