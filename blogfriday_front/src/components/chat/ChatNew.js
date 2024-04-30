import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../toolkit/actions/chat_Action";
import "./Chat.css";

function Chatnew() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUserId2, setCurrentUserId2] = useState(null);
  /// 채팅리스트

  const currentUserID = 1;
  const [chatFriend, setChatFriend] = useState({
    chatroom_id: "",
    user_id1: 1,
    user_id2: "",
    chatroom_name: "",
  });

  const navichatHome = () => {
    navigate("/chat/home");
  };

  const { friendList = [] } = useSelector((state) => state.chat);

  /// 웹소켓
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();
  const [chatRoom, setChatRoom] = useState(location.state?.user_id);
  // WebSocket 연결 설정

  //연결
  const connectWebSocket = () => {
    console.log("여긴가");
    if (webSocket) {
      webSocket.close();
    }
    if (isConnected) return;

    console.log(chatRoom);

    const ws = new WebSocket("ws://localhost:8090/ws/chat");

    ws.onopen = () => {
      console.log("WebSocket 서버에 연결됨");
      setIsConnected(true);
      const enterMessage = {
        messageType: "ENTER",
        chatRoomId: chatRoom,
        senderId: 1,
        message: "",
      };
      ws.send(JSON.stringify(enterMessage));
      console.log("입장", enterMessage);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = (e) => {
      console.log(e.code);
      console.log("WebSocket 서버에서 연결 끊김");
      setIsConnected(false);
    };

    setWebSocket(ws);
  };

  const sendMessage = () => {
    if (webSocket) {
      const message = {
        messageType: "TALK",
        chatRoomId: chatRoom, // 채팅방에 따라 동적으로 설정해야 함
        senderId: 1, // 사용자의 ID여야 함
        message: inputMessage,
      };
      console.log(message);
      webSocket.send(JSON.stringify(message));
      setInputMessage("");
    }
  };

  const changeFriendName = (chatRoomId, userId2) => {
    setChatRoom(chatRoomId);
    setCurrentUserId2(userId2);
    closeWebSocket(); // 기존 WebSocket 연결 종료
    // connectWebSocket();
  };

  const closeWebSocket = () => {
    //sendLeaveMessage();
    if (webSocket) {
      webSocket.close(); // WebSocket 연결 종료
      setWebSocket(null); // 참조 제거
    }
  };

  const sendLeaveMessage = () => {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const leaveMessage = {
        messageType: "LEAVE",
        chatRoomId: chatRoom,
        senderId: currentUserID, // 현재 사용자 ID, 적절하게 설정해야 함
        message: "",
      };
      webSocket.send(JSON.stringify(leaveMessage));
      console.log("퇴장", leaveMessage);
    }
  };

  const retryConnection = () => {
    closeWebSocket(); // 기존 연결 닫기
    connectWebSocket(); // 새 연결 시작
  };

  const backtolist = () => {
    closeWebSocket();
  };

  const goProcess = (event) => {};

  useEffect(() => {
    // 현재 채팅방에 해당하는 user_id2를 찾아 상태에 저장합니다.
    const currentChat = friendList.find(
      (chat) => chat.chatroom_id === chatRoom
    );
    if (currentChat) {
      setCurrentUserId2(currentChat.user_id2);
    }
  }, [chatRoom, friendList]); // chatRoom 또는 friendList가 변경될 때마다 실행됩니다.

  //
  const [showOptions, setShowOptions] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });

  // 메시지 클릭 시 동작할 핸들러
  const handleMsgClick = (msg, event) => {
    event.stopPropagation(); // 상위로 이벤트 전파 방지
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

  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    return () => {
      closeWebSocket();
    };
  }, []);

  return (
    <div className="chat_home">
      {isConnected ? (
        <>
          <div className="chat_back_button" onClick={backtolist}>
            뒤로
          </div>
          <h2>채팅방</h2>

          <div className="chat_content_box">
            {messages.map(
              (msg, index) =>
                msg.message &&
                (msg.senderId === currentUserId2 ||
                  msg.senderId === chatFriend.user_id1) && ( // senderId가 currentUserId2와 같을 때만 메시지를 표시합니다.
                  <div key={msg.id}>
                    <p
                      className="textmessage"
                      onClick={(e) => handleMsgClick(msg, e)}
                    >
                      {msg.senderId}: {msg.message}
                    </p>
                  </div>
                )
            )}
            <div style={hiddenDivStyle} className="optionsDiv">
              {/* 선택된 메시지 정보를 사용하는 버튼 예시 */}
              {selectedMessage && (
                <button
                  onClick={() =>
                    console.log(`작업 실행: ${selectedMessage.message}`)
                  }
                >
                  선택한 메세지: {selectedMessage.message}
                </button>
              )}
            </div>
          </div>
          <input
            type="text"
            className="chat_text_send_button"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          ></input>
          <div className="chat_foot_bar">
            <button className="chat_foot_bar_button" onClick={sendMessage}>
              보내기
            </button>
          </div>
        </>
      ) : (
        <div>
          <div>채팅방</div>
          <div className="chat_home_header">
            <div>
              <input type="text" name="user_id2" />
            </div>
            <button type="submit">친구추가</button>
          </div>
          <div className="chat_home_body">
            <div className="chat_home_menubar">
              <button className="chm_button" onClick={navichatHome}>
                친구
              </button>
              <button className="chm_button">채팅</button>
            </div>
            <div>
              <div className="chatFriendList">
                {friendList
                  .filter((chat) => chat.user_id1 === chat.user_id2) // 조건에 맞는 항목만 필터링
                  .map((chat) => (
                    <div
                      key={chat.chatroom_id}
                      className="chatFriendListbox"
                      onClick={() => {
                        changeFriendName(chat.chatroom_id);
                        retryConnection();
                      }}
                    >
                      <div>
                        <div>나</div>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                {friendList &&
                  friendList
                    .filter((chat) => chat.user_id1 !== chat.user_id2)
                    .map((chat) => (
                      <div
                        key={chat.chatroom_id}
                        className="chatFriendListbox"
                        onClick={() => {
                          changeFriendName(chat.chatroom_id, chat.user_id2);
                          retryConnection();
                        }}
                      >
                        <div>구독방 넘버: {chat.chatroom_id}</div>
                        <div>구독방 친구: {chat.user_id2}</div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatnew;
