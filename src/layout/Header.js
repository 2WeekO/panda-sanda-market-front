import axios from "axios"; // axios를 가져옴
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 가져오기
import Logo_Image from './image/LOGO.png';
import Search_Image from './image/search.png';

const Header = () => {

  const API_URL = process.env.REACT_APP_API_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userKey, setUserKey] = useState();

    // 컴포넌트가 렌더링될 때 로그인 상태 확인
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsAuthenticated(true);  // 토큰이 있으면 로그인 상태로 설정
        fetchUserKey(token); // userKey를 가져오는 API 호출
    } else {
        setUserKey(null);
        setIsAuthenticated(false);  // 토큰이 없으면 로그아웃 상태로 설정
    }
    }, []);

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('token');  // 토큰 삭제
        setIsAuthenticated(false);  // 로그아웃 상태로 변경
        window.location.href = '/login';
    };

    const fetchUserKey = async (token) => {
      try {
          const response = await axios.get(`${API_URL}/api/user/key`, {
              headers: {
                  Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
              },
          });
          console.log(response.data); // API 응답 확인
          setUserKey(response.data); // 가져온 userKey 설정
          localStorage.setItem('userKey', response.data); // localStorage에 저장
      } catch (error) {
          console.error("유저 키를 가져오는 데 실패했습니다:", error);
      }
    };

  return (
    
    <div className="header-container">
      <div className="header-content">
        <div className='logo-width'>
          <a href="/" className="logo"><img className="logo-img" src={Logo_Image}></img></a>
        </div>
        
        <div className="nav">
          <div className='nav-center'>
            <a href="/category" className="nav-item">카테고리</a>
            <div className="search-box">
            <input className="search-input" type="text" placeholder="물품 검색" />
            <a href="/search"><img className='search-btn' src={Search_Image} alt=""/></a>
            </div>
            <a href="/product" className="nav-item">판매하기</a>
          </div>
          
          </div>
          <div className='menu'>
          <a href="/signup" className="nav-item">회원가입</a>
          <div className="nav-text">
            {isAuthenticated ? (
            <button className="nav-text" onClick={handleLogout}>로그아웃</button>
            ) : (
            <a className="nav-text" href="/login">로그인</a>
            )}
            </div>
            {isAuthenticated && userKey !== null && userKey !== undefined && (
                <button className="nav-text mystore">
                    <Link className="nav-text mystore" to={`/mystore/${userKey}`}>마이스토어</Link>
                </button>
            )}

            {isAuthenticated && userKey !== null && userKey !== undefined && (
                <a className="nav-text" href="/purchase">구매관리</a>
            )}
          
          </div>
          
        
      </div>
    </div>


  );
};

export default Header;
