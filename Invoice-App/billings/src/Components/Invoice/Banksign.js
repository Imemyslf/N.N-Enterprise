import React from "react";

function Bank(props) {
  const { GSTNos, stateCode } = props.company;
  function convertToWords(number) {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];

    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const units = ["", "Thousand", "Lakh", "Crore"];

    if (number === 0) return "zero rupees";

    let word = "";
    let i = 0;

    while (number > 0) {
      let part = number % 1000;

      if (i === 1) {
        part = number % 100;
        number = Math.floor(number / 100);
      } else {
        number = Math.floor(number / 1000);
      }

      if (part !== 0) {
        word =
          convertToWordsInHundred(part, i === 0) + " " + units[i] + " " + word;
      }
      i++;
    }

    return word.trim() + " rupees";
  }

  function convertToWordsInHundred(number, isLastPart) {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];

    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    let words = "";
    const hasHundreds = Math.floor(number / 100) > 0;
    const lastTwoDigits = number % 100;

    if (lastTwoDigits < 10 || lastTwoDigits > 19) {
      words = ones[number % 10];
      number = Math.floor(number / 10);
      words = tens[number % 10] + " " + words;
      number = Math.floor(number / 10);
    } else {
      words = teens[lastTwoDigits - 10];
      number = Math.floor(number / 100);
    }

    if (number === 0) {
      return words.trim(); // No "and" if no hundreds part
    } else if (hasHundreds && lastTwoDigits !== 0 && isLastPart) {
      return ones[number] + " hundred and " + words.trim(); // Use "and" only when there are tens/ones
    } else {
      return ones[number] + " hundred " + words.trim(); // No "and" if no tens/ones part
    }
  }

  function convertToIndianCurrency(number) {
    const rupees = Math.floor(number);
    const paise = Math.round((number - rupees) * 100);

    let result = convertToWords(rupees);

    if (paise > 0) {
      result += " and " + convertToWords(paise) + " paise";
    }

    return result;
  }
  const figToWords = convertToWords(props.figures);
  return (
    <>
      <div className="amtbanksign">
        <div className="amtbank">
          <div className="amt">
            <p>
              Amount in words:{" "}
              <span style={{ fontWeight: "bold" }}>{figToWords}</span>
            </p>
          </div>
          <div className="bank">
            <p>Bank Details:</p>
            <p>Canara Bank: Current Account No. 120024177121</p>
            <p>IFSC code: CNRB0017204</p>
            <p>Branch: Betim Goa.</p>
          </div>
        </div>
        <div className="sign">
          <p>for N.N ENTERPRISE</p>
        </div>
      </div>
      <div className="partyrec">
        <div className="party">
          <p>Party CST No.</p>
          <div className="gstinput">
            <label htmlFor="">Party GSTIN No.</label>
            <input type="text" value={GSTNos} />
          </div>
          <div className="spacebet">
            <div>
              State Code: <span>{stateCode}</span>
            </div>
            <div>E.& O.E</div>
          </div>
        </div>
        <div className="rec">
          <p>Receivers Sign. & Stamp</p>
          <p className="r2"></p>
        </div>
      </div>
      <div className="note">
        <p>
          {" "}
          <u>Note: -</u> *Amount shall be billed as per the quantity acceptable
          to the party.
        </p>
      </div>
    </>
  );
}

export default Bank;
