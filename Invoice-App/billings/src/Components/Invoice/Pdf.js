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
    const pdf = new jsPDF("p", "pt", "a4", true);
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

      try {
        console.log("before mail:-", LastBill);

        const result = await axios.get(
          `http://localhost:8000/api/sendMail?email=${LastBill.email}&invoice=${LastBill.invoiceNos}`
        );

        if (result) {
          console.log("success", JSON.stringify(result));
          alert(`${result.message}\nPath:- {result.path}`);
        }
      } catch (err) {
        console.log("error message:-", err);
      }
    } else {
      console.log("Error while uploading pdf files");
    }
  } catch (e) {
    console.log(`Server Error Message: ${e.message}`);
  }
};

export { downloadPDF };
