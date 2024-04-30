import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  const user_id = localStorage.getItem("user_id");

  const changeState = async (e) => {
    e.preventDefault();
    await axios.put(`/user/updatestate/${localStorage.getItem("user_id")}`);
  };

  const savemenunavi = (e) => {
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

  const buylistnavi = (e) => {
    navigate(`/buylist`);
  };

  const mypageuserinfo = (e) => {
    navigate("/shopedininfo");
  };

  const mypageuseredit = (e) => {
    alert(localStorage.getItem("user_name") + "님 정보를 수정하시겠습니까?");
    navigate("/shopuseredit");
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
          <div className="seller_menu_button" onClick={mypageuserinfo}>
            내정보
          </div>

          <div className="seller_menu_button" onClick={mypageuseredit}>
            내정보 수정
          </div>
          <div className="seller_menu_button" onClick={buylistnavi}>
            구매내역
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
