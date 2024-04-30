import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../toolkit/actions/chat_Action";
import axios from "axios";

function Chat() {
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userId, setUserId] = useState("CCC");

  // view 0,1 사용및 사용시 택한 유저 저장
  const [view, setView] = useState(0); // (0: 친구 목록, 1: 채팅)
  const [recipientId, setRecipientId] = useState(""); //id
  const [recipientProfile, setRecipientProfile] = useState(""); //프로필

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //sql timestamp형식과 호환이 잘안되어서 String으로 타입변환후 정해진 시간 형식에 맞게 재조정
  const timestamp = formatMySQLDateTime();
  function formatMySQLDateTime() {
    const now = new Date();
    return (
      now.getFullYear() +
      "-" +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + now.getDate()).slice(-2) +
      " " +
      ("0" + now.getHours()).slice(-2) +
      ":" +
      ("0" + now.getMinutes()).slice(-2) +
      ":" +
      ("0" + now.getSeconds()).slice(-2)
    );
  }

  const connect = () => {
    if (!webSocket || webSocket.readyState === WebSocket.CLOSED) {
      // const ws = new WebSocket(
      //   `ws://localhost:8090/ws/chat?userId=${localStorage.getItem(
      //     "user_code"
      //   )}`
      // );

      const ws = new WebSocket(
        `ws://112.169.231.62:8090/ws/chat?userId=${localStorage.getItem(
          "user_code"
        )}`
      );
      ws.onopen = () => console.log("Connected to the chat server");
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

        // if (message.recipient_id === userId && view !== 1) {
        //   setUnreadCounts((prevCounts) => ({
        //     ...prevCounts,
        //     [message.sender_id]: (prevCounts[message.sender_id] || 0) + 1,
        //   }));
        // }
      };
      ws.onerror = (event) => console.error("WebSocket error:", event);
      ws.onclose = (event) =>
        console.log("WebSocket connection closed:", event);
      setWebSocket(ws);
    } else {
      console.log("WebSocket is already connected or connecting.");
    }
  };

  const sendMessage = () => {
    if (
      webSocket &&
      inputMessage !== "" &&
      localStorage.getItem("user_code") !== "" &&
      recipientId !== ""
    ) {
      const messageData = {
        sender_id: localStorage.getItem("user_code"),
        message: inputMessage,
        recipient_id: recipientId,
        timestamp: timestamp,
      };
      webSocket.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setInputMessage("");
    }
  };

  const disconnect = () => {
    if (webSocket) {
      webSocket.close();
    }
  };

  const { friendList } = useSelector((state) => state.chat);

  const [userCode, setUserCode] = useState({
    user_code1: localStorage.getItem("user_code"),
    user_code2: "",
  });

  const navihome = () => {
    navigate("/chat/home");
  };

  const navidot = () => {
    navigate("/chat/dot");
  };

  const naviset = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      navigate("/chat/set");
    }
  };

  const navishop = () => {
    navigate("/shophome");
  };

  useEffect(() => {
    connect();
    dispatch(chatActions.getFriendList(userCode.user_code1));
  }, [userCode]);

  ///

  const [showOptions, setShowOptions] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = useState(null);
  // 메시지 클릭 시 동작할 핸들러
  const handleMsgClick = (msg, event) => {
    event.stopPropagation(); // 상위로 이벤트 간섭 방지
    const x = event.clientX;
    const y = event.clientY;

    setOptionsPosition({ x, y });
    setShowOptions(true);
    setSelectedMessage(msg);
  };

  const hiddenDivStyle = {
    position: "absolute",
    left: `${optionsPosition.x}px`,
    top: `${optionsPosition.y}px`,
    display: showOptions ? "block" : "none",
    // 추가 스타일 설정
  };

  // 숨겨진 div 밖을 클릭했을 때 숨겨진 div를 숨깁니다.
  useEffect(() => {
    const handleClickOutside = () => setShowOptions(false);
    if (showOptions) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [showOptions]);

  const nlpsearch = (text) => {
    dispatch(chatActions.getNLPsearch(text));
  };
  const nlpsearch1 = (text) => {
    dispatch(chatActions.getNLPsearch1(text));
  };

  //veiw가 1일때 채팅방에서 만나고있는 사람의 이름가져오기
  const [recipientName, setRecipientName] = useState("");

  const updateRecipientName = () => {
    const friend = friendList.find(
      (friend) => friend.user_code === recipientId
    );
    if (friend) {
      setRecipientName(friend.user_nickname);
    }
  };

  useEffect(() => {
    if (recipientId) {
      updateRecipientName();
    }
  }, [recipientId, friendList]);

  // 각 친구의 최근 메시지를 찾는 함수
  const findLastMessage = (user_code) => {
    const relevantMessages = messages.filter(
      (msg) =>
        (msg.sender_id === localStorage.getItem("user_code") &&
          msg.recipient_id === user_code) ||
        (msg.sender_id === user_code &&
          msg.recipient_id === localStorage.getItem("user_code"))
    );
    return relevantMessages[relevantMessages.length - 1]; // 가장 최근 메시지 반환
  };

  // 메세지 삭제
  const deleteMessage = (timestamp) => {
    if (selectedMessage) {
      axios.delete(`/api/chat/deletemessage/${timestamp}`);
      //재배치
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.timestamp !== timestamp)
      );
    }
  };

  // 최근 메세지 대로 정렬
  // 들어온 map을 메세지 시간을 기준으로 재배열후 body에서 참조

  const [sortedFriendList, setSortedFriendList] = useState([]);

  // 메세지 알람
  // const countUnreadMessages = (chatId) => {
  //   return messages.filter((msg) => msg.recipient_id === chatId && !msg.is_read).length;
  // };

  const [unreadCounts, setUnreadCounts] = useState({});
  const totalUnreadCount = Object.values(unreadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  useEffect(() => {
    if (friendList.length && messages.length) {
      const friendsWithLastMessage = friendList.map((friend) => {
        const lastMessage = findLastMessage(friend.user_code);
        return {
          ...friend,
          lastMessageTime: lastMessage
            ? new Date(lastMessage.timestamp).getTime()
            : 0,
        };
      });

      const sortedFriends = friendsWithLastMessage.sort(
        (a, b) => b.lastMessageTime - a.lastMessageTime
      );

      setSortedFriendList(sortedFriends); // 정렬된 목록을 상태로 저장
    }
  }, [messages, friendList]);

  const adminMessage = () => {
    if (
      webSocket &&
      webSocket.readyState === WebSocket.OPEN &&
      inputMessage.trim()
    ) {
      const messageData = {
        sender_id: localStorage.getItem("user_code"), // or a specific admin code
        message: inputMessage,
        recipient_id: "ALL", // 사용자가 'ALL'로 설정하여 서버 측에서 이를 인식하게 합니다.
        timestamp: new Date().toISOString(),
      };
      webSocket.send(JSON.stringify(messageData));
      setInputMessage(""); // 입력 필드 초기화
    }
  };

  // 대화방 나가면
  useEffect(() => {
    setInputMessage(""); // 대화내용초기화
  }, [view]);

  //채팅방 스크롤 감지및 초기화
  const lastMessageRef = useRef(null);
  useEffect(() => {
    console.log("Messages updated", messages);
    console.log("Ref current:", lastMessageRef.current);
    if (lastMessageRef.current) {
      console.log("Scrolling into view");
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <>
      {view === 0 && (
        <div className="chat">
          <div className="chat_body">
            <div className="chat_banner" onClick={navishop}></div>
            <div className="chat_header_box">
              <div className="chat_header_tag">채팅</div>
            </div>
            <div>
              <div className="chat_friendlist">
                {localStorage.getItem("user_code") === "A00000" ? (
                  <div className="chat_friendbox" onClick={() => setView(2)}>
                    <img
                      className="chat_profileimg"
                      src={"/basicicon/setwhite.png"}
                      alt="비어있음"
                    ></img>
                    <div className="chat_name">전체 공지방</div>
                  </div>
                ) : null}
                {sortedFriendList &&
                  sortedFriendList.map((chat) => {
                    const lastMessage = findLastMessage(chat.user_code); // 각 친구의 최근 메시지 검색
                    const unreadCount = unreadCounts[chat.user_code] || 0;
                    return (
                      <div
                        className="chat_friendbox"
                        key={chat.user_id}
                        onClick={() => {
                          if (
                            !webSocket ||
                            webSocket.readyState === WebSocket.CLOSED
                          ) {
                            connect(); // Reconnect if disconnected
                          }
                          setRecipientId(chat.user_code);
                          setRecipientProfile(chat.user_profile);
                          setView(1);
                          const messageDto = {
                            sender_id: localStorage.getItem("user_code"), // 현재 사용자 ID
                            recipient_id: chat.user_code, // 클릭한 친구의 ID
                          };
                          console.log("Sending messageDto:", messageDto);
                          axios.post("/api/chat/readmessages", messageDto);
                          setUnreadCounts((prev) => ({
                            ...prev,
                            [chat.user_code]: 0,
                          }));
                        }}
                      >
                        <img
                          className="chat_profileimg"
                          src={
                            chat.user_code === "A10000"
                              ? localStorage.getItem("user_profile") !== "null"
                                ? `/profileimages/${localStorage.getItem(
                                    "user_profile"
                                  )}`
                                : "/basicicon/no-profile.png"
                              : chat.user_profile
                              ? `/profileimages/${chat.user_profile}`
                              : "/basicicon/no-profile.png"
                          }
                          alt="비어있음"
                        ></img>
                        <div className="chat_frienbox_u">
                          <div className="chat_name_c">
                            {chat.user_code === "A10000"
                              ? localStorage.getItem("user_nickname")
                              : chat.user_nickname}
                          </div>
                          <div className="chat_last_message">
                            {lastMessage ? lastMessage.message : ""}
                          </div>
                        </div>
                        {unreadCount > 0 && (
                          <span className="unread_count">{unreadCount}</span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="chat_menubar">
            <div className="chat_menubar_button_f" onClick={navihome}></div>
            <div className="chat_menubar_button_c_c">
              {totalUnreadCount > 0 && (
                <span className="unread_count_bar">{totalUnreadCount}</span>
              )}
            </div>

            <div className="chat_menubar_button_shop" onClick={navishop}></div>
            <div className="chat_menubar_button_d" onClick={navidot}></div>
            <div className="chat_menubar_button_s" onClick={naviset}></div>
          </div>
        </div>
      )}

      {view === 1 && (
        <div className="chat_o">
          <div className="chat_header1">
            <div className="chat_view0_btn" onClick={() => setView(0)}></div>
            <div className="chat_view0_username">{recipientName}</div>
          </div>
          <div className="chat_talkbox">
            <ul>
              {messages
                .filter(
                  (msg) =>
                    (msg.sender_id === localStorage.getItem("user_code") &&
                      msg.recipient_id === recipientId) ||
                    (msg.sender_id === recipientId &&
                      msg.recipient_id === localStorage.getItem("user_code"))
                )
                .map((msg, index, array) => {
                  const previousMsg = array[index - 1];
                  const isFirstMessageOfSender =
                    !previousMsg || previousMsg.sender_id !== msg.sender_id;
                  const imageClass = isFirstMessageOfSender
                    ? "chat0_profileimg"
                    : "chat1_profileimg";

                  return (
                    <li
                      ref={index === array.length - 1 ? lastMessageRef : null}
                      key={index}
                      className="message_boxmi"
                    >
                      {msg.sender_id !== localStorage.getItem("user_code") && (
                        <img
                          className={imageClass}
                          src={
                            isFirstMessageOfSender
                              ? recipientProfile
                                ? `/profileimages/${recipientProfile}`
                                : "/basicicon/no-profile.png"
                              : "/basicicon/empty-profile.png"
                          }
                          alt="프로필 이미지"
                        />
                      )}
                      <div
                        className={`message ${
                          msg.sender_id === localStorage.getItem("user_code")
                            ? "my-message"
                            : "other-message"
                        }`}
                        onClick={(e) => {
                          // 'A00000' 또는 'A00002'인 경우 클릭 이벤트를 무시합니다.
                          if (
                            recipientId === "A00000" ||
                            recipientId === "A00002"
                          ) {
                            return;
                          }
                          handleMsgClick(msg, e);
                        }}
                      >
                        {msg.sender_id !== localStorage.getItem("user_code") &&
                          `${recipientName}: `}
                        {msg.message}
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div style={hiddenDivStyle} className="optionsDiv">
              {selectedMessage && (
                <div className="clickinstance">
                  <button
                    className="nlpsearch_button"
                    onClick={() => nlpsearch1(selectedMessage.message)}
                  >
                    blogfriday 검색: {selectedMessage.message}
                  </button>
                  <button
                    className="nlpsearch_button"
                    onClick={() => nlpsearch(selectedMessage.message)}
                  >
                    위메프 검색: {selectedMessage.message}
                  </button>

                  <button
                    className="nlpsearch_button"
                    onClick={() => deleteMessage(selectedMessage.timestamp)}
                  >
                    대화 삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="chat_message">
            <div className="chat_input_message_ipt_box">
              <textarea
                className="chat_input_message"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={recipientId === "A00000" || recipientId === "A00002"}
              />
            </div>
            <div className="chat_input_message_btn_box">
              <div
                className="chat_input_message_btn"
                onClick={sendMessage}
                disabled={
                  !inputMessage.trim() ||
                  !localStorage.getItem("user_code").trim() ||
                  !recipientId ||
                  recipientId === "A00000"
                }
              >
                전송
              </div>
            </div>
          </div>
        </div>
      )}
      {view === 2 && (
        <div>
          <div className="chat_o">
            <div className="chat_header1">
              <div className="chat_view0_btn" onClick={() => setView(0)}></div>
              <div className="chat_view0_username">전체공지방</div>
            </div>
            <div className="chat_talkbox">
              <ul></ul>
            </div>
          </div>
          <div className="chat_message">
            <div className="chat_input_message_ipt_box">
              <input
                className="chat_input_message"
                type="text"
                placeholder="Enter message to broadcast"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && adminMessage()}
              />
            </div>
            <div className="chat_input_message_btn_box">
              <div
                className="chat_input_message_btn"
                onClick={adminMessage}
                disabled={!inputMessage.trim()}
              >
                전송
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
