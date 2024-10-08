import { useState } from "react";

function DataInput({ copmanyBill }) {
  const [companyNameBill, setCompanynameBill] = useState("");
  const [compnayDetails, setCompanyDetails] = useState({
    invoiceNos: "",
    vehicleNos: "",
    orderNos: "",
    dueDate: "",
    date: "",
  });

  console.log(`inside DataInput:- `, copmanyBill.companyName);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value, // dynamically update the property based on input name
    }));
  };

  const company = `${copmanyBill.companyName}, ${copmanyBill.address}`;

  return (
    <>
      <div className="data-input">
        <div className="input">
          <div className="lab">
            <label htmlFor="" style={{ marginTop: "5px" }}>
              M/s
            </label>
          </div>
          <div style={{ marginTop: "15px" }}>{company}</div>
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
              <input
                type="text"
                style={{ paddingLeft: "5px" }}
                size={15}
                value={copmanyBill.invoiceNos}
                readOnly // Assuming this is not editable
              />
            </div>
            <div>
              <input
                style={{ paddingLeft: "5px" }}
                type="text"
                size={15}
                name="orderNos"
                value={
                  copmanyBill.orderNos
                    ? copmanyBill.orderNos
                    : compnayDetails.orderNos
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                style={{ paddingLeft: "5px" }}
                type="text"
                size={15}
                name="vehicleNos"
                value={
                  copmanyBill.vehicleNos
                    ? copmanyBill.vehicleNos
                    : compnayDetails.vehicleNos
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                style={{ paddingLeft: "5px" }}
                type="text"
                size={15}
                name="dueDate"
                value={
                  copmanyBill.dueDate
                    ? copmanyBill.dueDate
                    : compnayDetails.dueDate
                }
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="labels2">
            <div>
              <label htmlFor="">Date&nbsp;:</label>
            </div>
          </div>
          <div className="inputs2">
            <div>
              <input
                style={{ paddingLeft: "5px" }}
                type="text"
                size={10}
                name="date"
                value={
                  copmanyBill.date ? copmanyBill.date : compnayDetails.date
                }
                onChange={handleInputChange}
              />
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
