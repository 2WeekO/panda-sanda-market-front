import React, { useState } from "react";
import axios from "axios";


const AccountRegistrationModal = ({ isOpen, onClose }) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      onClose(); // 모달 닫기
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/account/register`,
        {
          accountNumber,
          bankName,
          holderName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("계좌가 성공적으로 등록되었습니다!");
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("계좌 등록 중 오류 발생:", error);
      alert("계좌 등록 중 문제가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>계좌 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="account-modal-text">
            은행 이름
            <input className="account-modal-text-input"
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="예: 국민은행"
              required
            />
          </div>
          <div className="account-modal-text">
            계좌 번호
            <input className="account-modal-text-input"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="계좌 번호를 입력하세요"
              required
            />
          </div>
          <div className="account-modal-text">
            예금주 이름
            <input className="account-modal-text-input"
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="예금주 이름을 입력하세요"
              required
            />
          </div>
          <button type="submit" className="submit-button-modal">
            계좌 등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountRegistrationModal;
