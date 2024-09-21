import "../styles/Invoice.css";
import LogoInfo from "../Components/LogoInfo";
import DataInput from "../Components/DataInput";
import Main from "../Components/MainBilling";
import Bank from "../Components/Banksign";

export const Invoice = () => {
  return (
    <>
      <div className="bill-container">
        <LogoInfo />
        <DataInput />
        <Main />
        <Bank />
      </div>
    </>
  );
};
