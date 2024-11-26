import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WishButton({ itemKey }) {
  const API_URL = process.env.REACT_APP_API_URL;

  const [userKey, setUserKey] = useState(null);
  const [wished, setWished] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const [error, setError] = useState(null);

  const navigate = useNavigate();



  // 찜 상태 및 개수 확인
  useEffect(() => {
    if (!userKey) return; // userKey가 설정된 후에 실행

    // 찜 상태 확인
    axios
      .get(`${API_URL}/api/wishes/status`, { params: { userKey, itemKey } })
      .then((response) => setWished(response.data))
      .catch((err) => console.error("Error checking wish status:", err));

    // 찜 개수 확인
    axios
      .get(`${API_URL}/api/wishes/count`, { params: { itemKey } })
      .then((response) => setWishCount(response.data))
      .catch((err) => console.error("Error fetching wish count:", err));
  }, [userKey, itemKey, API_URL]);

  // 찜 추가/제거
  const toggleWish = () => {
    const token = localStorage.getItem('token');
    

    if (!userKey) {
      alert("유저 정보를 확인하는 중입니다. 잠시만 기다려주세요.");
      return;
    }

    const endpoint = wished ? '/api/wishes/remove' : '/api/wishes/add';
    axios
      .post(
        `${API_URL}${endpoint}`,
        { itemKey, userKey },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setWished(!wished);
        setWishCount((prev) => (wished ? prev - 1 : prev + 1));
      })
      .catch((err) => {
        console.error("Error toggling wish:", err);
        setError("찜 상태를 변경하는 데 실패했습니다.");
      });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
    <div>
      <button className="wish-button" onClick={toggleWish}>
        {wished ? '찜 취소' : '찜 ❤️'}
      </button>
    </div>

    <div>
      <button className="like-button">
        좋아요
      </button>
    </div>
  </>
      
      
    
    
  );
}

export default WishButton;
