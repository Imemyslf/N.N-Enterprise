import React from "react";
import Om_logo from "../../assets/Images/OmLogo.png";

function LogoInfo() {
  return (
    <>
      <div className="logoinfo">
        <div className="information">
          <div className="logo">
            <img src={Om_logo} alt="Om_logo" />
          </div>
          <h1>N.N ENTERPRISES</h1>
          <h4>(Dealers Of All Kinds Of Waste Papers)</h4>
          <p>
            H.No 12/d-2, Nerul Road,FattaWaddo, Near Supreme Industries, Nerul
            -North Goa
            <br />
            Ph No. 9822382623 / 8208017439 E-Mail Address:
            mayatradersgoa@gmail.com
          </p>
          <p>
            <b>GSTIN no. 30AAVFN467F1ZU</b>
          </p>
          <div className="blackback">
            <p>TAX - INVOICE</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogoInfo;
