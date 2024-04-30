import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Editinfo.css"; // EditInfo.css 파일을 import 합니다.

const EditInfo = () => {
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
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_idemail: "",
    user_password: "",
    user_name: "",
    user_phonenumber: "",
    user_nickname: "",
    user_profile: null,
    previewImage: "/basicicon/no-profile.png", // 기본 이미지 설정
  });

  const {
    user_idemail,
    user_password,
    user_name,
    user_phonenumber,
    user_nickname,
    user_profile,
    previewImage,
  } = user;

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const handleValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const passChang = (e) => {
    if (user_password !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
  };

  const [showModal, setShowModal] = useState(true);
  const [pageDisabled, setPageDisabled] = useState(true);
  const [modalPassword, setModalPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  /////////////////추가
  const closeModal = () => {
    setShowModal(false);
    setPageDisabled(false);
  };

  const handleModalPasswordChange = (e) => {
    setModalPassword(e.target.value);
  };

  const handleModalSubmit = async () => {
    try {
      const response = await axios.post("/checkpass", {
        user_idemail: localStorage.getItem("user_idemail"),
        user_password: modalPassword,
      });
      console.log(response.data);
      closeModal();
      setPageDisabled(false);
    } catch (error) {
      console.error("비밀번호 확인 실패:", error);
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleModalCancel = () => {
    navigate("/chat/dot");
  };

  const info = async () => {
    try {
      const response = await axios.get(`/user/${localStorage.user_idemail}`);
      setUser((prev) => ({ ...prev, ...response.data, user_password: "" }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    info();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((prev) => {
      return {
        ...prev,
        user_profile: file,
        previewImage: URL.createObjectURL(file),
      };
    });
  };

  const handleResetImage = () => {
    setUser((prev) => ({
      ...prev,
      previewImage: "/basicicon/no-profile.png",
      user_profile: null,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user_password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    // 확인창을 띄우고 수정을 진행할지 결정
    const confirmResult = window.confirm("정말로 수정하시겠습니까?");
    if (!confirmResult) return;

    try {
      const formData = new FormData();
      formData.append("user_profile", user_profile);
      formData.append("user_idemail", user_idemail);
      formData.append("user_password", user_password);
      formData.append("user_name", user_name);
      formData.append("user_phonenumber", user_phonenumber);
      formData.append("user_nickname", user_nickname);

      // 파일 이미지가 기본 이미지인 경우 null 값 전달
      if (user_profile === null) {
        formData.set("user_profile", null);
      }

      await axios.put(`/user/update`, formData, config);
      localStorage.setItem("user_name", user_name);
      navigate("/");
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
    }
  };

  const onCancel = () => {
    navigate("/chat/dot");
  };

  return (
    <div className="chat">
      <div className="chat_body">
        <div className="editinfo-form-container">
          <div>
            <form onSubmit={onSubmit}>
              <div className="chatdot_header_tag">회원정보 수정하기</div>
              <div className="editinfo-form-group mb-1">
                <input
                  type="email"
                  className="form-control"
                  name="user_idemail"
                  placeholder="이메일"
                  value={localStorage.user_idemail}
                  readOnly
                />
              </div>
              <div className="editinfo-form-group mb-1">
                <input
                  type="password"
                  className="form-control"
                  name="user_password"
                  placeholder="비밀번호"
                  value={user_password}
                  onChange={handleValueChange}
                  disabled={pageDisabled}
                />
              </div>

              <div className="editinfo-form-group mb-1">
                <input
                  type="password"
                  className="form-control"
                  name="user_password2"
                  placeholder="비밀번호 확인"
                  onChange={passChang}
                  disabled={pageDisabled}
                />
                <span>{passwordCheck}</span>
              </div>
              <div className="editinfo-form-group mb-1">
                <input
                  type="text"
                  className="form-control"
                  name="user_name"
                  placeholder="이름"
                  value={user_name}
                  onChange={handleValueChange}
                  disabled={pageDisabled}
                />
              </div>

              <div className="editinfo-form-group mb-1">
                <input
                  type="text"
                  className="form-control"
                  name="user_phonenumber"
                  placeholder="연락처"
                  value={user_phonenumber}
                  onChange={handleValueChange}
                  disabled={pageDisabled}
                />
              </div>
              <div className="editinfo-form-group mb-1">
                <input
                  type="text"
                  className="form-control"
                  name="user_nickname"
                  placeholder="userNickname"
                  value={user_nickname}
                  onChange={handleValueChange}
                  disabled={pageDisabled}
                />
              </div>

              <div className="editinfo-form-group-img"></div>
              <div className="editinfo-form-group-prevbox">
                {(previewImage || user_profile === null) && (
                  <img
                    src={previewImage}
                    alt="프로필 이미지 미리보기"
                    className="editinfo-profile-image-preview"
                  />
                )}
                <div className="editinfo-form-group-prevbox2">
                  <div className="infotexth">프로필 사진</div>
                  <input
                    type="file"
                    className="form-control"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={pageDisabled}
                  />
                  <div className="infotext">
                    프로필 사진을 업로드 하지 않으면 기본이미지로 설정됩니다.
                  </div>
                  <button
                    type="button"
                    className="editinfo-btn btn-secondary"
                    onClick={handleResetImage}
                    disabled={pageDisabled}
                  >
                    기본 이미지로 변경하기
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="editinfo-btn-edit"
                disabled={pageDisabled}
                onClick={onSubmit}
              >
                회원정보 수정하기
              </button>
              <button className="editinfo-btn-edit" onClick={onCancel}>
                수정 취소
              </button>
            </form>
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

      {showModal && (
        <div className="shopuer-modal">
          <div className="shopuser-modal-content">
            <h2>비밀번호 확인</h2>
            <p>회원정보 수정을 위해 비밀번호를 입력하세요.</p>
            <input
              type="password"
              value={modalPassword}
              onChange={handleModalPasswordChange}
              name="modal_password"
              placeholder="비밀번호"
            />
            <button onClick={handleModalSubmit}>확인</button>
            <button onClick={handleModalCancel}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditInfo;
