// import { useState, useEffect } from "react";

// import Bank from "./Banksign";

// function Main({ copmanyBill }) {
//   const [companyMat, setCompanyMat] = useState([]);
//   let cgst = "2.5%";
//   let sgst = "2.5%";
//   let igst = "5%";
//   let cgstAmt = 0;
//   let sgstAmt = 0;
//   let igstAmt = 0;
//   let amount = 0;
//   let totalAmt = 0;
//   let grandtotal = 0;
//   console.log(copmanyBill.companyMaterials);
//   useEffect(() => {
//     if (copmanyBill && copmanyBill.companyMaterials) {
//       setCompanyMat(copmanyBill.companyMaterials);
//     }
//   }, [copmanyBill]);

//   companyMat.map((material) => {
//     const rate = material.rate;
//     const kg = material.kg;

//     console.log(rate, kg);
//     amount = rate * kg;
//     totalAmt += amount;
//   });

//   cgstAmt = totalAmt * (2.5 / 100);
//   sgstAmt = totalAmt * (2.5 / 100);
//   grandtotal = totalAmt + cgstAmt + sgstAmt;

//   return (
//     <>
//       <div className="catalogue">
//         <div className="catinfo">
//           <div>
//             <p>Sr.No</p>
//           </div>
//           <div>
//             <p>Particulars</p>
//           </div>
//           <div>
//             <p>Kg</p>
//           </div>
//           <div>
//             <p>Rate</p>
//           </div>
//           <div>
//             <p>Amount Rs.</p>
//           </div>
//           <div>
//             <p>Ps.</p>
//           </div>
//           <div>
//             <p>Remarks</p>
//           </div>
//         </div>
//         <div className="catdata">
//           {companyMat.length > 0 &&
//             companyMat.map((material, index) => (
//               <>
//                 <div style={{ borderStyle: "none solid solid solid" }}>
//                   {index + 1}
//                 </div>
//                 <div id="beforemetadata">
//                   <p style={{ textAlign: "start", marginLeft: "0.5em" }}>
//                     {material.name}
//                   </p>
//                 </div>
//                 <div>{material.kg}</div>
//                 <div>{material.rate}</div>
//                 <div>{material.kg * material.rate}</div>
//                 <div></div>
//                 <div></div>
//               </>
//             ))}
//         </div>
//         <div className="gst">
//           <div>
//             <p>E-way bill no.</p>
//           </div>
//           <div className="amtinfo">
//             <div>Amount</div>
//             <div>
//               <p>CGST @ {cgst}</p>
//               <p>SGST @ {sgst}</p>
//               <p>IGST @ {igst}</p>
//             </div>
//             <div>G. Total</div>
//           </div>
//           <div className="amtval">
//             <p className="amtval-first">{totalAmt}</p>
//             <p>{cgstAmt}</p>
//             <p>{sgstAmt}</p>
//             <p></p>
//             <p>{grandtotal}</p>
//           </div>
//           <div className="amtval">
//             <p className="amtval-first"></p>
//             <p></p>
//             <p></p>
//             <p></p>
//             <p></p>
//           </div>
//           <div></div>
//         </div>
//       </div>
//       <Bank figures={grandtotal} company={copmanyBill} />
//     </>
//   );
// }

// export default Main;


import { useState, useEffect } from "react";
import Bank from "./Banksign";

function Main({ copmanyBill }) {
  const [companyMat, setCompanyMat] = useState([]);
  let cgst = "2.5%";
  let sgst = "2.5%";
  let igst = "5%";
  let cgstAmt = 0;
  let sgstAmt = 0;
  let igstAmt = 0;
  let amount = 0;
  let totalAmt = 0;
  let grandtotal = 0;

  useEffect(() => {
    if (copmanyBill && copmanyBill.companyMaterials) {
      setCompanyMat(copmanyBill.companyMaterials);
    }
  }, [copmanyBill]);

  const getNumber = (value) => {
    if (typeof value === "object" && value !== null && "$numberDecimal" in value) {
      return parseFloat(value["$numberDecimal"]);
    }
    return typeof value === "number" ? value : parseFloat(value) || 0;
  };

  companyMat.map((material) => {
    const rate = getNumber(material.rate);
    const kg = getNumber(material.kg);
    amount = rate * kg;
    totalAmt += amount;
  });

  cgstAmt = totalAmt * (2.5 / 100);
  sgstAmt = totalAmt * (2.5 / 100);
  grandtotal = totalAmt + cgstAmt + sgstAmt;

  return (
    <>
      <div className="catalogue">
        <div className="catinfo">
          <div>
            <p>Sr.No</p>
          </div>
          <div>
            <p>Particulars</p>
          </div>
          <div>
            <p>Kg</p>
          </div>
          <div>
            <p>Rate</p>
          </div>
          <div>
            <p>Amount Rs.</p>
          </div>
          <div>
            <p>Ps.</p>
          </div>
          <div>
            <p>Remarks</p>
          </div>
        </div>
        <div className="catdata">
          {companyMat.length > 0 &&
            companyMat.map((material, index) => {
              const rate = getNumber(material.rate);
              const kg = getNumber(material.kg);
              return (
                <>
                  <div style={{ borderStyle: "none solid solid solid" }}>
                    {index + 1}
                  </div>
                  <div id="beforemetadata">
                    <p style={{ textAlign: "start", marginLeft: "0.5em" }}>
                      {material.name}
                    </p>
                  </div>
                  <div>{kg}</div>
                  <div>{rate}</div>
                  <div>{(kg * rate).toFixed(2)}</div>
                  <div></div>
                  <div></div>
                </>
              );
            })}
        </div>
        <div className="gst">
          <div>
            <p>E-way bill no.</p>
          </div>
          <div className="amtinfo">
            <div>Amount</div>
            <div>
              <p>CGST @ {cgst}</p>
              <p>SGST @ {sgst}</p>
              <p>IGST @ {igst}</p>
            </div>
            <div>G. Total</div>
          </div>
          <div className="amtval">
            <p className="amtval-first">{totalAmt.toFixed(2)}</p>
            <p>{cgstAmt.toFixed(2)}</p>
            <p>{sgstAmt.toFixed(2)}</p>
            <p></p>
            <p>{grandtotal.toFixed(2)}</p>
          </div>
          <div className="amtval">
            <p className="amtval-first"></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <div></div>
        </div>
      </div>
      <Bank figures={grandtotal} company={copmanyBill} />
    </>
  );
}

export default Main;
