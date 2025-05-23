import axios from "axios";
import React, { useState } from "react";
import Logo_Image from './image/LOGO.svg';


const LoginPage = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const controllerSignIn = async () => {
        

        if (!email || !password) {
            alert("이메일 또는 비밀번호가 비어 있습니다.");
            return;
        }

        const logindata = { email, password };

        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, logindata);
            const token = res.data.accessToken; // accessToken 호출
            const userKey = res.data.userKey; // userKey 호출 (응답에 포함되어 있어야 함)

            localStorage.setItem('token', token); // 토큰 저장
            localStorage.setItem('userKey', userKey); // userKey 저장
            setIsAuthenticated(true);

            console.log(res);

            alert("로그인이 확인되었습니다.");

            window.location.href = "/"; // 로그인 후 리다이렉트
        } catch (err) {
            console.error(err);
            alert("이메일과 비밀번호를 다시 한번 확인해주세요.");
        }
    };

    return (
        <div className="all-center">
            <div className="sign-view">
                <div className="sign-layout">
                    <a className="logo" href="/"><img src={Logo_Image} alt="Logo" /></a>
                    <div className="sign-title">로그인</div>

                    <div className="input-box">
                        <div className="sign-text">이메일</div>
                        <input
                            placeholder="이메일을 입력해주세요."
                            className="sign-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <div className="sign-text">비밀번호</div>
                        <input
                            placeholder="비밀번호를 입력해주세요."
                            className="sign-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {if (e.key === "Enter") {controllerSignIn();}}}
                        />
                    </div>

                    <div>* 회원가입을 하지 않으셨나요? <a href="/signup">회원가입</a></div>

                    <button className="submit-btn" type="submit" onClick={controllerSignIn}>
                        로그인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
