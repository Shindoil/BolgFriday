import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SearchDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";
import { useState } from "react";
import axios from "axios";

const SearchDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product_code } = useParams();
  const user_id = localStorage.getItem("user_id");

  console.log("+++++++++", product_code);
  const productDetail = useSelector((state) => state.product.productDetail);
  const productImgDetail = useSelector(
    (state) => state.product.productImgDetail
  );

  function formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(price);
  }
  // const onhandlebuybutton = () => {
  //   navigate(`/payment/${productDetail.product_code}`);
  // };

  const onhandleblogbutton = () => {
    navigate("/blog");
  };

  const [amount, setAmount] = useState(0);
  const amountUp = () => {
    setAmount((amount) => amount + 1);
  };
  const amountDown = () => {
    if (amount > 0) {
      //setAmount(amount - 1);
      setAmount((amount) => amount - 1);
    }
  };

  const config = {
    headers: {
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  // const gocartbutton = async () => {
  //   console.log("add>>>>");
  //   await axios
  //     .post(
  //       `/api/cart/add`,
  //       {
  //         product_code: product_code,
  //         user_id: user_id,
  //         cart_product_count: amount,
  //       },
  //       config
  //     )
  //     .then((response) => navigate(`/cart`))
  //     .catch((error) => console.log(error));
  // };

  useEffect(() => {
    console.log("+++++++++", product_code);

    // 특정 파라미터 값(예: product_code)을 콘솔에 출력합니다.

    dispatch(productActions.getProductDetail(product_code));
    dispatch(productActions.getProductimgDownload(product_code));
  }, []);
  const imagePath = `/shopimg/${productImgDetail.product_img0}`;
  const imagePath1 = `/shopimg/${productImgDetail.product_img1}`;

  //여긴 페이지가 너무 길어 제일위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };
  const onhandlebuybutton = () => {
    if (amount === 0) {
      alert("상품 수량을 선택해 주세요");
    } else {
      navigate(`/payment/${productDetail.product_code}/${amount}`);
      closeModal();
    }
  };

  const gocartbutton = async () => {
    if (amount === 0) {
      alert("상품 수량을 선택해 주세요");
    } else {
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
            "Authorization-refresh": localStorage.getItem(
              "Authorization-refresh"
            ),
          },
        };
        await axios.post(
          `/api/cart/add`,
          {
            product_code: product_code,
            user_id: user_id,
            cart_product_count: amount,
          },
          config
        );
        if (window.confirm("쇼핑을 계속 하시겠습니까?")) {
        } else {
          navigate(`/cart`);
        }

        closeModal();
      } catch (error) {
        console.error("Error adding to cart", error);
      }
    }
  };

  return (
    <div className="detailbody">
      <div className="productbox">
        <img
          className="product_detail_img"
          src={imagePath}
          alt="product_img0"
          width="300"
          height="300"
        />
      </div>
      <div className="product_context_box">
        <div className="product_context_box_pname">
          {productDetail.product_name}
        </div>
        <div className="product_context_box_pcontext">
          <div>{productDetail.product_content_text}</div>
        </div>
        <div className="product_context_box_pprice">
          <div>
            {formatPrice(productDetail.product_price)}
            <span className="product_context_box_pprice_s">원</span>
          </div>
          {/* <div className="product_amount_b">
            <div className="amount_bm" onClick={amountDown}>
              -
            </div>
            <div className="amount_ba">{amount}</div>
            <div className="amount_bp" onClick={amountUp}>
              +
            </div>
          </div> */}
          {/* <div className="amount_cal">
            총{productDetail.product_price * amount}원
          </div> */}
        </div>
        {/* <div className="product_amount">
          <button className="detail_go_buy" onClick={onhandlebuybutton}>
            구매하기
          </button>
          <button className="detail_go_cart" onClick={gocartbutton}>
            장바구니
          </button>
        </div> */}
      </div>
      <div className="productcontentbox">
        <img
          className="productcontentbox_i"
          src={imagePath1}
          alt="product_img1"
          width="300"
          height="300"
        />
      </div>
      <div className="detail_hmenu">
        <div className="detail_hmewnu">
          <div className="detail_hmewnu01">
            <div className="detail_hmewnu_r">리뷰</div>
            <div className="detail_hmewnu_e">이벤트</div>
          </div>
          <div className="detail_hmewnu02">(1,065)</div>
        </div>
        <div className="detail_hmenu_btn" onClick={openModal}>
          장바구니
        </div>
      </div>
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="search_modal-overlay"
          onClick={handleOutsideClick}
        >
          <div className="search_modal" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="search_modal_close_button">
              X
            </button>
            <div className="product_amount_b">
              <div className="amount_bm" onClick={amountDown}>
                -
              </div>
              <div className="amount_ba">{amount}</div>
              <div className="amount_bp" onClick={amountUp}>
                +
              </div>
            </div>
            <div>
              <p>
                총 금액: {formatPrice(productDetail.product_price * amount)}원
              </p>
              <button onClick={onhandlebuybutton}>구매하기</button>
              <button onClick={gocartbutton}>장바구니에 추가</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDetail;
