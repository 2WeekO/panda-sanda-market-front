import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import ProductItem from "./ProductItem";


const SearchResults = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword");
    const [products, setProducts] = useState([]);

    console.log("URL에서 가져온 키워드:", keyword); // URL 파라미터 확인용 로그

    useEffect(() => {
        if (keyword) {
            axios.get(`${API_URL}/api/product/search?keyword=${keyword}`)
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => console.error("검색 결과 가져오기 실패:", error));
        }
    }, [keyword]);

    // 가격 포맷팅 함수
    const formatPrice = (price) => price.toLocaleString() + "원";

    return (
        <div>
            <div className="product-view">"{keyword}" 키워드 상품</div>
            <div className="product-box">
            {products.map((product) => (
                <Link className = "product-text" to={`/product/detail/${product.itemKey}`} key={product.itemKey}>
                    <ProductItem
                        imgSrc={product.images?.[0] || '/images/default.jpg'}  // 첫 번째 이미지 사용, 없으면 기본 이미지 경로
                        tradeMethod={product.tradeMethod}
                        shippingMethod={product.shippingMethod}
                        title={product.productName}
                        price={`${formatPrice(product.price)}`}
                        address={product.userAddress || "지역 정보 없음"}
                        status={`${product.productCondition}`}
                        productId={product.itemKey}
                    />
                </Link>
                
            ))}
            </div>
        </div>
    );
};

export default SearchResults;
