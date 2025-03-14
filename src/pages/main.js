import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductItem from "./Component/ProductItem";

function Main() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [categoryKeyword, setCategoryKeyword] = useState(""); // 카테고리 상태

  

  // 카테고리 클릭 시 상품 목록 변경
  const handleCategoryClick = (category) => {
    setCategoryKeyword(category === "전체" ? "" : category);
  };

  // 상품 데이터 불러오기
  useEffect(() => {
    
    
    const fetchProducts = async () => {
      
      try {
        const url = categoryKeyword
          ? `${API_URL}/api/product/category?category=${categoryKeyword}`
          : `${API_URL}/api/product/all`;

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("상품 데이터를 불러오는 데 실패했습니다.");
      }
      
    };

    fetchProducts();
  }, [categoryKeyword]); // 카테고리 변경 시 API 호출

  
  if (error) return <div>{error}</div>;

  const formatPrice = (price) => price.toLocaleString() + "원";

  return (
    <div>
      {/* 카테고리 버튼 */}
      <div className="category-box">
        {["전체", "전자제품", "가구/인테리어", "의류/패션", "서적/미디어", "스포츠/레저", "생활용품", "기타제품"].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={categoryKeyword === category || (category === "전체" && categoryKeyword === "") ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 카테고리 제목 */}
      <div className="product-view">
        {categoryKeyword ? `${categoryKeyword} 카테고리 상품` : "전체 상품"}
      </div>

      {/* 상품 리스트 */}
      <div className="product-box">
        {products.length > 0 ? (
          products.map((product) => (
            <Link
              className="product-text"
              to={`/product/detail/${product.itemKey}` }
              key={product.itemKey}
            >
              <ProductItem
                imgSrc={product.images?.[0] || "/images/default.jpg"} // 첫 번째 이미지 없으면 기본 이미지 사용
                tradeMethod={product.tradeMethod}
                shippingMethod={product.shippingMethod}
                title={product.productName}
                price={`${formatPrice(product.price)}`}
                address={product.userAddress || "지역 정보 없음"}
                status={`${product.productCondition}`}
                productId={product.itemKey}
              />
            </Link>
          ))
        ) : (
          <p>해당 카테고리에 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Main;
