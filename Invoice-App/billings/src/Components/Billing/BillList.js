import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkmark from "../../assets/Images/checkmark.png";
import "../../styles/Billing/ListBill.css";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const deleteBill = async () => {
    try {
      await axios.delete(`/api/billings/delete`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteCompany = async (billNumber) => {
    console.log("billNumber:-", billNumber.invoiceNos);

    try {
      const result = await axios.delete(
        `/api/billings/delete/${billNumber.invoiceNos}`
      );

      if (result.status === 200) {
        console.log(result.data);
        const updatedList = billInfo.filter(
          (bill) => bill.invoiceNos !== billNumber.invoiceNos
        );

        setBillInfo(updatedList);
        console.log(`billinfo after deletion:`, billInfo);
      }
    } catch (err) {
      console.log("Error:- ", err.message);
    }
  };

  return (
    <>
      <div className="bills-container">
        <h1 onClick={() => deleteBill()}>Billing List</h1>
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
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {billInfo.map((bill, index) => (
                    <tr
                      key={index}
                      // onClick={() =>
                      //   navigate(`/billings/invoice/${bill.invoiceNos}`)
                      // }
                    >
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {index + 1}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.invoiceNos}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.companyName}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.address}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.GSTNos}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.email}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.stateCode}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.companyMaterials.map((material, index) => (
                          <p key={index}>{material.name}</p>
                        ))}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.companyMaterials.map((material, index) => (
                          <p key={index}>{material.rate}</p>
                        ))}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.companyMaterials.map((material, index) => (
                          <p key={index}>{material.kg}</p>
                        ))}
                      </td>
                      <td
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.date}
                        <br />
                        {bill.time}
                      </td>
                      <td
                        className="checkmark"
                        onClick={() =>
                          navigate(`/billings/invoice/${bill.invoiceNos}`)
                        }
                      >
                        {bill.invoiceGenerated && (
                          <img src={checkmark} alt="right mark" />
                        )}
                      </td>
                      <td className="delete-btn">
                        <div onClick={() => handleDeleteCompany(bill)}>
                          <DeleteIcon />
                        </div>
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
