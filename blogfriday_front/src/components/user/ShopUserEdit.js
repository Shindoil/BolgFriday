import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ShopUserEdit.css";

const ShopUserEdit = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    user_idemail: "",
    user_password: "",
    user_name: "",
    user_phonenumber: "",
    user_nickname: "",
    user_profile: null,
    previewImage: "/basicicon/no-profile.png",
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

  const [showModal, setShowModal] = useState(true);
  const [pageDisabled, setPageDisabled] = useState(true);
  const [modalPassword, setModalPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const openModal = () => {
    setShowModal(true);
    setPageDisabled(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPageDisabled(false);
  };
  const handleValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
    navigate("/shopedininfo");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((prev) => ({
      ...prev,
      user_profile: file,
      previewImage: URL.createObjectURL(file),
    }));
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

      if (user_profile === null) {
        formData.set("user_profile", null);
      }

      await axios.put(`/user/update`, formData, config);
      localStorage.setItem("user_name", user_name);
      alert("회원정보 수정완료");
      navigate("/loginshop");
    } catch (error) {
      console.error("회원 정보 수정 실패:", error);
    }
  };

  const onCancel = () => {
    navigate("/shopedininfo");
  };

  const user_id = localStorage.getItem("user_id");

  const savemenunavi = () => {
    navigate(`/seller/product/save/${user_id}`);
  };

  const listmenunavi = (e) => {
    const userState = parseInt(localStorage.getItem("user_state"), 10);
    if (userState >= 2) {
      navigate("/seller/product/list");
    } else {
      alert("판매허가가 필요합니다.");
    }
  };

  const mypageuserinfo = () => {
    navigate("/shopedininfo");
  };

  const mypageuseredit = () => {
    navigate("/shopuseredit");
  };

  const passChang = (e) => {
    if (user_password !== e.target.value) setPasswordCheck("비밀번호 불일치");
    else setPasswordCheck("비밀번호 일치");
  };
  return (
    <div className="seller_body">
      <div className="seller_menu_box">
        <div className="seller_menu_button_1">구매탭</div>
        <div className="seller_menu_button" onClick={listmenunavi}>
          판매탭
        </div>
      </div>
      <div className="seller_menu_box">
        <div className="seller_menu_button" onClick={mypageuserinfo}>
          내정보
        </div>
        <div className="seller_menu_button_m" onClick={mypageuseredit}>
          내정보 수정
        </div>
        <div className="seller_menu_button">구매내역</div>
      </div>

      <div className="shopuseredit-form-container">
        <div className="shopuseredit-from">
          <div>
            <div className="mypage_body">
              <h1>회원정보 수정하기</h1>
              <div className="shopuseredit-form-group mb-1">
                <input
                  type="email"
                  className="shopuseredit_form-control"
                  name="user_idemail"
                  placeholder="이메일"
                  value={localStorage.user_idemail}
                  readOnly
                />
              </div>
              <div className="shopuseredit-form-group mb-1">
                <input
                  type="password"
                  className="shopuseredit_form-control"
                  name="user_password"
                  placeholder="비밀번호"
                  value={user_password}
                  onChange={handleValueChange}
                  disabled={pageDisabled}
                />
              </div>

              <div className="shopuseredit-form-group mb-1">
                <input
                  type="password"
                  className="shopuseredit_form-control"
                  name="user_password2"
                  placeholder="비밀번호 확인"
                  onChange={passChang}
                  disabled={pageDisabled}
                />
                <span>{passwordCheck}</span>
              </div>
              <div className="shopuseredit-form-group mb-1">
                <input
                  type="text"
                  className="shopuseredit_form-control"
                  name="user_name"
                  placeholder="이름"
                  value={user_name}
                  onChange={handleValueChange}
                  disabled={pageDisabled}
                />
              </div>

              <div className="shopuseredit-form-group mb-1">
                <input
                  type="text"
                  className="shopuseredit_form-control"
                  name="user_phonenumber"
                  placeholder="연락처"
                  value={user_phonenumber}
                  onChange={handleValueChange}
                  disabled={pageDisabled}
                />
              </div>
              <div className="shopuseredit-form-group mb-1">
                <input
                  type="text"
                  className="shopuseredit_form-control"
                  name="user_nickname"
                  placeholder="userNickname"
                  value={user_nickname}
                  onChange={handleValueChange}
                  disabled={pageDisabled}
                />
              </div>

              <div className="shopuseredit-profile-image">
                {(previewImage || user_profile === null) && (
                  <img
                    src={previewImage}
                    alt="프로필 이미지 미리보기"
                    className="shopuseredit-profile-image-preview"
                  />
                )}
                <input
                  type="file"
                  className="form-control"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={pageDisabled}
                />
                <div className="shopuseredit-form-imgbox">
                  <label className="profileImagebtn" htmlFor="profileImage">
                    프로필 사진
                  </label>
                  <button
                    type="button"
                    className="shopuseredit-form-group mb-1"
                    onClick={handleResetImage}
                    disabled={pageDisabled}
                  >
                    기본 이미지로 변경하기
                  </button>
                </div>
              </div>
              <div>
                프로필 사진을 업로드 하지 않으면 기본이미지로 설정됩니다.
              </div>

              <button
                type="submit"
                className="shopuseredit-btn"
                disabled={pageDisabled}
                onClick={onSubmit}
              >
                회원정보 수정하기
              </button>
              <button type="button" onClick={onCancel} disabled={pageDisabled}>
                수정 취소
              </button>
            </div>
          </div>
        </div>
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

export default ShopUserEdit;
