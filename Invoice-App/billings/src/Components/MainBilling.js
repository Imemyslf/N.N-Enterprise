import React from "react";

function Main() {
  const cgst = "2.5%";
  const sgst = "2.5%";
  const igst = "5%";

  return (
    <>
      <div className="catalogue">
        <div className="catinfo">
          <div>
            <p>Sr.No</p>
          </div>
          <div>
            <p>Particulars</p>
          </div>
          <div>
            <p>Kg</p>
          </div>
          <div>
            <p>Rate</p>
          </div>
          <div>
            <p>Amount Rs.</p>
          </div>
          <div>
            <p>Ps.</p>
          </div>
          <div>
            <p>Remarks</p>
          </div>
        </div>
        <div className="catdata">
          <div></div>
          <div>
            <div className="metadata">
              <label htmlFor="">HSN</label>
              <input type="text" size={10} />
            </div>

            {/* <textarea name="materials" id="" placeholder="Materials"></textarea>
             */}
            <table>
              <tr>
                <th>Metal</th>
              </tr>
              <tr>
                <th>Cardboard</th>
              </tr>
            </table>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="gst">
          <div>
            <p>E-way bill no.</p>
          </div>
          <div className="amtinfo">
            <div>Amount</div>
            <div>
              <p>CGST @ {cgst}</p>
              <p>SGST @ {sgst}</p>
              <p>IGST @ {igst}</p>
            </div>
            <div>G. Total</div>
          </div>
          <div className="amtval">
            <p className="amtval-first"></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div className="amtval">
            <p className="amtval-first"></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Main;
