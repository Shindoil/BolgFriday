import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setUserState(null);
    navigate("/logout");
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const state = localStorage.getItem("user_state");
    setIsLoggedIn(isLogin);
    setUserState(state);
  }, []);

  const handleMyPageClick = () => {
    if (localStorage.getItem("isLogin") === "true") {
      navigate("/mypage");
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  const navihome = () => {
    navigate("/shophome");
  };

  const handlecartClick = () => {
    navigate("/cart");
  };

  const handleLoginClick = () => {
    navigate("/loginshop");
  };
  return (
    <div className="footer">
      <div className="footer_menu">
        {isLoggedIn ? (
          <>
            <button className="footer_menu_btn" onClick={navihome}>
              홈
            </button>
            <button className="footer_menu_btn" onClick={handleLogoutClick}>
              {localStorage.getItem("user_name")}님 로그아웃
            </button>
            <button className="footer_menu_btn" onClick={handleMyPageClick}>
              My
            </button>

            <button className="footer_menu_btn" onClick={handlecartClick}>
              장바구니
            </button>
          </>
        ) : (
          <>
            <button className="footer_menu_btn" onClick={navihome}>
              홈
            </button>
            <button className="footer_menu_btn" onClick={handleLoginClick}>
              로그인
            </button>
            <button className="footer_menu_btn" onClick={handleMyPageClick}>
              My
            </button>

            <button className="footer_menu_btn" onClick={handlecartClick}>
              장바구니
            </button>
          </>
        )}
      </div>
      {/* <div className="footer_box">
        <div className="footer_box1">
          <div>상호명: blog friday</div>
          <div>대표이사: 김규연, 김은주, 신도일, 권순형</div>
          <div>주소: 서울시 서초구 사평대로 52길 9-2</div>
          <div>사업자 등록번호: 520-95-82882</div>
        </div>
        <div className="footer_box2">
          <div>blog friday 고객샌터</div>
          <div>02-123-4567</div>
          <div>월요일-금요일</div>
          <div>오전 9:00-오후 6:00</div>
        </div>
        <div className="footer_box3">
          <div>blog friday 소셜 미디어</div>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
