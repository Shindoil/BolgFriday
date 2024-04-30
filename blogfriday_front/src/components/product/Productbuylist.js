import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";

const Productbuylist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");
  const { producthistory } = useSelector((state) => state.product);

  const mypageuserinfo = (e) => {
    navigate("/shopedininfo");
  };

  const mypageuseredit = (e) => {
    alert(localStorage.getItem("user_name") + "님 정보를 수정하시겠습니까?");
    navigate("/shopuseredit");
  };

  const listmenunavi = (e) => {
    const userState = parseInt(localStorage.getItem("user_state"), 10);
    if (userState >= 2) {
      navigate("/seller/product/list");
    } else {
      alert("판매허가가 필요합니다.");
    }
  };

  const mypagemenunavi = (e) => {
    navigate(`/mypage`);
  };

  const searchnavi = (product_code, e) => {
    navigate(`/search/user/product/${product_code}`);
  };

  useEffect(() => {
    console.log("+++++++++", user_id);
    dispatch(productActions.getProductBuyerhistory(user_id));
  }, []);

  function getCategoryName(code) {
    const categoryMap = {
      1: "패션",
      2: "식품",
      3: "가전제품",
      4: "악세서리",
      5: "가구",
      6: "기타",
    };

    return categoryMap[code];
  }
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
          <div className="seller_menu_button_c">구매내역</div>
        </div>
        <div className="seller_list_body">
          <div className="seller_list_body_listm">
            <div className="slbl_ct">category</div>
            <div className="slbl_n">이름</div>
            <div className="slbl_a">수량</div>
            <div className="slbl_p">가격</div>
            <div className="slbl_l">링크</div>
            <div className="slbl_d">등록일자</div>
          </div>
          <div>
            {producthistory &&
              producthistory.map((product, index) => (
                <div
                  key={product.product_code}
                  className={
                    index % 2 === 0
                      ? "seller_list_body_list"
                      : "seller_list_body_listo"
                  }
                >
                  <div className="slbl_ct">
                    {getCategoryName(product.category_code)}
                  </div>
                  <div className="slbl_n">{product.product_name}</div>
                  <div className="slbl_a">{product.product_count}</div>
                  <div className="slbl_p">{product.product_price}</div>
                  <div
                    className="slbl_l"
                    onClick={(e) => searchnavi(product.product_code, e)}
                  >
                    링크
                  </div>
                  <div className="slbl_d">{product.timestamp}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Productbuylist;
