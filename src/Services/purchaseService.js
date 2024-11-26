import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createPurchaseRequest = async (token, data) => {
  return axios.post(`${API_URL}/api/purchase/request`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const decidePurchaseRequest = async (token, requestId, decision) => {
  return axios.put(
    `${API_URL}/api/purchase/${requestId}/decision`,
    null,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { decision },
    }
  );
};

export const getSellerAccount = async (token, requestId) => {
  return axios.get(`${API_URL}/api/purchase/${requestId}/account`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
