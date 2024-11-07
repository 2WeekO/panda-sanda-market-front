import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [images, setImages] = useState(['', '', '','','']);
  const [productName, setProductName] = useState('');
  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [category3, setCategory3] = useState('');
  const [productCondition, setProductCondition] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tradeMethod, setTradeMethod] = useState('');
  const [wayComment, setWayComment] = useState('')
  const [shippingMethod, setShippingMethod] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 확인
  
  const category1Options = [
    '전자제품',
    '가구/인테리어',
    '의류/패션',
    '서적/미디어',
    '스포츠/레저',
    '생활용품',
    '기타제품'
  ];
  
  const category2Options = {
    전자제품: ['휴대폰/태블릿', '노트북/컴퓨터', '음향기기', '기타제품'],
    '가구/인테리어': ['침대', '소파', '책상', '기타제품'],
    '의류/패션': ['남성 의류', '여성 의류', '아동 의류', '기타제품'],
    '서적/미디어': ['소설', '비문학', '학습 교재', '기타제품'],
    '스포츠/레저': ['운동기구', '캠핑용품', '기타제품'],
    '생활용품': ['주방용품', '청소 도구', '기타제품'],
  };
  
  const category3Options = {
    '휴대폰/태블릿': ['스마트폰', '태블릿', '기타제품'],
    '노트북/컴퓨터': ['노트북', '데스크탑', '기타제품'],
    음향기기: ['헤드폰', '스피커', '기타제품'],
    침대: ['퀸 침대', '킹 침대', '기타제품'],
    소파: ['1인 소파', '3인 소파', '기타제품'],
    '남성 의류': ['셔츠', '바지', '아우터', '기타제품'],
    '여성 의류': ['티셔츠', '스커트', '드레스', '기타제품'],
    '아동 의류': ['유아복', '아동복', '기타제품'],
  };


  useEffect(() => {
    
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      navigate('/login');
      alert("로그인이 필요합니다.(토큰이 존재하지 않습니다.");
      return;
    }
  },);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];

    // 이미 선택된 이미지들과 비교하여 중복 체크
    const isDuplicate = images.some((img) => img && img.name === file.name && img.size === file.size);
    
    if (isDuplicate) {
        alert('같은 이미지를 두 번 올릴 수 없습니다.');
        return;
    }

    const newImages = [...images];
    newImages[index] = file; // 파일을 배열에 저장
    setImages(newImages);

    

};

  // FormData를 사용한 상품 등록
  const ProductController = async () => {
    const formData = new FormData();

    // 이미지 파일을 FormData에 추가
    images.forEach((image, index) => {
      if (image) {
        formData.append('images', image);
      }
    });

    // 다른 상품 데이터도 FormData에 추가
    formData.append('productName', productName);
    formData.append('category1', category1);
    formData.append('category2', category2);
    formData.append('category3', category3);
    formData.append('productCondition', productCondition);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('tradeMethod', tradeMethod);
    formData.append('wayComment', wayComment);
    formData.append('shippingMethod', shippingMethod);

    try {
      const resProduct = await axios.post("https://localhost:8080/api/product/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(resProduct);
      window.location.href = '/';
      alert("상품이 등록되었습니다.");

    } catch (err) {
      console.error('Error during product registration:', err);
      alert(err.response?.data?.message || err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();  // 기본 폼 제출 동작 방지
    ProductController();      // ProductController 호출
  };

  

  return (
    <div className="product-form-container">
      <h1>상품 판매 하기</h1>
      <form onSubmit={handleSubmit}>
        <div className="image-upload-section input-group">
          <label>상품 사진</label>
          <div className="image-upload-wrapper">
            {images.map((image, index) => (
              <div key={index} className="image-upload" onClick={() => document.getElementById(`file-input-${index}`).click()}>
                <input
                  type="file"
                  id={`file-input-${index}`}
                  className="file-input"
                  style={{ display: 'none' }} // 파일 입력을 숨김
                  onChange={(e) => handleImageChange(index, e)}
                />
                {image ? (
                  <img src={URL.createObjectURL(image)} alt={`미리보기 ${index + 1}`} className="preview-image" />
                ) : (
                  <p className='file-input-text'>이미지 업로드 {index + 1 }</p>
                )}
              </div>
              
            ))}
          </div>
        </div>
        <div className="input-group">
          <label>상품 명</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="상품을 입력하세요."
          />
        </div>

        <div className="input-group category">
          <label>카테고리 설정</label>
          <select value={category1} onChange={(e) => {
            setCategory1(e.target.value);
            setCategory2(''); // 2분류 초기화
            setCategory3(''); // 3분류 초기화
          }}>
            <option value="">1분류 선택</option>
            {category1Options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select value={category2} onChange={(e) => {
            setCategory2(e.target.value);
            setCategory3(''); // 3분류 초기화
          }}>
            <option value="">2분류 선택</option>
            {category2Options[category1]?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select value={category3} onChange={(e) => setCategory3(e.target.value)}>
            <option value="">3분류 선택</option>
            {category3Options[category2]?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>상품 상태</label>
          <div className="condition-selector">
            {['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'].map((cond) => (
              <button
                type="button"
                key={cond}
                className={productCondition === cond ? 'selected' : ''}
                onClick={() => setProductCondition(cond)}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>상품 설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="제품에 대해서 자세하게 작성해주세요."
          ></textarea>
        </div>

        <div className="input-group">
          <label>상품 가격</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격 입력"
          />

          <label>상품 수량</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </div>

        <div className="input-group">
          <label>거래 방법</label>
          <div>
            <div className='flex'>
              <input
                type="radio"
                value="직거래"
                checked={tradeMethod === '직거래'}
                onChange={(e) => setTradeMethod(e.target.value)}
              />
              <label>직거래</label>
            </div>
            <input
              value={wayComment}
              onChange={(e) => setWayComment(e.target.value)}
              type="text"
              placeholder="직거래 선택 시 참고해야 하는 전달 사항을 작성해주세요."
            />

            <div className='flex'>
              <input
                type="radio"
                value="택배"
                checked={tradeMethod === '택배'}
                onChange={(e) => setTradeMethod(e.target.value)}
              />
              <label>택배</label>
            </div>
          </div>
        </div>

        {tradeMethod === '택배' && (
          <div className="input-group">
            <label>배송 유형</label>
            <div>
              <div className='flex'>
                <input
                  type="radio"
                  value="선불"
                  checked={shippingMethod === '선불'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <label>선불</label>
              </div>
              <div className='flex'>
                <input
                  type="radio"
                  value="착불"
                  checked={shippingMethod === '착불'}
                  onChange={(e) => setShippingMethod(e.target.value)}
                />
                <label>착불</label>
              </div>
            </div>
          </div>
        )}

        <div className='center'>
          <button type="submit" className="submit-button">등록 하기</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
