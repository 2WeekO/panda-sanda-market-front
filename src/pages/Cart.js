import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 확인

    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      navigate('/login');
      alert("로그인이 필요합니다.");
    }
  }, [navigate]);

  return(
    <div>장바구니 화면</div>
  );
};

export default CartPage;
