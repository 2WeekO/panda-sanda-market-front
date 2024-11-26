import React, { useEffect, useState } from "react";
import { getSellerAccount } from "../../Services/purchaseService";

const SellerAccountInfo = ({ requestId }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await getSellerAccount(token, requestId);
        setAccount(response.data);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };

    fetchAccount();
  }, [requestId]);

  if (!account) return <p>계좌 정보를 불러오는 중...</p>;

  return (
    <div>
      <h3>판매자 계좌 정보</h3>
      <p>은행명: {account.bankName}</p>
      <p>계좌번호: {account.accountNumber}</p>
      <p>예금주: {account.accountHolder}</p>
    </div>
  );
};

export default SellerAccountInfo;
