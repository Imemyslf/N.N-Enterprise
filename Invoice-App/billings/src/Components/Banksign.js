import React from "react";

function Bank() {
  return (
    <>
      <div className="amtbanksign">
        <div className="amtbank">
          <div className="amt">
            <p>Amount in words:</p>
          </div>
          <div className="bank">
            <p>Bank Details:</p>
            <p>Canara Bank: Current Account No. 120024177121</p>
            <p>IFSC code: CNRB0017204</p>
            <p>Branch: Betim Goa.</p>
          </div>
        </div>
        <div className="sign">
          <p>for N.N ENTERPRISE</p>
        </div>
      </div>
      <div className="partyrec">
        <div className="party">
          <p>Party CST No.</p>
          <div className="gstinput">
            <label htmlFor="">Party GSTIN No.</label>
            <input type="text" />
          </div>
          <div className="spacebet">
            <div>State Code: </div>
            <div>E.& O.E</div>
          </div>
        </div>
        <div className="rec">
          <p>Receivers Sign. & Stamp</p>
          <p className="r2"></p>
        </div>
      </div>
      <div className="note">
        <p>
          {" "}
          <u>Note: -</u> *Amount shall be billed as per the quantity acceptable
          to the party.
        </p>
      </div>
    </>
  );
}

export default Bank;
