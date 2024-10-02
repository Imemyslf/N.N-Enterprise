import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import Company from "../assets/Images/buildings.png";
import Material from "../assets/Images/scrap.png";
import Bill from "../assets/Images/bill.png";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Company</h1>
      <div className="main-container">
        <div className="first-div">
          <div
            className="addCompany"
            onClick={() => {
              navigate(`/company`);
            }}
          >
            <img src={Company} alt="Company_Buildings" />
            <p>Companny List</p>
          </div>
          <div
            className="addMaterial"
            onClick={() => {
              navigate(`/materials`);
            }}
          >
            <img src={Material} alt="Crane_picking_scraps" />
            <p>Materials List</p>
          </div>
          <div
            className="addBill"
            onClick={() => {
              navigate(`/billings`);
            }}
          >
            <img src={Bill} alt="Bill_Receipt" />
            <p>Bill List</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
