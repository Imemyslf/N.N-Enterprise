import { useState } from "react";
import { Input } from "../Components/Input";
import { Label } from "../Components/Label";


const Company = () => {
    const [companyName,setCompanyName] = useState("");
    const [name,setName] = useState("");

    
    const handleCompanyName = (e) => {
        setCompanyName(e.target.value);
    }

    const displayName = (e) => {
        e.preventDefault();
        setName(companyName);

    }

    return(
        <>
        {/* <div onClick={handlecount}>
            <h1>{count}</h1>
        </div> */}
            
            <h1>{name}</h1>
                <form action="">
                    <Label name="Company's Name:-"/> <br/>
                    <Input 
                        type="text" 
                        placeholder="Enter Company's name"
                        value = {companyName}
                        change = {handleCompanyName}
                    /><br/><br/>
                    <button onClick={displayName}>Click Me!!</button>
                </form>
        </>  
    );
} 

export default Company;