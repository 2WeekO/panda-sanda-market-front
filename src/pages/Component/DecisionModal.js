import React, { useState } from "react";
import { decidePurchaseRequest } from "../../Services/purchaseService";

const DecisionModal = ({ requestId, isOpen, onClose }) => {
  const [decision, setDecision] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await decidePurchaseRequest(token, requestId, decision);
      alert(`요청이 성공적으로 ${decision === "APPROVE" ? "승인" : "거부"}되었습니다.`);
      onClose();
    } catch (error) {
      console.error("Error deciding request:", error);
      alert("결정 처리 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>구매 요청 결정</h2>
        <form onSubmit={handleSubmit}>
          <select value={decision} onChange={(e) => setDecision(e.target.value)} required>
            <option value="">결정 선택</option>
            <option value="APPROVE">승인</option>
            <option value="REJECT">거부</option>
          </select>
          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  );
};

export default DecisionModal;
