import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chatdot.css";

const Chatdot = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_idemail: "",
    user_name: "",
    user_phonenumber: "",
    user_nickname: "",
    user_code: "",
    user_profile: null,
  });

  const {
    user_idemail,
    user_name,
    user_phonenumber,
    user_nickname,
    user_code,
  } = user;

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const info = async () => {
    try {
      const response = await axios.get(
        `/user/${localStorage.user_idemail}`,
        config
      );
      setUser((prev) => ({ ...prev, ...response.data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    info();
  }, []);

  const navichat = () => {
    navigate("/chat");
  };

  const navihome = () => {
    navigate("/chat/home");
  };

  const naviset = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      navigate("/chat/set");
    }
  };

  const goToEditInfo = () => {
    navigate("/editinfo");
  };

  const navishop = () => {
    navigate("/shophome");
  };

  const handleWithdrawal = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      try {
        await axios.delete(
          `/user/delete/${localStorage.getItem("user_idemail")}`,
          config
        );
        localStorage.clear();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="chat">
      <div className="chat_body">
        <div className="chat_header_box">
          <div className="chatdot_header_tag">
            {localStorage.user_name}님의 정보
          </div>
        </div>
        <div>
          <div className="chatdot-form-container">
            <div className="form-group mb-1">
              <img
                src={
                  user.user_profile
                    ? `/profileimages/${user.user_profile}`
                    : "/basicicon/no-profile.png"
                }
                alt="프로필 사진"
                className="profile-image"
              />
            </div>
            <div className="chatdot-form-group">
              <div className="chatdot_label">이메일</div>
              <input
                type="email"
                className="chatdot_form-control"
                value={user_idemail}
                readOnly
              />
            </div>
            <div className="chatdot-form-group">
              <div className="chatdot_label">이름</div>
              <input
                type="text"
                className="chatdot_form-control"
                value={user_name}
                readOnly
              />
            </div>
            <div className="chatdot-form-group">
              <div className="chatdot_label">연락처</div>
              <input
                type="text"
                className="chatdot_form-control"
                value={user_phonenumber}
                readOnly
              />
            </div>
            <div className="chatdot-form-group">
              <div className="chatdot_label">닉네임</div>
              <input
                type="text"
                className="chatdot_form-control"
                value={user_nickname}
                readOnly
              />
            </div>
            <div className="chatdot-form-group">
              <div className="chatdot_label">친구추가 코드</div>
              <input
                type="text"
                className="chatdot_form-control"
                value={user_code}
                readOnly
              />
            </div>
            <div className="chatdot-btn-btn-box">
              <button className="chatdot-btn-btn" onClick={goToEditInfo}>
                회원정보 수정하기
              </button>

              <button
                type="button"
                className="chatdot-btn-removebtn"
                onClick={handleWithdrawal}
              >
                회원 탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="chat_menubar">
        <div className="chat_menubar_button_f" onClick={navihome}></div>
        <div className="chat_menubar_button_c" onClick={navichat}></div>

        <div className="chat_menubar_button_shop" onClick={navishop}></div>
        <div className="chat_menubar_button_d_c"></div>
        <div className="chat_menubar_button_s" onClick={naviset}></div>
      </div>
    </div>
  );
};

export default Chatdot;
