import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkmark from "../../assets/Images/checkmark.png";
import "../../styles/Billing/ListBill.css";

export const BillList = () => {
  const navigate = useNavigate();
  const [billInfo, setBillInfo] = useState([]);

  useEffect(() => {
    const showbills = async () => {
      try {
        const repsonse = await axios.get(`/api/billings`);
        const data = repsonse.data;
        console.log(data);
        if (data.length > 0) {
          setBillInfo(repsonse.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    showbills();
  }, []);

  return (
    <>
      <div className="bills-container">
        <h1>Billing List</h1>
        <div className="table-wrapper">
          <div className="billing-table">
            {billInfo.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Invoice Nos</th>
                    <th>Company Name</th>
                    <th>Company Address</th>
                    <th>GST Number</th>
                    <th>Email</th>
                    <th>State Code</th>
                    <th>Materials</th>
                    <th>Rate/kg</th>
                    <th>Kg</th>
                    <th>Date & Time</th>
                    <th>Invoice Generated</th>
                  </tr>
                </thead>
                <tbody>
                  {billInfo.map((bill, index) => (
                    <tr
                      key={index}
                      onClick={() =>
                        navigate(`/billings/invoice/${bill.invoiceNos}`)
                      }
                    >
                      <td>{index + 1}</td>
                      <td>{bill.invoiceNos}</td>
                      <td>{bill.companyName}</td>
                      <td>{bill.address}</td>
                      <td>{bill.GSTNos}</td>
                      <td>{bill.email}</td>
                      <td>{bill.stateCode}</td>
                      <td>
                        {bill.companyMaterials.map((material, index) => (
                          <p key={index}>{material.name}</p>
                        ))}
                      </td>
                      <td>
                        {bill.companyMaterials.map((material, index) => (
                          <p key={index}>{material.rate}</p>
                        ))}
                      </td>
                      <td>
                        {bill.companyMaterials.map((material, index) => (
                          <p key={index}>{material.kg}</p>
                        ))}
                      </td>
                      <td>
                        {bill.date}
                        <br />
                        {bill.time}
                      </td>
                      <td className="checkmark">
                        {bill.invoiceGenerated && (
                          <img src={checkmark} alt="right mark" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: "center" }}>No Bill found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
