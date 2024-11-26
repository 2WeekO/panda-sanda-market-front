import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DecisionModal from "./Component/DecisionModal";
import SellerAccountInfo from './Component/SellerAccount';

const PurchasePage = () => {

  const navigate = useNavigate();

  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
    const [isSellerAccountModalOpen, setIsSellerAccountModalOpen] = useState(false);
  
    const [selectedRequestId, setSelectedRequestId] = useState(null); // 선택된 요청 ID 관리
  
    // 모달 열기
    const openDecisionModal = (requestId) => {
      setSelectedRequestId(requestId); // 요청 ID 저장
      setIsDecisionModalOpen(true); // 승인/거부 모달 열기
    };
  
    const openSellerAccountModal = (requestId) => {
      setSelectedRequestId(requestId); // 요청 ID 저장
      setIsSellerAccountModalOpen(true); // 계좌 모달 열기
    };
  
    // 모달 닫기
    const closeModal = () => {
      setIsDecisionModalOpen(false);
      setIsSellerAccountModalOpen(false);
    };

  useEffect(() => {
    const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 확인

    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      navigate('/login');
      alert("로그인이 필요합니다.");
    }
    
  }, [navigate]);


  return (
    
    <div>
      <h1>구매 요청 관리</h1>
      
      {/* 예시 버튼 */}
      <button className='button-modal' onClick={() => openDecisionModal(1)}>구매 요청 승인/거부</button>
      <button className='button-modal' onClick={() => openSellerAccountModal(1)}>판매자 계좌 보기</button>

      {/* 승인/거부 모달 */}
      {isDecisionModalOpen && (
        <DecisionModal
          requestId={selectedRequestId}
          isOpen={isDecisionModalOpen}
          onClose={closeModal}
        />
      )}

      {/* 판매자 계좌 정보 */}
      {isSellerAccountModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className='close-button' onClick={closeModal}>&times; </button>
            <SellerAccountInfo requestId={selectedRequestId} />
          </div>
        </div>
      )}
    </div>
    
  );
};

export default PurchasePage;
