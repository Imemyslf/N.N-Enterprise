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
  return (
    <>
      <div className="data-input">
        <div className="input">
          <div className="lab">
            <label htmlFor="" style={{ marginTop: "5px" }}>
              M/s
            </label>
          </div>
          <div className="ta">
            <textarea
              name="Company"
              id="row1"
              rows={3}
              value={
                copmanyBill.companyName
                  ? copmanyBill.companyName
                  : companyNameBill
              }
              placeholder="Enter Company name"
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
              <input type="text" size={15} value={copmanyBill.invoiceNos} />
            </div>
            <div>
              <input
                type="text"
                size={15}
                value={
                  copmanyBill.orderNos
                    ? copmanyBill.orderNos
                    : compnayDetails.orderNos
                }
              />
            </div>
            <div>
              <input
                type="text"
                size={15}
                value={
                  copmanyBill.vehicleNos
                    ? copmanyBill.vehicleNos
                    : compnayDetails.vehicleNos
                }
              />
            </div>
            <div>
              <input
                type="text"
                size={15}
                value={
                  copmanyBill.dueDate
                    ? copmanyBill.dueDate
                    : compnayDetails.dueDate
                }
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
                type="text"
                size={10}
                value={
                  copmanyBill.date ? copmanyBill.date : compnayDetails.date
                }
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
