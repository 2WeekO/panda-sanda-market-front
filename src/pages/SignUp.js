import axios from "axios";
import React, { useState } from "react";
import Logo_Image from './image/LOGO.svg';

const SignUpPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    
    const steps = [
        { key: "username", label: "이름", placeholder: "이름을 입력해주세요.", type: "text" },
        { key: "nickname", label: "닉네임", placeholder: "닉네임을 입력해주세요.", type: "text" },
        { key: "email", label: "이메일", placeholder: "이메일을 입력해주세요.", type: "email" },
        { key: "address", label: "주소", placeholder: "주소를 입력해주세요. ex) -시 -구 -동", type: "text" },
        { key: "addressDetail", label: "상세 주소", placeholder: "상세 주소를 입력해주세요.", type: "text" },
        { key: "phoneNumber", label: "전화번호", placeholder: "-없이 전화번호를 입력해주세요.", type: "text" },
        { key: "password", label: "비밀번호", placeholder: "비밀번호를 입력해주세요.", type: "password" },
        { key: "passwordCheck", label: "비밀번호 확인", placeholder: "확인을 위해 비밀번호를 입력해주세요.", type: "password" }
    ];

    const [formData, setFormData] = useState({
        username: "",
        nickname: "",
        email: "",
        address: "",
        addressDetail: "",
        phoneNumber: "",
        password: "",
        passwordCheck: ""
    });

    const [currentStep, setCurrentStep] = useState(0);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleNext = () => {
        if (!formData[steps[currentStep].key]) {
            alert("입력값을 확인해주세요.");
            return;
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleNext();
        }
    };

    const controllerSignUp = async () => {
        const { password, passwordCheck, ...rest } = formData;

        const isEmptyField = Object.values(formData).some(value => value.trim() === "");
        if (isEmptyField) {
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

        try {
            const res = await axios.post(`${API_URL}/api/auth/signup`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            alert("회원가입 성공!");
            window.location.href = "/";
        } catch (err) {
            alert(err.response?.data?.message || err);
        }
    };

    return (
        <div className="sign-view">
            <div className="sign-layout">
                <a className="logo" href="/"><img src={Logo_Image} alt="logo" /></a>
                <div className="sign-title">회원가입</div>

                {steps.slice(0, currentStep + 1).map((step, index) => (
                    <div className="input-box" key={step.key}>
                        <div className="sign-text">{step.label}</div>
                        <input
                            className="sign-input"
                            type={step.type}
                            placeholder={step.placeholder}
                            value={formData[step.key]}
                            onChange={(e) =>
                                setFormData({ ...formData, [step.key]: e.target.value })
                            }
                            onKeyDown={index === currentStep ? handleKeyDown : undefined}
                            autoFocus={index === currentStep}
                        />
                        {index === currentStep && currentStep < steps.length - 1 && (
                            <button className="next-btn" onClick={handleNext}>다음</button>
                        )}
                    </div>
                ))}

                {currentStep === steps.length - 1 && (
                    <>
                        <div className="input-box">
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={() => setAgreeToTerms(!agreeToTerms)}
                            />
                            개인정보 수집 및 이용 동의 *
                        </div>
                        <button className="submit-btn" type="button" onClick={controllerSignUp}>
                            가입하기
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SignUpPage;
