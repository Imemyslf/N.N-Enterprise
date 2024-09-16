import React from "react";

function DataInput() {
  return (
    <>
      <div className="data-input">
        <div className="input">
          <div className="lab">
            <label htmlFor="">M/s</label>
          </div>
          <div className="ta">
            <textarea
              name="Company"
              id="row1"
              rows={5}
              placeholder="Enter Company Name"
              cols={27}
            ></textarea>
          </div>
        </div>
        <div className="extra-input">
          <div className="labels1">
            <div>
              <label htmlFor="">Invoice Nos&nbsp;:</label>
              <br />
            </div>
            <div>
              <label htmlFor="">Order Nos&nbsp;&nbsp;&nbsp;&nbsp;:</label>
              <br />
            </div>
            <div>
              <label htmlFor="">Vehicle No&nbsp;&nbsp;&nbsp;:</label>
              <br />
            </div>
            <div>
              <label htmlFor="">
                Due date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
              </label>
            </div>
          </div>
          <div className="inputs1">
            <div>
              <input type="text" size={15} />
            </div>
            <div>
              <input type="text" size={15} />
            </div>
            <div>
              <input type="text" size={15} />
            </div>
            <div>
              <input type="text" size={15} />
            </div>
          </div>
          <div className="labels2">
            <div>
              <label htmlFor="">Date&nbsp;:</label>
            </div>
          </div>
          <div className="inputs2">
            <div>
              <input type="text" size={10} />
            </div>
          </div>
        </div>
      </div>
      <div className="extrathing">
        <div className="et1">
          <p>Transporter: - &nbsp;&nbsp;&nbsp;Direct</p>
        </div>
        <div className="et2">
          <p>Please receive the following goods in good conditions.</p>
        </div>
      </div>
    </>
  );
}

export default DataInput;
