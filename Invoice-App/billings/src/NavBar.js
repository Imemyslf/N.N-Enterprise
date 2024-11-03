import { useNavigate } from "react-router-dom";
import OM_Logo from "./assets/Images/OmLogo.png";
// import ContactUs from "./assets/Images/contact-mail.png";
// import Home from "./assets/Images/home.png";
// import AboutUS from "./assets/Images/profile-user.png";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <img
              src={OM_Logo}
              alt="Om_logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <h1
            style={{ alignItem: "center" }}
            onClick={() => {
              navigate("/");
            }}
          >
            N.N. ENTERPRISE
          </h1>
          {/* <div id="nav-bar">
            <div
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={Home} alt="Contact-Us" />
            </div>
            <div
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={ContactUs} alt="Contact-Us" />
            </div>
            <div
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={AboutUS} alt="Contact-Us" />
            </div>
          </div> */}
        </nav>
      </header>
    </>
  );
};

export default NavBar;
