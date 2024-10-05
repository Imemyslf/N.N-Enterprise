// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import axios from "axios";

// const downloadPDF1 = async () => {
//   const input = pdfRef.current;
//   try {
//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4", true);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     const imgWidth = canvas.width;
//     const imgHeight = canvas.height;
//     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//     const imgX = (pdfWidth - imgWidth * ratio) / 2;
//     const imgY = 30;
//     pdf.addImage(
//       imgData,
//       "PNG",
//       imgX,
//       imgY,
//       imgWidth * ratio,
//       imgHeight * ratio
//     );

//     console.log(
//       `imgData: ${imgData}, pdfWidth: ${pdfWidth}, pdfHeight: ${pdfHeight}, imgWidth: ${imgWidth}, imgHeight: ${imgHeight}`
//     );

//     const blobFile = pdf.output("blob");
//     console.log("Last Bill before uploading:- ", LastBill.invoiceNos);
//     const formData = new FormData();
//     formData.append("file", blobFile, `${LastBill.invoiceNos}`);
//     formData.append("invoiceNos", LastBill.invoiceNos);

//     const response = await axios.post(
//       `http://localhost:8000/api/invoice/upload`,
//       formData,
//       {
//         headers: { "Content-type": "multipart/form-data" },
//       }
//     );
//     if (response.status === 200) {
//       console.log("Pdf uploaded successfully");
//     } else {
//       console.log("Error while uploading pdf files");
//     }
//   } catch (e) {
//     console.log(`Server Error Message: ${e.message}`);
//   }
// };

// const downloadPDF2 = async () => {
//   const input = pdfRef.current;
//   try {
//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4", true);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     const imgWidth = canvas.width;
//     const imgHeight = canvas.height;
//     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//     const imgX = (pdfWidth - imgWidth * ratio) / 2;
//     const imgY = 30;
//     pdf.addImage(
//       imgData,
//       "PNG",
//       imgX,
//       imgY,
//       imgWidth * ratio,
//       imgHeight * ratio
//     );

//     // Generate the PDF Blob
//     const blobFile = pdf.output("blob");
//     const blobUrl = URL.createObjectURL(blobFile);

//     // Create an anchor element and trigger the download
//     const link = document.createElement("a");
//     link.href = blobUrl;
//     link.download = `${LastBill.invoiceNos}.pdf`; // Use LastBill.invoiceNos as the filename
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     // Clean up URL object
//     URL.revokeObjectURL(blobUrl);
//   } catch (e) {
//     console.log(`Server Error Message: ${e.message}`);
//   }
// };

// export { downloadPDF1, downloadPDF2 };

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const downloadPDF = async (pdfRef, LastBill) => {
  const input = pdfRef.current;
  if (!input || !LastBill) {
    console.error("Missing input reference or LastBill data.");
    return;
  }

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

    // Generate the PDF Blob
    const blobFile = pdf.output("blob");
    const blobUrl = URL.createObjectURL(blobFile);

    // Create an anchor element and trigger the download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${LastBill.invoiceNos}.pdf`; // Use LastBill.invoiceNos as the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up URL object
    URL.revokeObjectURL(blobUrl);

    // Uploading the PDF to the server
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

export { downloadPDF };
