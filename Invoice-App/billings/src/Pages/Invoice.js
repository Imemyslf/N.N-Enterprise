import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import "../styles/Invoice.css";
import LogoInfo from "../Components/LogoInfo";
import DataInput from "../Components/DataInput";
import Main from "../Components/MainBilling";

export const Invoice = () => {
  const [LastBill, setLastBill] = useState({});
  const [count, setCount] = useState(0);
  const pdfRef = useRef();
  useEffect(() => {
    const lastBill = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/billings`);
        const data = response.data;
        if (data.length > 0) {
          const length = data.length;
          const lBill = data[length - 1];
          console.log(lBill);
          setLastBill(lBill);
        } else {
          console.log("No billings found");
        }
      } catch (err) {
        console.log("Error message", err);
        console.log("Server error");
      }
    };

    lastBill();
  }, []);

  const downloadPOF = async () => {
    const input = pdfRef.current;
    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      console.log(
        `imgData: ${imgData}, pdfWidth: ${pdfWidth}, pdfHeight: ${pdfHeight}, imgWidth: ${imgWidth}, imgHeight: ${imgHeight}`
      );

      const blobFile = pdf.output("blob");

      const formData = new FormData();
      formData.append("file", blobFile, `${LastBill.invoiceNos}`);
      formData.append("invoiceNos", LastBill.invoiceNos);

      const response = await axios.post(
        `http://localhost:8000/api/invoice/upload`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        console.log("Pdf uploaded successfully");
      } else {
        console.log("Error while uploading pdf files");
      }
    } catch (e) {
      console.log(`Server Error Message: ${e.message}`);
    }
  };

  return (
    <>
      <div className="bill-container" ref={pdfRef}>
        <LogoInfo />
        <DataInput copmanyBill={LastBill} />
        <Main copmanyBill={LastBill} />
      </div>
      <button className="pdf" onClick={downloadPOF}>
        Click Me
      </button>
    </>
  );
};
