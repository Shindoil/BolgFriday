import React, { useState } from "react";
import axios from "axios";
import "./Okuser.css";
import { useNavigate } from "react-router-dom";

const Okuser = () => {
  const navigate = useNavigate();
  const [user_idemail, setIdEmail] = useState("");
  const [user_name, setName] = useState("");
  const [user_phonenumber, setPhoneNumber] = useState("");
  const [user_findhome, setFindHome] = useState("");
  const [user_findname, setFindName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/okuer", {
        user_idemail: user_idemail,
        user_name: user_name,
        user_phonenumber: user_phonenumber,
        user_findhome: user_findhome,
        user_findname: user_findname,
      });
      // 인증 성공 시 비밀번호 변경 페이지로 이동
      alert("사용자 인증 성공");
      // 사용자 인증 성공 시 localStorage에 user_idemail 저장
      localStorage.setItem("user_idemail", user_idemail);

      // 사용자 인증 성공 시
      // window.location.href = `/findpass`;
      navigate("/findpass");
    } catch (error) {
      setErrorMessage("사용자 인증에 실패했습니다.");
    }
  };

  return (
    <div className="okuser-container">
      <h2 className="okuser-title">사용자 인증</h2>
      <form onSubmit={handleSubmit} className="okuser-form">
        <div className="okuser-form-group">
          <label htmlFor="user_idemail" className="okuser-label">
            이메일
          </label>
          <input
            type="email"
            className="okuser-input"
            id="user_idemail"
            value={user_idemail}
            onChange={(e) => setIdEmail(e.target.value)}
            required
          />
        </div>
        <div className="okuser-form-group">
          <label htmlFor="user_name" className="okuser-label">
            이름
          </label>
          <input
            type="text"
            className="okuser-input"
            id="user_name"
            value={user_name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="okuser-form-group">
          <label htmlFor="user_phonenumber" className="okuser-label">
            전화번호
          </label>
          <input
            type="text"
            className="okuser-input"
            id="user_phonenumber"
            value={user_phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="okuser-form-group">
          <label htmlFor="user_findhome" className="okuser-label">
            고향
          </label>
          <input
            type="text"
            className="okuser-input"
            id="user_findhome"
            value={user_findhome}
            onChange={(e) => setFindHome(e.target.value)}
            required
          />
        </div>
        <div className="okuser-form-group">
          <label htmlFor="user_findname" className="okuser-label">
            어릴적 별명
          </label>
          <input
            type="text"
            className="okuser-input"
            id="user_findname"
            value={user_findname}
            onChange={(e) => setFindName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="okuser-btn">
          인증
        </button>
      </form>
      {errorMessage && <p className="okuser-error">{errorMessage}</p>}
    </div>
  );
};

export default Okuser;
