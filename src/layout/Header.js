import React, { useEffect, useState } from "react";


const Header = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 컴포넌트가 렌더링될 때 로그인 상태 확인
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setIsAuthenticated(true);  // 토큰이 있으면 로그인 상태로 설정
    } else {
        setIsAuthenticated(false);  // 토큰이 없으면 로그아웃 상태로 설정
    }
    }, []);

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('token');  // 토큰 삭제
        setIsAuthenticated(false);  // 로그아웃 상태로 변경
        window.location.href = '/login';
    };

  return (
    
    <div className="header-container">
      <div className="header-content">
        <div className='logo-width'>
          <a href="/" className="logo"><img src="icon/LOGO.png"></img></a>
        </div>
        
        <div className="nav">
          <div className='nav-center'>
            <a href="/category" className="nav-item">카테고리</a>
            <div className="search-box">
            <input className="search-input" type="text" placeholder="물품 검색" />
            <a href="/search"><img className='search-btn' src="icon/search.png" alt=""/></a>
            </div>
            <a href="/product" className="nav-item">판매하기</a>
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
          <a href="/mystore" className="nav-item">마이스토어</a>
          <a href="/cart" className="nav-item">장바구니</a>
          </div>
          
        </div>
      </div>
    </div>


  );
};

export default Header;
