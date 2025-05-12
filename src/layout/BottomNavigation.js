import React ,{ useEffect, useState }  from "react";
import "../CSS/BottomNavigationStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";

import exchange_icon from "./image/nav/exchange_icon.svg";
import home_icon from "./image/nav/home_icon.svg";
import product_icon from "./image/nav/product_icon.svg";
import user_icon from "./image/nav/user_icon.svg";
import wallet_icon from "./image/nav/wallet_icon.svg";
import mystore_icon from "./image/nav/mystore_icon.svg";

const BottomNavigation = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userKey, setUserKey] = useState();

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
  
  

  return(
  <div>

  <div className="bottom-nav">
    <li><a href="/"><img src={home_icon} alt=""/></a></li>
    <li><a href="/account"><img src={wallet_icon} alt="" /></a></li>
    <li><a href="/product"><img src={product_icon} alt="" /></a></li>
    <li><a href="/purchase"><img src={exchange_icon} alt="" /></a></li>
    {isAuthenticated && userKey !== null && userKey !== undefined &&
            (<li><a><Link to={`/mystore/${userKey}`}><img src={mystore_icon} alt="마이스토어" /></Link></a></li>)
          }
    <li> <a href="/user"><img src={user_icon} alt="" /></a></li>
  </div>

  </div>
  )

}




export default BottomNavigation;