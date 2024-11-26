import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import AccountRegistrationModal from ".//Component/AccountRegistrationModal";


const AccountPage = () => {
  const navigate = useNavigate(); // useNavigate로 페이지 이동

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const token = localStorage.getItem('token');
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

  return (
    <div>
      <h1>판매자 계좌 관리</h1>
      <button onClick={openModal}>계좌 등록</button>
      <AccountRegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AccountPage;
