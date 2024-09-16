import "../assets/CSS/Billing.css"
import LogoInfo from "../Components/LogoInfo";
import DataInput from "../Components/DataInput";
import Main from "../Components/MainBilling";
import Bank from "../Components/Banksign";

const Billing = () =>{

    return(
        <>
            <div className='bill-container'>
                <LogoInfo />
                <DataInput />
                <Main/>
                <Bank/>
          </div>
        </>
    )
}

export default Billing;