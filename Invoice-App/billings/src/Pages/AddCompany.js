import { useState } from "react";
import { Input } from "../Components/Input";
import { Label } from "../Components/Label";


const Company = () => {
    const [companyName,setCompanyName] = useState("");
    const [companyGST,setCompanyGST] = useState("");
    const [companyEmail,setCompanyEmail] = useState("");
    const [companyStateCode,setCompanyStateCode] = useState("");
    const [name,setName] = useState("");


    const displayName = (e) => {
        e.preventDefault();
        const obj = [companyName,companyEmail,companyGST,companyStateCode]
        setName(obj);
    }

    return(
        <>
            
            <h1>{name}</h1>
                <form action="">
                    <Label name="Company's Name:-"/> <br/>
                    <Input 
                        type="text" 
                        placeholder="Enter Company's name"
                        value = {companyName}
                        change = {e => setCompanyName(e.target.value)}
                    /><br/>
                    <Label name="Company's GST Nos:-"/> <br/>
                    <Input 
                        type="text" 
                        placeholder="Enter Company's GST Nos"
                        value = {companyGST}
                        change = {e => setCompanyGST(e.target.value)}
                    /><br/>
                    <Label name="Company's Email:-"/> <br/>
                    <Input 
                        type="text" 
                        placeholder="Enter Company's name"
                        value = {companyEmail}
                        change = {e => setCompanyEmail(e.target.value)}
                    /><br/>
                    <Label name="Company's GST Nos:-"/> <br/>
                    <Input 
                        type="text" 
                        placeholder="Enter Company's name"
                        value = {companyStateCode}
                        change = {e => setCompanyStateCode(e.target.value)}
                    />
                    <br/><br/>
                    <button onClick={displayName}>Click Me!!</button>
                </form>
        </>  
    );
} 

export default Company;