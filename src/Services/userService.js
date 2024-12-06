import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getUserKey = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/key`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // userKey를 반환합니다.
  } catch (error) {
    console.error("Error fetching userKey:", error);
    throw new Error("유저 키를 가져오는 데 실패했습니다."); // 에러를 throw하여 호출하는 쪽에서 처리하게 합니다.
  }
};
