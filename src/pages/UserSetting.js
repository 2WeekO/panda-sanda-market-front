import React, { useEffect, useState } from "react";
import { changeUserNickname, checkNicknameDuplicate, deleteUser, getUserInfo } from "../Services/userService";


const UserSettingPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newNickname, setNewNickname] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async (token) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("토큰이 없습니다");
          return;
        }
        const data = await getUserInfo(token);
        setUserInfo(data);
      } catch (error) {
        console.error("유저 정보 가져오기 실패", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleNicknameChange = async () => {
    const token = localStorage.getItem("token");
    if (!token || !newNickname.trim()) return;

    if (isNicknameAvailable === false) {
      alert("이미 사용 중인 닉네임입니다.");
      return;
    }

    try {
      const result = await changeUserNickname(token, newNickname);
      setUserInfo(result);
      setNewNickname("");
      setIsNicknameAvailable(null);
      alert("닉네임이 변경되었습니다.");
    } catch (err) {
      console.log(`닉네임 변경 오류: ${err}`)
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  const handleNicknameCheck = async () => {
    if (!newNickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      const isDuplicate = await checkNicknameDuplicate(newNickname);
      setIsNicknameAvailable(!isDuplicate);

      if (isDuplicate) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("사용 가능한 닉네임입니다.");
      }
      } catch (err) {
        console.log(`중복 확인 오류: ${err}`)
        alert("중복 확인 중 오류 발생");
      }
  };

  const handleDeleteUser = async (token) => {
  if (window.confirm("정말 회원을 탈퇴하시겠습니까?")) {
    try {
      await deleteUser(token);
      alert("앞으로 더욱 발전하는 '판다산다'가 되겠습니다! 언제든지 방문 해주세요♥️ 저희 중고거래 플랫폼을 이용해주셔서 진심으로 감사드립니다.");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.log(`회원 탈퇴 오류: ${err}`);
      alert("회원 탈퇴 오류");
    }
  }
  };

  const handleLogout = () =>{
    try {
      localStorage.removeItem("token");
      window.location.href = "/"
      alert("로그아웃 되었습니다.")

    } catch(err) {
      console.log(`로그아웃 오류: ${err}`)
      alert("로그아웃 오류")
    }

  }

  const handleLogin = () => {
    try{
      window.location.href="/login"

    }catch(err){
      console.log(`로그인 오류: ${err}`)
      alert("로그인 오류")
    }

  }

  const handleSignin = () => {
    try{
      window.location.href="/signup"

    }catch(err){
      console.log(`회원가입 오류: ${err}`)
      alert("회원가입 오류")
    }

  }


  return (
    
    <div className="user-setting">
      
      {userInfo ? (
        
          
          <div>
            <h2>마이페이지</h2>
          <p><strong>이름:</strong> {userInfo.username}</p>
          <p>
            <strong>닉네임:</strong> {userInfo.nickname}
            <br></br>
            <input
              type="text"
              value={newNickname}
              placeholder="새 닉네임 입력"
              onChange={(e) => {
                setNewNickname(e.target.value);
                setIsNicknameAvailable(null); // 입력 변경 시 초기화
              }}
            />
            <button onClick={handleNicknameCheck}>중복 확인</button>
            {isNicknameAvailable === true && <span style={{ color: "green" }}>사용 가능</span>}
            {isNicknameAvailable === false && <span style={{ color: "red" }}>중복됨</span>}
            
          </p>
          <button onClick={handleNicknameChange} disabled={isNicknameAvailable !== true}>닉네임 변경</button>
          <p><strong>이메일:</strong> {userInfo.email}</p>
          <p><strong>주소:</strong> {userInfo.address} {userInfo.addressDetail}</p>{/*<button>주소 변경</button> */}
          

          
          {/* <button onClick={handleDeleteUser}>회원 탈퇴하기</button> */}
          <button onClick={handleLogout}>로그아웃</button>
          
          
          
        </div>
        
      ) : (

        
        <div>
          
          <p>원활한 서비스 이용을 하기 위해서는 로그인이 필요합니다.</p>
          <button onClick={handleSignin}>회원가입</button>
          <button onClick={handleLogin}>로그인</button>
          
        </div>

        
      )}
    </div>
  );
};

export default UserSettingPage;
