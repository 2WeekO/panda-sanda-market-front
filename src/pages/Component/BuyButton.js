import React, { useState } from "react";
import PurchaseRequestModal from "./PurchaseRequestModal";

const BuyButton = ({ sellerId ,productId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const token = localStorage.getItem('token');

  const openController = () => {
    if (!token) { // 로그인 필요 알림
      alert("로그인이 필요합니다.");
      return;
    }
    openModal(); // 로그인이 되어있다면 구매 메시지 보내기 가능
  }

  return (
    <>
      <button type="button" className="purchase-button" onClick={openController}>
        구입 신청
      </button>
      <PurchaseRequestModal
        productId={productId}
        sellerId={sellerId}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default BuyButton;
