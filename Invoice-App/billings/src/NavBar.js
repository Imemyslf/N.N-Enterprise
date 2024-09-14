import { useNavigate } from 'react-router-dom';
import OM_Logo from "./assets/Images/OmLogo.png";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <> 
            <header>
                <div className="logo">
                    <img src={OM_Logo} alt="Om_logo" onClick={() => {navigate("/")}}/>
                </div>
                <nav id = "nav-bar">
                    <div onClick={() => { navigate("/")}}>Home</div>
                    <div onClick={() => { navigate("/company")}}>Company</div>
                    <div onClick={() => { navigate("/materials")}}>Materials</div>
                    <div onClick={() => { navigate("/billing")}}>Billing</div>
                </nav>
            </header>            
        </>
    )
}

export default NavBar;