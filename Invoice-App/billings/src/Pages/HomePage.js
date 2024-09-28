import "../styles/Home.css";
import Company from "../assets/Images/buildings.png";
import Material from "../assets/Images/scrap.png";
import Bill from "../assets/Images/bill.png";
const HomePage = () => {
  return (
    <>
      <div className="h-container">
        <div className="main-container">
          <div className="first-div">
            <div className="addCompany">
              <img src={Company} alt="Company_Buildings" />
              <p>Add Companny</p>
            </div> 
            <div className="addMaterial">
              <img src={Material} alt="Crane_picking_scraps" />
              <p>Add Materials</p>
            </div>
          </div>
          <div className="addBill">
            <img src={Bill} alt="Bill_Receipt" />
            <p>Add Bill</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
