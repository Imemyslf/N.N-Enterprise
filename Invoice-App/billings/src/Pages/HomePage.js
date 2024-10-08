import "../styles/Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Company from "../assets/Images/buildings.png";
import Material from "../assets/Images/scrap.png";
import Bill from "../assets/Images/bill.png";
import ListIcon from "@mui/icons-material/List";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

function ShowCompany({ onClose, navigate, title, route }) {
  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ width: "30%", background: "white", borderRadius: "10px" }}
      >
        {/* Close button with icon */}
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        <h2>{title}</h2>
        <div className="complistadd">
          <div className="complist" onClick={() => navigate(route)}>
            <ListIcon style={{ fontSize: 50, color: "blue" }} />
            <br />
            <p>Show List</p>
          </div>
          <div className="compadd" onClick={() => navigate(`${route}-form`)}>
            <AddCircleIcon style={{ fontSize: 50, color: "blue" }} />
            <br />
            <p>Add {title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const HomePage = () => {
  const navigate = useNavigate();
  const [showCompanyList, setShowCompanyList] = useState(false);
  const [modalData, setModalData] = useState({ title: "", route: "" });

  const handleShowModal = (title, route) => {
    setModalData({ title, route });
    setShowCompanyList(true);
  };

  return (
    <>
      <div className={`main-container ${showCompanyList ? "blur" : ""}`}>
        <div className="first-div">
          <div
            className="addCompany"
            onClick={() => handleShowModal("Company", "/company")}
          >
            <img src={Company} alt="Company_Buildings" />
            <p style={{ fontWeight: "600" }}>Company </p>
          </div>
          <div
            className="addMaterial"
            onClick={() => handleShowModal("Material", "/materials")}
          >
            <img src={Material} alt="Crane_picking_scraps" />
            <p style={{ fontWeight: "600" }}>Materials </p>
          </div>
          <div
            className="addBill"
            onClick={() => handleShowModal("Bill", "/billings")}
          >
            <img src={Bill} alt="Bill_Receipt" />
            <p style={{ fontWeight: "600" }}>Bill </p>
          </div>
        </div>
      </div>

      {/* Conditionally render the ShowCompany modal */}
      {showCompanyList && (
        <ShowCompany
          onClose={() => setShowCompanyList(false)}
          navigate={navigate}
          title={modalData.title}
          route={modalData.route}
        />
      )}
    </>
  );
};

export default HomePage;
