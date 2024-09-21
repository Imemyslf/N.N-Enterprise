import { useState, useEffect } from "react";
import axios from "axios";

export const BillList = () => {
  const [billInfo, setBillInfo] = useState({});
  const [billStatus, setBillStatus] = useState(false);

  useEffect(() => {
    const showbills = async () => {
      const repsonse = await axios.get(`http://localhost:8000/api/billings`);

      console.log(repsonse.data);
      if (repsonse.status === 201) {
        console.log(repsonse.data);
        setBillInfo(repsonse.data);
        setBillStatus(true);
      } else {
        console.log(repsonse);
      }
    };

    showbills();
  });
  return <></>;
};
