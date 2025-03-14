import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// =========================== 구매 신청 기능 ================================

export const createPurchaseRequest = async (token, { buyerId ,sellerId,productId, message }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/purchase/create`,
      { buyerId ,sellerId ,productId, message }, // 요청 본문
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰 인증 헤더
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during purchase request creation:", error);
    throw error;
  }
};


// =========================== 구매 신청 관리 기능 ================================


// 승인
export const approveRequest = async (requestId) => {
  const response = await axios.put(`${API_URL}/api/purchase/approve/${requestId}`);
  return response.data;
};

// 승인 확인
export const approveCheckRequest = async (requestId) => {
  const response = await axios.put(`${API_URL}/api/purchase/approve/check/${requestId}`);
  return response.data;
};

// 거절
export const rejectRequest = async (requestId) => {
  const response = await axios.put(`${API_URL}/api/purchase/reject/${requestId}`);
  return response.data;
};

// 거절 확인 (삭제)
export const rejectCheckRequest = async (requestId) => {
  const response = await axios.delete(`${API_URL}/api/purchase/reject/check/${requestId}`);
  return response.data;
};

// 결제 요청
export const paymentRequest = async (requestId) => {
  const response = await axios.put(`${API_URL}/api/purchase/payment/request/${requestId}`);
  return response.data;
};

// 결제 요청 수락
export const paymentCheckRequest = async (requestId) => {
  const response = await axios.put(`${API_URL}/api/purchase/payment/request/check/${requestId}`);
  return response.data;
};

// 결제 완료 요청
export const paymentCompleteRequest = async (requestId) => {
  const response = await axios.put(`${API_URL}/api/purchase/payment/complete/${requestId}`);
  return response.data;
};

// 결제 완료 확인 요청 (상품 판매 완료)
export const paymentCompleteCheck = async (requestId) => {
  const response = await axios.put(`${API_URL}/api/purchase/payment/complete/check/${requestId}`);
  return response.data;
};

// --------------------- GET METHOD ---------------------

// 모든 구매 신청 목록 조회
export const fetchMyPurchaseRequests = async (token) => {
  const response = await axios.get(`${API_URL}/api/purchase/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 계좌 확인
export const getAccountInfo = async (sellerId) => {
  const response = await axios.get(`${API_URL}/api/purchase/account/check/${sellerId}`);
  return response.data;
};

// 구매 요청 목록 조회
export const fetchRequestsByBuyer = async (buyerId, token) => {
  const response = await axios.get(`${API_URL}/api/purchase/buyer/${buyerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 판매 -> 구매 요청 목록 조회
export const fetchRequestsBySeller = async (sellerId, token) => {
  const response = await axios.get(`${API_URL}/api/purchase/seller/${sellerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};



