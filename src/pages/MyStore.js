import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductItem from './Component/ProductItem';

const MyStorePage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  const [userKey, setUserKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // useNavigate로 페이지 이동

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    // userKey 가져오는 API 호출
    axios.get(`${API_URL}/api/user/key`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setUserKey(response.data);
    })
    .catch(error => {
      console.error("Error fetching userKey:", error);
      setError("유저 키를 가져오는 데 실패했습니다.");
    });
  }, [API_URL]);

  useEffect(() => {
    if (userKey) {
      const token = localStorage.getItem('token');
      axios.get(`${API_URL}/api/user/mystore/${userKey}`, {
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
  }, [userKey, API_URL]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const formatPrice = (price) => price.toLocaleString() + "원";

  const handleDelete = (productId) => {
    if (window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
      const token = localStorage.getItem('token');
  
      axios.delete(`${API_URL}/api/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setProducts(products.filter(product => product.itemKey !== productId));
        alert("상품이 삭제되었습니다.");
      })
      .catch(error => {
        console.error("Error deleting product:", error);
        alert("상품 삭제에 실패했습니다.");
      });
    }
  };

  const handleEdit = (productKey) => {
    navigate(`/product/${productKey}`);  // 수정 페이지로 이동
  };

  return (
    <div>
      <div className="product-view">마이스토어</div>
      <div className="product-box">
        {products.map(product => (
          <div
            className="product-text"
            key={product.itemKey}
            onClick={() => navigate(`/product/detail/${product.itemKey}`)} // 상품 클릭 시 상세 페이지로 이동
          >
            <ProductItem
              imgSrc={product.images[0]}
              title={product.productName}
              tradeMethod={product.tradeMethod}
              shippingMethod={product.shippingMethod}
              price={formatPrice(product.price)}
              address={product.userAddress || "지역 정보 없음"}
              status={`${product.productCondition}`}
              showEditDeleteButtons={true}
              onDelete={() => handleDelete(product.itemKey)}
              onEdit={() => handleEdit(product.itemKey)} // 수정 함수 호출
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStorePage;
