import axios from "axios"; // axios를 가져옴
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 가져오기

const TopNavigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userKey, setUserKey] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token'); // accessToken을 가져옴
        if (token) {
            setIsAuthenticated(true); // 로그인 상태로 설정
            fetchUserKey(token); // userKey를 가져오는 API 호출
        } else {
            setUserKey(null);
            setIsAuthenticated(false);
        }
    }, []);

    const fetchUserKey = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/api/user/key", {
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

    // 로그아웃 함수
    const handleLogout = () => {
        localStorage.removeItem('token');  // 토큰 삭제
        localStorage.removeItem('userKey'); // userKey 삭제
        setUserKey(null);  // userKey를 null로 설정
        setIsAuthenticated(false);  // 로그아웃 상태로 변경
        alert("로그아웃 되었습니다.");
        window.location.href = '/';
    };

    return (
        <div>
            <div className="top-nav">
                <a className="nav-text" href="/signup">회원가입</a>
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
                <a className="nav-text" href="/cart">장바구니</a>
            </div>

            <div className="middle-nav">
                <a className="nav-text-m nav-border" href="/category">카테고리</a>
                <a className="logo" href="/"><img src="icon/LOGO.png" alt=""/></a>
                <a className="nav-text-m nav-border" href="/product">판매하기</a>
            </div>

            <div className="search-box">
                <input className="search-input" type="text" placeholder="물품 검색" />
                <a href="/search"><img className='search-btn' src="icon/search.png" alt=""/></a>
            </div>
        </div>
    );
};

export default TopNavigation;
