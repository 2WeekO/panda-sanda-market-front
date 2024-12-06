import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// =========================== 구매 신청 기능 ================================

export const createPurchaseRequest = async (token, { buyerId ,productId, message }) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/purchase/create`,
      { buyerId ,productId, message }, // 요청 본문
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

export const fetchMyPurchaseRequests = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/purchase/my-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch purchase requests:', error);
    throw error;
  }
};


// =========================== 구매 신청 기능 ================================
