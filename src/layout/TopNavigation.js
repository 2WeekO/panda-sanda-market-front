import axios from "axios"; // axios를 가져옴
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Link 컴포넌트 가져오기
import Logo_Image from './image/LOGO.png';
import Search_Image from './image/search.png';

const TopNavigation = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userKey, setUserKey] = useState();
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태

    const handleSearch = () => {
        console.log("검색어:", searchKeyword); // 검색어 확인용 로그
        if (searchKeyword.trim()) {
        navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
        }
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token'); // accessToken을 가져옴
        if (token) {
            setIsAuthenticated(true); // 로그인 상태로 설정
            fetchUserKey(token); // userKey를 가져오는 API 호출
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userKey');
            setUserKey(null);
            setIsAuthenticated(false);
        }
    }, []);

    const fetchUserKey = async (token) => {
        try {
            const response = await axios.get(`${API_URL}/api/user/key`, {
                headers: {
                    Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
                },
            });
            
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

            <div className="address-register">
                중고 거래를 하시기 전, 먼저 자신의 계좌를 등록하세요.
                <a className="account-button" href="/account">계좌 등록하기</a>
            </div>

            <div className="top-nav">
                
                {isAuthenticated ? (<></>):(<a href="/signup" className="nav-item">회원가입</a>)}
                
                <div className="nav-text">
                    {isAuthenticated ? (
                        <button className="nav-text nav-item" onClick={handleLogout}>로그아웃</button>
                    ) : (
                        <a className="nav-item" href="/login">로그인</a>
                    )}
                </div>
                {isAuthenticated && userKey !== null && userKey !== undefined && (
                <button className="nav-text mystore">
                    <Link className="nav-text nav-item" to={`/mystore/${userKey}`}>마이스토어</Link>
                </button>
                )}

                {isAuthenticated && userKey !== null && userKey !== undefined && (
                <a className="nav-item" href="/purchase">구매관리</a>
                )}
                
            </div>

            <div className="middle-nav">

                <a className="logo" href="/"><img src={Logo_Image} alt=""/></a>
            </div>
            
            <div className="search-box">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="물품 검색"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => {if (e.key === "Enter") {handleSearch();}}}
                        />

                        <a onClick={handleSearch}>
                            <img className="search-btn" src={Search_Image} alt="검색"/>
                        </a>
            </div>
            
            

        </div>
    );
};

export default TopNavigation;
