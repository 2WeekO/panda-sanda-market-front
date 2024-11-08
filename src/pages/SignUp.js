import axios from "axios";
import React, { useState } from "react";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [agreeToTerms, setAgreeToTerms] = useState(false); // 개인정보 수집 동의 체크 추가

    const controllerSignUp = async () => {
        if (!email || !username || !nickname || !address || !phoneNumber || !password || !passwordCheck) {
            alert("모든 필수 입력란에 입력해주세요.");
            return;
        }

        if (!agreeToTerms) {
            alert("개인정보 수집 및 이용에 동의해주세요.");
            return;
        }

        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const data = {
            email,
            username,
            nickname,
            address,
            addressDetail,
            phoneNumber,
            password,
            passwordCheck,
        };

        setLoading(true); // 로딩 시작

        try {
            const res = await axios.post("https://pandasanda.shop/api/auth/signup", data, {
                headers: {
                    "Content-Type": "application/json", // JSON 데이터 형식
                    "Accept": "application/json", // 서버로부터 받을 데이터 형식
                },
            });
            console.log(res);
            alert("회원가입 성공!");
            window.location.href = "/";
            // 성공 시 입력 필드 초기화
            setEmail("");
            setUsername("");
            setNickname("");
            setAddress("");
            setAddressDetail("");
            setPhoneNumber("");
            setPassword("");
            setPasswordCheck("");
        } catch (err) {
            console.error(err.response);
            // 서버에서 반환하는 에러 메시지 출력
            alert(err.response?.data?.message || err );
            

        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <>
            <div className="sign-view">
                <div className="sign-layout">
                    <a className="logo" href="/"><img src="icon/LOGO.png"></img></a>
                    <div className="sign-title">회원가입</div>

                    <div className="input-box">
                        <div className="sign-text">이름</div>
                        <input
                            placeholder="이름을 입력해주세요."
                            className="sign-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <div className="sign-text">닉네임</div>
                        <input
                            placeholder="닉네임을 입력해주세요."
                            className="sign-input"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>

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
                        <div className="sign-text">주소</div>
                        <input
                            placeholder="주소를 입력해주세요. ex) -시 -구 -동"
                            className="sign-input"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <div className="sign-text">상세 주소</div>
                        <input
                            placeholder="상세 주소를 입력해주세요."
                            className="sign-input"
                            type="text"
                            value={addressDetail}
                            onChange={(e) => setAddressDetail(e.target.value)}
                        />
                    </div>

                    <div className="input-box">
                        <div className="sign-text">전화번호</div>
                        <input
                            placeholder="-없이 전화번호를 입력해주세요."
                            className="sign-input"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                        />
                    </div>

                    <div className="input-box">
                        <div className="sign-text">비밀번호 확인</div>
                        <input
                            placeholder="확인을 위해 비밀번호를 입력해주세요."
                            className="sign-input"
                            type="password"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                        />
                        개인정보 수집 및 이용 동의 *
                    </div>

                    <button className="submit-btn" type="button" onClick={controllerSignUp} disabled={loading}>
                        {loading ? "가입 중..." : "가입하기"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
