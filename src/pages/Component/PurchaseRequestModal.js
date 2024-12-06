import React, { useState } from "react";
import { createPurchaseRequest } from "../../Services/purchaseService";
import { getUserKey } from "../../Services/userService";

const PurchaseRequestModal = ({ productId, isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [userKey, setUserKey] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인이 필요합니다.");
      onClose(); // 팝업 닫기
      return;
    }

    try {
      // userKey를 가져오는 API 호출
      const fetchedUserKey = await getUserKey(token);
      setUserKey(fetchedUserKey);

      // 구매 요청을 생성
      await createPurchaseRequest(token, { buyerId: fetchedUserKey, productId, message });
      alert("구매 요청이 성공적으로 전송되었습니다!");
      onClose();
    } catch (error) {
      console.error("Error creating purchase request:", error);
      alert("구매 요청 전송 중 오류가 발생했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>구매 메시지 작성</h2>
        <p className="purchase-tips">
          💡 <b>구매 메시지 작성 팁</b><br />
          아래 정보를 포함하면 더 원활한 거래가 가능합니다😊
          <ul>
            <li><b>구매 희망 날짜 및 시간</b>: 상품을 언제 받을 수 있는지 작성해 주세요.</li>
            <li><b>거래 장소</b>: 직거래를 원할 경우, 희망 장소를 간단히 적어주세요.</li>
            <li><b>문의 사항</b>: 상품 상태나 추가 정보를 묻고 싶다면 간단히 질문해 주세요.</li>
            <li><b>연락 방법</b>: 빠른 답변을 위해 선호하는 연락 수단을 적어주세요.</li>
          </ul>
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="구매 메시지를 입력하세요."
            required
          />
          <button type="submit" className="submit-button-modal">
            구매 신청하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseRequestModal;
