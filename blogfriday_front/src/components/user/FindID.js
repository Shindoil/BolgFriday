import React, { useState } from "react";
import axios from "axios";
import "./FindID.css";
import { useNavigate } from "react-router-dom";

const FindID = () => {
  const navigate = useNavigate();
  const [user_name, setName] = useState("");
  const [user_phonenumber, setPhoneNumber] = useState("");
  const [user_findhome, setFindHome] = useState("");
  const [user_findname, setFindName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 서버에 이름과 전화번호 전송
      const response = await axios.get("/user/findID", {
        params: {
          user_name: user_name,
          user_phonenumber: user_phonenumber,
          user_findhome: user_findhome,
          user_findname: user_findname,
        },
      });
      // // 성공적으로 아이디를 찾은 경우
      alert(`가입하신 아이디는 ${response.data}입니다.`);
      navigate("/");
    } catch (error) {
      // 서버에서 오류 발생 시
      setErrorMessage("사용자가 존재하지 않습니다.");
    }
  };

  return (
    <div className="find-id-container">
      <form onSubmit={handleSubmit} className="find-id-form">
        <h2 className="find-id-title">아이디 찾기</h2>
        <div className="find-id-form-group">
          <input
            type="text"
            className="find-id-input"
            placeholder="이름"
            value={user_name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="find-id-form-group">
          <input
            type="text"
            className="find-id-input"
            placeholder="전화번호"
            value={user_phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="find-id-form-group">
          <input
            type="text"
            className="find-id-input"
            placeholder="고향은?"
            value={user_findhome}
            onChange={(e) => setFindHome(e.target.value)}
            required
          />
        </div>
        <div className="find-id-form-group">
          <input
            type="text"
            className="find-id-input"
            placeholder="어릴적 별명은?"
            value={user_findname}
            onChange={(e) => setFindName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="find-id-btn">
          아이디 찾기
        </button>
        {errorMessage && <p className="find-id-error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default FindID;
