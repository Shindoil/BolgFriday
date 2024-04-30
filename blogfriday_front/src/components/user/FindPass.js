import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FindPass.css"; // FindPass 컴포넌트의 CSS 파일
import { useNavigate } from "react-router-dom";

const FindPass = () => {
  const navigate = useNavigate();
  const [user_idemail, setIdEmail] = useState("");
  const [user_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // localStorage에서 user_idemail 값을 가져와 상태로 설정
    const storedUserIdEmail = localStorage.getItem("user_idemail");
    if (storedUserIdEmail) {
      setIdEmail(storedUserIdEmail);
    } else {
      alert("사용자 인증 후 진행해주세요.");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user_password !== confirmPassword) {
        setErrorMessage("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
        return;
      }

      const formData = new FormData();
      formData.append("user_idemail", user_idemail);
      formData.append("user_password", user_password);

      const response = await axios.put("/user/FindPass", formData);

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        // 비밀번호 변경 성공 시 로그인 페이지로 이동
        window.location.href = "/";
        localStorage.clear();
      } else {
        throw new Error("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      setErrorMessage("비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <div className="find-pass-container">
      <h2>비밀번호 변경</h2>
      <form onSubmit={handleSubmit} className="find-pass-form">
        <div className="input-group">
          <label htmlFor="user_idemail">이메일</label>
          <input
            type="email"
            id="user_idemail"
            value={user_idemail}
            onChange={(e) => setIdEmail(e.target.value)}
            required
            readOnly // 이메일은 읽기 전용으로 설정
          />
        </div>
        <div className="input-group">
          <label htmlFor="user_password">새 비밀번호</label>
          <input
            type="password"
            id="user_password"
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">비밀번호 변경</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FindPass;
