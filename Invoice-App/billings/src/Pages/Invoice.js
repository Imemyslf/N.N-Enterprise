import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { downloadPDF } from "../Components/Invoice/Pdf"; // Updated import
import "../styles/Invoice.css";
import LogoInfo from "../Components/Invoice/LogoInfo";
import DataInput from "../Components/Invoice/DataInput";
import Main from "../Components/Invoice/MainBilling";
import { useParams } from "react-router-dom";
// import DownloadIcon from "@mui/icons-material/Download";

export const Invoice = () => {
  let { invoice } = useParams();
  const [extraInfo, setExtraInfo] = useState({});

  console.log(`invoice:- `, invoice);
  console.log(`invoice:- `, typeof invoice);
  const [LastBill, setLastBill] = useState({});
  const pdfRef = useRef();

  useEffect(() => {
    const fetchLastBill = async () => {
      try {
        const response = await axios.get(`/api/billings`);
        const data = response.data;
        if (data.length > 0) {
          setLastBill(data[data.length - 1]);
        } else {
          console.log("No billings found");
        }
      } catch (err) {
        console.error("Error fetching last bill:", err);
      }
    };

    const fetchInvoice = async (invoice) => {
      try {
        const response = await axios.get(
          `/api/billings/invoice/search/${invoice}`
        );
        const data = response.data;
        console.log(typeof data);
        if (data) {
          setLastBill(data);
        } else {
          console.log("No billings found");
        }
      } catch (err) {
        console.error("Error fetching invoice:", err);
      }
    };

    if (invoice) {
      console.log("Fetching invoice...");
      fetchInvoice(invoice);
    } else {
      fetchLastBill();
    }
  }, [invoice]);

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(pdfRef, LastBill, extraInfo);
    } catch (err) {
      alert("Error downloading PDF:", err);
    }
  };

  const setExtra = (details) => {
    setExtraInfo(details);
    console.log(`Inside Invoice:-`, extraInfo);
  };
  return (
    <>
      <div className="pdf">
        <button onClick={handleDownloadPDF}>Download Pdf</button>
      </div>

      <div className="bill-container" ref={pdfRef}>
        <LogoInfo />
        <DataInput copmanyBill={LastBill} sendExtraData={setExtra} />
        <Main copmanyBill={LastBill} />
      </div>
    </>
  );
};
