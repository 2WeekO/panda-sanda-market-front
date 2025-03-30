import React from "react";

function ProductItem({ imgSrc, title,tradeMethod,shippingMethod, price, address, status, showEditDeleteButtons, onDelete , onEdit }) {

  return (
    <div className="product">
      
      <div className="product-img">
        <img className="product-img" src={imgSrc} alt={title} />
      </div>
      <div className="display-block">
      <div className="product-text title">{title}</div>
      <div className="product-text price">{price}</div>
      <div className="product-text address">{address}</div>

      <div className="display-flex">
      <div className="product-text status">{status}</div>
      <div className="product-text transaction-method">{tradeMethod}{shippingMethod}</div>
      </div>
      {/* 수정 & 삭제 버튼 */}
      {showEditDeleteButtons && (
        <div className="product-text product-buttons">
          <button
            className="product-text product-button edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(); // 수정 버튼 클릭 시 수정 페이지로 이동
            }}
          >
            수정
          </button>
          <button
            className="product-text product-button delete"
            onClick={(e) => { e.stopPropagation(); onDelete(); }} // 삭제 버튼 클릭 시 삭제 동작
          >
            삭제
          </button>
        </div>
      )}
    </div>
    </div>
  );
}

export default ProductItem;
