import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 계좌 정보 호출
export const fetchAccount = async (token) => {
    const response = await axios.get(`${API_URL}/api/accounts/get`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// 계좌 등록 호출
export const registerAccount = async (token, accountData) => {
    const response = await axios.post(`${API_URL}/api/accounts/register`, accountData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// 계좌 수정 호출
export const updateAccount = async (token, accountKey, accountData) => {
    const response = await axios.put(`${API_URL}/api/accounts/update/${accountKey}`, accountData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// 계좌 삭제 호출
export const deleteAccount = async (token, accountKey) => {
    const response = await axios.delete(`${API_URL}/api/accounts/delete/${accountKey}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
