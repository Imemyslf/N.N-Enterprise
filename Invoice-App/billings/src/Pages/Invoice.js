// import { useState, useEffect, useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import axios from "axios";
// import { downloadPDF1, downloadPDF2 } from "../Components/Invoice/Pdf";
// import "../styles/Invoice.css";
// import LogoInfo from "../Components/LogoInfo";
// import DataInput from "../Components/DataInput";
// import Main from "../Components/MainBilling";

// export const Invoice = () => {
//   const [LastBill, setLastBill] = useState({});
//   const pdfRef = useRef();
//   useEffect(() => {
//     const lastBill = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/billings`);
//         const data = response.data;
//         if (data.length > 0) {
//           const length = data.length;
//           const lBill = data[length - 1];
//           console.log(lBill);
//           setLastBill(lBill);
//         } else {
//           console.log("No billings found");
//         }
//       } catch (err) {
//         console.log("Error message", err);
//         console.log("Server error");
//       }
//     };

//     lastBill();
//   }, []);

//   const downloadPDF = async () => {
//     <>
//       <downloadPDF1 />
//     </>;
//   };

//   // const downloadPDF = async () => {
//   //   <>
//   //     <downloadPDF2 />
//   //   </>;
//   // };

//   return (
//     <>
//       <div className="bill-container" ref={pdfRef}>
//         <LogoInfo />
//         <DataInput copmanyBill={LastBill} />
//         <Main copmanyBill={LastBill} />
//       </div>
//       <button className="pdf" onClick={downloadPDF}>
//         Click Me
//       </button>
//     </>
//   );
// };

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { downloadPDF } from "../Components/Invoice/Pdf"; // Updated import
import "../styles/Invoice.css";
import LogoInfo from "../Components/LogoInfo";
import DataInput from "../Components/DataInput";
import Main from "../Components/MainBilling";

export const Invoice = () => {
  const [LastBill, setLastBill] = useState({});
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

  const handleDownloadPDF = async () => {
    await downloadPDF(pdfRef, LastBill); // Call the combined downloadPDF function
  };

  return (
    <>
      <div className="bill-container" ref={pdfRef}>
        <LogoInfo />
        <DataInput copmanyBill={LastBill} />
        <Main copmanyBill={LastBill} />
      </div>
      <button className="pdf" onClick={handleDownloadPDF}>
        Click Me
      </button>
    </>
  );
};
