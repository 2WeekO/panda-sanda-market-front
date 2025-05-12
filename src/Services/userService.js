import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;

// 유저키 가져오기
export const getUserKey = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/key`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // userKey 반환
  } catch (error) {
    console.error(" getUserKey 실패:", error);
    throw new Error("유저 키를 가져오는 데 실패했습니다."); // 에러를 throw하여 호출하는 쪽에서 처리하게 합니다.
  }
};

// 유저 정보 가져오기
export const getUserInfo = async(token) =>{
  try {const response = await axios.get(`${API_URL}/api/user/me`, {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
  }catch (error) {
    console.error("ERROR: getUserInfo()에서 에러 발생 ",error);
    throw new Error("유저 정보 가져오기 실패");
  }
};


// 유저 닉네임 변경
export const changeUserNickname = async(token, newNickname) => {
  try {const response = await axios.post(`${API_URL}/api/user/change-nickname`,
    {nickname: newNickname},
    {
    headers: {Authorization: `Bearer ${token}`}
  });
  return response.data;
  }catch (error) {
    console.error("ERROR: changeUserNickname()에서 에러 발생 ",error);
    throw new Error("유저 닉네임 변경 실패");
  }
};

// 닉네임 중복 확인
export const checkNicknameDuplicate = async(newNickname) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/check-nickname`, {
      params: { nickname: newNickname }
    });
    return response.data; // true 또는 false
  } catch (error) {
    console.error("닉네임 중복 확인 에러", error);
    throw new Error("닉네임 중복 확인 실패");
  }
};

// 유저 비밀번호 변경
export const changePassword = async() => {
  try {
    const response = await axios.post(`${API_URL}/api/user/change-password`, {
      params: {},

    });
    return response.data;
  } catch (error) {
    console.error("비밀번호 변경 에러", error);
    throw new Error("비밀번호 번경 실패");
  }
};

// 유저 회원 탈퇴하기
export const deleteUser = async (token) => {
  try {
    const response = await axios.delete(`${API_URL}/api/user/delete`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("회원 탈퇴 에러", error);
    throw new Error("회원 탈퇴 실패");
  }
};


/*

export const 변수이름 = async() => {
  try {
    const response = await axios.get(`${API_URL}/api/`, {
      params: {}
    });
    return response.data; 
  } catch (error) {
    console.error("", error);
    throw new Error("");
  }
};

*/



// -------------------회원가입-------------------------

// 닉네임 중복 확인

// 이메일 인증

// 주소 입력 API

// 문자 인증 전화번호

