import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Loginshop = () => {
  const [inputs, setInputs] = useState({
    user_idemail: "",
    user_password: "",
  });

  const { user_idemail, user_password } = inputs;

  const handleValueChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/user/login", inputs);
      // ... (로그인 성공 처리 코드)
    } catch (error) {
      // 오류 처리 코드
      console.error("Login Error:", error); // 디버깅을 위해 오류 로그 출력
      if (error.response && error.response.status === 401) {
        // 잘못된 사용자 인증 오류 (401) 처리
        alert("비밀번호가 일치하지 않습니다."); // 사용자 친화적 오류 메시지 표시
      } else {
        // 기타 오류 처리 (선택 사항)
        alert("로그인 실패 \n비밀번호가 일치하지 않습니다."); // 일반적인 오류 메시지 표시
      }
    }

    await axios
      .post("/user/login", inputs)
      .then((response) => {
        let accessToken = response.data.accessToken;
        let refreshToken = response.data.refreshToken;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        localStorage.setItem("Authorization", accessToken);
        localStorage.setItem("Authorization-refresh", refreshToken);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("user_code", response.data.user_code);
        localStorage.setItem("user_idemail", response.data.user_idemail);
        localStorage.setItem("user_name", response.data.user_name);
        localStorage.setItem("user_state", response.data.user_state);
        localStorage.setItem("user_profile", response.data.user_profile);
        localStorage.setItem("user_nickname", response.data.user_nickname);

        setInputs({ user_idemail: "", user_password: "" });
        window.location.replace("/shophome");
        alert(localStorage.getItem("user_name") + "님 안녕하세요.");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container text-center mt-5">
      <div className="mx-5">
        <h1>LOGIN</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group mt-1">
            <input
              type="email"
              name="user_idemail"
              className="form-control"
              id="user_idemail"
              value={user_idemail}
              placeholder="E-mail"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mt-1">
            <input
              type="password"
              className="form-control"
              name="user_password"
              id="user_password"
              value={user_password}
              placeholder="Password"
              onChange={handleValueChange}
            />
          </div>
          <div className="mt-1">
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
            <Link className="btn btn-primary" to="/joinadd">
              회원 가입
            </Link>
            <Link className="btn btn-primary" to="/findid">
              아이디찾기
            </Link>
            <Link className="btn btn-primary" to="/okuser">
              비밀번호 찾기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginshop;
