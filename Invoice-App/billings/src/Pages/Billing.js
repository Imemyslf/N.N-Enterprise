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

const BillingList = () => {
  return (
    <>
      <BillList />
    </>
  );
};

export { AddBilling, BillingList };
