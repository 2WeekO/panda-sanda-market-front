import React, { useState } from 'react';
import BuyerRequestPage from './Component/BuyerRequestPage'; // 구매자 페이지 컴포넌트
import SellerRequestPage from './Component/SellerRequestPage';

const ProductManagement = () => {
  const [activePage, setActivePage] = useState('buyer'); // 'buyer' 또는 'seller'

  return (
    <div className="page-container">
      
      <div className="button-container">
        <button
          onClick={() => setActivePage('buyer')}
          className={`page-button ${activePage === 'buyer' ? 'active' : ''}`}
        >
          구매 신청 목록
        </button>
        <button
          onClick={() => setActivePage('seller')}
          className={`page-button ${activePage === 'seller' ? 'active' : ''}`}
        >
          나의 판매 상품 목록
        </button>
      </div>
  
      <div className="content-container">
        {activePage === 'buyer' && <BuyerRequestPage />}
        {activePage === 'seller' && <SellerRequestPage />}
      </div>
    </div>
  );
  
};

export default ProductManagement;