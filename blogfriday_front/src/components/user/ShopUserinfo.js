import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ShopUserinfo.css";

const ShopUserinfo = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const user_state = localStorage.getItem("user_state");

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

  const changeState = async (e) => {
    e.preventDefault();
    await axios.put(`/user/updatestate/${localStorage.getItem("user_id")}`);
    alert("판매허가 승인완료." + " " + "다시 로그인해주세요.");
    navigate("/loginshop");
  };

  const savemenunavi = (e) => {
    navigate(`/seller/product/save/${user_id}`);
  };

  const buylistnavi = (e) => {
    navigate(`/buylist`);
  };

  const listmenunavi = (e) => {
    const userState = parseInt(localStorage.getItem("user_state"), 10);
    if (userState >= 2) {
      navigate("/seller/product/list");
    } else {
      alert("판매허가가 필요합니다.");
    }
  };

  const mypageuserinfo = (e) => {
    navigate("/shopedininfo");
  };

  const mypageuseredit = (e) => {
    alert(localStorage.getItem("user_name") + "님 정보를 수정하시겠습니까?");
    navigate("/shopuseredit");
  };

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
    <>
      <div className="seller_body">
        <div className="seller_menu_box">
          <div className="seller_menu_button_1">구매탭</div>
          <div className="seller_menu_button" onClick={listmenunavi}>
            판매탭
          </div>
        </div>
        <div className="seller_menu_box">
          <div className="seller_menu_button_m" onClick={mypageuserinfo}>
            내정보
          </div>
          <div className="seller_menu_button" onClick={mypageuseredit}>
            내정보 수정
          </div>
          <div className="seller_menu_button" onClick={buylistnavi}>
            구매내역
          </div>
        </div>

        <div className="mypage_body">
          <div className="shopedit_container">
            <h1>{localStorage.user_name}님의 정보</h1>
            <div className="form-group mb-1">
              <img
                src={
                  user.user_profile
                    ? `/profileimages/${user.user_profile}`
                    : "/basicicon/no-profile.png"
                }
                alt="프로필 사진"
                className="shopedit-profile-image"
              />
            </div>
            <div className="shopedit-form-group mb-1">
              <label>이메일</label>
              <input
                type="email"
                className="eidtform_control"
                value={user_idemail}
                readOnly
              />
            </div>
            <div className="shopedit-form-group mb-1">
              <label>이름</label>
              <input
                type="text"
                className="eidtform_control"
                value={user_name}
                readOnly
              />
            </div>
            <div className="shopedit-form-group mb-1">
              <label>연락처</label>
              <input
                type="text"
                className="eidtform_control"
                value={user_phonenumber}
                readOnly
              />
            </div>
            <div className="shopedit-form-group mb-1">
              <label>닉네임</label>
              <input
                type="text"
                className="eidtform_control"
                value={user_nickname}
                readOnly
              />
            </div>
            <div className="shopedit-form-group mb-1">
              <label>친구추가 코드</label>
              <input
                type="text"
                className="eidtform_control"
                value={user_code}
                readOnly
              />
            </div>
            {user_state === "1" && (
              <button className="shopedit_permit" onClick={changeState}>
                판매허가
              </button>
            )}
            <button
              type="button"
              className="shopedit-btn"
              onClick={handleWithdrawal}
            >
              회원 탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopUserinfo;
