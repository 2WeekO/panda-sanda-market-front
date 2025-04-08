import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";

import "../CSS/SideNavigation.css";

import exchange_icon from "./image/nav/exchange_icon.svg";
import product_icon from "./image/nav/product_icon.svg";
import user_icon from "./image/nav/user_icon.svg";
import wallet_icon from "./image/nav/wallet_icon.svg";
import signup_icon from "./image/nav/signup_icon.svg";
import login_icon from "./image/nav/login_icon.svg";
import logout_icon from "./image/nav/logout_icon.svg";
import mystore_icon from "./image/nav/mystore_icon.svg";



const SideNavigation = () => {

  const API_URL = process.env.REACT_APP_API_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userKey, setUserKey] = useState();
  const navigate = useNavigate();

  // 로그인 상태 확인
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

  // 로그아웃
  const handleLogout = () => {
      localStorage.removeItem('token');  // 토큰 삭제
      setIsAuthenticated(false);  // 로그아웃 상태로 변경
      navigate("/");
  };

  // 유저키 가져오기
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


  return(
  <div>
  
    <div className="side-nav">
      {isAuthenticated ? (<></>):(<li className="sign"><a href="/signup"><img src={signup_icon} alt="회원가입" /></a>회원가입</li>)}
      {isAuthenticated ?  (<li className="sign"><a onClick={handleLogout}><img src={logout_icon} alt="로그아웃" /></a>로그아웃</li>) :
                          (<li className="sign"><a href="/login"><img src={login_icon} alt="로그인" /></a>로그인</li>)
        }

      <li><a href="/account"><img src={wallet_icon} alt="계좌" /></a>계좌</li>
      <li className="product_icon"><a href="/product"><img src={product_icon} alt="상품 등록" /></a>상품 등록</li>
      <li><a href="/purchase"><img src={exchange_icon} alt="" /></a>구매&판매</li>
      <li> <a href="/user"><img src={user_icon} alt="유저 정보" /></a>유저정보</li>
      {isAuthenticated && userKey !== null && userKey !== undefined &&
        (<li><Link to={`/mystore/${userKey}`}><img src={mystore_icon} alt="마이스토어" /></Link>마이스토어</li>)
      }
    </div>
  
    </div>)
}

export default SideNavigation;