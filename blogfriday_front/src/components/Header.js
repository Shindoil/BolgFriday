import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../toolkit/actions/chat_Action";

const Header = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userState, setUserState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") === "true";
    const state = localStorage.getItem("user_state");
    setIsLoggedIn(isLogin);
    setUserState(state);
  }, []);

  const handlelogoClick = () => {
    navigate("/shophome");
  };

  const search = (product_name) => {
    navigate(`/search/${product_name}`);
  };

  const categorysearch = (category_name) => {
    navigate(`/searchcategory/${category_name}`);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    search(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleImgClick = () => {
    navigate("/seller/product/list");
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const naviChat = () => {
    navigate("/chat/home");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user_state");
    localStorage.removeItem("user_idemail");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_code");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    setUserState(null);
    navigate("/");
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  //메세지
  const [messages, setMessages] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [webSocket, setWebSocket] = useState(null);
  const [userCode, setUserCode] = useState({
    user_code1: localStorage.getItem("user_code"),
    user_code2: "",
  });
  const dispatch = useDispatch();
  const totalUnreadCount = Object.values(unreadCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  useEffect(() => {
    connect();

    dispatch(chatActions.getFriendList(userCode.user_code1));
    console.log("totalcount", totalUnreadCount);
  }, [userCode]);

  const connect = () => {
    let ws = new WebSocket(
      `ws://112.169.231.62:8090/ws/chat?userId=${localStorage.getItem(
        "user_code"
      )}`
    );

    ws.onopen = () => {
      console.log("Connected to the chat server");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);

      if (
        !message.is_read &&
        message.sender_id !== localStorage.getItem("user_code")
      ) {
        setUnreadCounts((prevCounts) => ({
          ...prevCounts,
          [message.sender_id]: (prevCounts[message.sender_id] || 0) + 1,
        }));
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed. Attempting to reconnect...");
      setTimeout(connect, 1000); // 1초 후 재연결 시도
    };

    setWebSocket(ws);
  };

  return (
    <div className="header">
      <div className="header_log_box">
        <div className="logo" onClick={handlelogoClick} />
        <div className="logo_text">blogfirday</div>
        <div className="gotoapp">앱으로 이동</div>
      </div>

      <div className="topmid">
        <div className="logo_name">BFDAY</div>

        <div className="search_input_box">
          <div className="search-button"></div>
          <input
            className="seach-input"
            type="text"
            onChange={handleInputChange}
            placeholder="물품을 검색하세요"
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="gotochat" onClick={naviChat}>
          {totalUnreadCount > 0 && (
            <span className="unread_count_bar_s">{totalUnreadCount}</span>
          )}
        </div>
      </div>
      {/* <div className="header-box">
        {isLoggedIn ? (
          <>
            
            <div className="productsave" onClick={handleLogoutClick}>
              로그아웃
            </div>
            <div className="productsave" onClick={handleMyPageClick}>
              My
            </div>
            <div className="productsave" onClick={handleMyPageClick}>
              장바구니
            </div>
            {userState === "2" && (
              <div className="productsave" onClick={handleImgClick}>
                판매관리
              </div>
            )}
          </>
        ) : (
          <button className="productsave" onClick={handleLoginClick}>
            로그인
          </button>
        )}
        <div className="blank3"></div>
      </div>
      <a href="/shophome">
        <div className="logo" onClick={handlelogoClick} />
      </a>
      <div className="blank1"></div>
      <div className="topmid">
        <input
          type="text"
          className="search-input"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <div className="search-button" onClick={handleSearchClick}></div>
      </div> */}
      {/* <div className="header_categorybar">
        <div className="header_categoryfront">카테고리 검색바</div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("패션")}
        >
          패션
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("식품")}
        >
          식품
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("가전제품")}
        >
          가전제품
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("가구")}
        >
          가구
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("악세서리")}
        >
          악세서리
        </div>
        <div
          className="header_categorybox"
          onClick={() => categorysearch("기타")}
        >
          기타
        </div>
        <div className="header_categorybox" onClick={naviChat}>
          Chat
        </div>
      </div> */}
    </div>
  );
};

export default Header;
