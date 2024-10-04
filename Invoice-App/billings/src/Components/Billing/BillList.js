import { useState, useEffect } from "react";
import axios from "axios";

export const BillList = () => {
  const [billInfo, setBillInfo] = useState([]);
  const [billStatus, setBillStatus] = useState(false);

  useEffect(() => {
    const showbills = async () => {
      try {
        const repsonse = await axios.get(`http://localhost:8000/api/billings`);
        const data = repsonse.data;
        console.log(data);
        if (data.length > 0) {
          console.log(repsonse.data);
          setBillInfo(repsonse.data);
          setBillStatus(true);
        } else {
          console.log(repsonse);
        }
      } catch (e) {
        console.log(e);
      }
    };
    showbills();
  }, []);
  return (
    <>
      <div className="co-container">
        <h1>Billing List</h1>
        <div className="co-list">
          {billInfo.length > 0 ? (
            billInfo.map((billInfo, index) => (
              <div key={index}>
                <h2>Bill {index + 1}:-</h2>
                <h4>Company Name:- {billInfo.companyName}</h4>
                <h4>GST Nos:- {billInfo.GSTNos}</h4>
                <h4>Email:- {billInfo.email}</h4>
                <h4>State Code:- {billInfo.stateCode}</h4>
                <h4>Invoice Number:- {billInfo.invoiceNos}</h4>
                <h4>Materials: -</h4>
                <ul>
                  {billInfo.companyMaterials.map((material, index) => (
                    <li key={index}>{material.name}</li>
                  ))}
                </ul>
                <h4>Date:- {billInfo.date}</h4>
                <h4>Time:- {billInfo.time}</h4>
                <h4>Days Left:- {billInfo.daysLeft} days left</h4>
                <h4>
                  Invoice-Paid:- {billInfo.invoicePaid ? "Paid" : "Pending"}
                </h4>
              </div>
            ))
          ) : (
            <p>No Bill found</p>
          )}
        </div>
      </div>
    </>
  );
};
