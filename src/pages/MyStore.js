import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ProductItem from './Component/ProductItem';

const MyStorePage = () => {
  const [products, setProducts] = useState([]);
  const [userKey, setUserKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    // userKey 가져오는 API 호출
    axios.get('http://121.173.211.228:8080/api/user/key', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setUserKey(response.data);
    })
    .catch(error => {
      console.error("Error fetching userKey:", error);
      setError("유저 키를 가져오는 데 실패했습니다.");
    });
  }, []);

  useEffect(() => {
    if (userKey) {
      const token = localStorage.getItem('token');

      axios.get(`http://121.173.211.228:8080/api/user/mystore/${userKey}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError("상품 정보를 가져오는 데 실패했습니다.");
        setLoading(false);
      });
    }
  }, [userKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const formatPrice = (price) => price.toLocaleString() + "원";

  return (
    <div>
      <div className="product-view">마이스토어</div>
      <div className="product-box">
        {products.map(product => (
        <Link className = "product-text" to={`/product/detail/${product.itemKey}`} key={product.itemKey}>
        <ProductItem
            imgSrc={product.images[0]}
            title={product.productName}
            price={`${formatPrice(product.price)}`}
            address={product.userAddress || "지역 정보 없음"}
            status={`상품 상태: ${product.productCondition}`}
        />
        </Link>
    ))}
      </div>
    </div>
  );
};

export default MyStorePage;
