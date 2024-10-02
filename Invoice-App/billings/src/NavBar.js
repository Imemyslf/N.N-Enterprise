import { useNavigate } from "react-router-dom";
import OM_Logo from "./assets/Images/OmLogo.png";
import HomeIcon from "@mui/icons-material/Home";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BusinessIcon from "@mui/icons-material/Business";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WarehouseIcon from "@mui/icons-material/Warehouse";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="logo">
          <img
            src={OM_Logo}
            alt="Om_logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <nav id="nav-bar">
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon fontSize="large" />
          </div>
          <div
            onClick={() => {
              navigate("/company-form");
            }}
          >
            <AddBusinessIcon fontSize="large" />
          </div>
          <div
            onClick={() => {
              navigate("/materials-form");
            }}
          >
            <WarehouseIcon fontSize="large" />
          </div>
          <div
            onClick={() => {
              navigate("/billing-form");
            }}
          >
            <ReceiptIcon fontSize="large" />
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
