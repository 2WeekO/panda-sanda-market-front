import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate로 변경

function ProductItem({ imgSrc, title, price, address, status, productId }) {
  const navigate = useNavigate(); // useNavigate로 페이지 이동을 위한 navigate 객체 생성

  const handleClick = () => {
    if (productId) { // productId가 있을 때만 navigate 호출
      navigate(`/product/detail/${productId}`); // 클릭 시 상세 페이지로 이동
    } else {
      console.error("Product ID is undefined"); // 디버깅을 위한 콘솔 출력
    }
  };

  return (
    <div className="product" onClick={handleClick}> {/* 클릭 시 handleClick 호출 */}
      <div className="product-img">
        <img className="product-img" src={imgSrc} alt={title} />
      </div>
      <div className="product-text title">{title}</div>
      <div className="product-text price">{price}</div>
      <div className="product-text address">{address}</div>
      <div className="product-text status">{status}</div>
    </div>
  );
}

export default ProductItem;

