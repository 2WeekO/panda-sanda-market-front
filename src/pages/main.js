import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ProductItem from './Component/ProductItem';

function Main() {
  const [products, setProducts] = useState([]); // 상품 데이터를 위한 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null);     // 에러 상태 추가

  useEffect(() => {
    axios
      .get("https://pandasanda.shop:8080/api/product/all")
      .then((response) => {
        setProducts(response.data); // 서버로부터 받은 상품 데이터를 상태에 저장
        setLoading(false);          // 로딩 상태를 false로 변경
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('상품 데이터를 불러오는 데 실패했습니다.  서버 확인이 필요합니다.'); // 에러 메시지 설정
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>; // 에러 메시지 표시

  // 가격 포맷팅 함수
  const formatPrice = (price) => price.toLocaleString() + "원";

  return (
    <div>
        <div className="product-view">전체 상품</div>
        <div className="product-box">
            {products.map((product) => (
                <Link className = "product-text" to={`/product/detail/${product.itemKey}`} key={product.itemKey}>
                    <ProductItem
                        imgSrc={product.images?.[0] || '/images/default.jpg'}  // 첫 번째 이미지 사용, 없으면 기본 이미지 경로
                        title={product.productName}
                        price={`${formatPrice(product.price)}`}
                        address={product.userAddress || "지역 정보 없음"}
                        status={`상품 상태: ${product.productCondition}`}
                        productId={product.itemKey}
                    />
                </Link>
            ))}
        </div>
    </div>
  );
}

export default Main;
