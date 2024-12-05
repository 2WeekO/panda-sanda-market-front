import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// =========================== 구매 신청 기능 ================================

export const createPurchaseRequest = async (token, data) => {
  return axios.post(`${API_URL}/api/purchase/request`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
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
