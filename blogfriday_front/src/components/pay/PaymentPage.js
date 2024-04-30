import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment } from "../../toolkit/actions/paymentActions";
import { createOrder } from "../../toolkit/actions/orderActions";
import { useNavigate, useParams } from "react-router-dom";
import { productActions } from "../../toolkit/actions/product_action";
import "./PaymentPage.css";
import axios from "axios";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product_code } = useParams();
  const { count } = useParams();
  console.log("order++", product_code);

  const [orderInfo, setOrderInfo] = useState({
    deliveryAddress: "",
    deliveryInstruction: "",
    quantity: count,
  });
  const [product, setProduct] = useState({
    product_name: "차은우 옷갈아입히기 세트",
    product_price: 9990000,
  });

  const productDetail = useSelector((state) => state.product.productDetail);
  const productImgDetail = useSelector(
    (state) => state.product.productImgDetail
  );

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentResult, setPaymentResult] = useState("");

  const handleInputChange = (e) => {
    setOrderInfo({ ...orderInfo, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (e) => {
    setOrderInfo({ ...orderInfo, quantity: parseInt(e.target.value) });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const submitOrder = () => {
    const orderData = {
      deliveryAddress: orderInfo.deliveryAddress,
      deliveryInstruction: orderInfo.deliveryInstruction,
      quantity: orderInfo.quantity,
      totalAmount: product.product_price * orderInfo.quantity,
      orderDate: new Date(),
      orderAmount: product.product_price * orderInfo.quantity,
    };

    const paymentData = {
      paymentMethod: paymentMethod,
      amount: product.product_price * orderInfo.quantity,
    };

    const user_id = localStorage.getItem("user_id");

    const orderdetailData = {
      productCode: product_code,
      productQuantity: orderInfo.quantity,
    };

    dispatch(createOrder(orderData))
      .then(() => {
        dispatch(createPayment(paymentData))
          .then(() => {
            //
            axios.post(
              `/api/product/producthistory/${user_id}`,
              orderdetailData
            );
            setPaymentResult("결제가 성공적으로 완료되었습니다.");
            navigate("/order/complete");
          })
          .catch(() => {
            setPaymentResult("결제 중 오류가 발생했습니다. 다시 시도해주세요.");
          });
      })
      .catch(() => {
        setPaymentResult(
          "주문 생성 중 오류가 발생했습니다. 다시 시도해주세요."
        );
      });
  };

  useEffect(() => {
    console.log("+++++++++", product_code);
    dispatch(productActions.getProductDetail(product_code));
    dispatch(productActions.getProductimgDownload(product_code));
  }, []);

  const imagePath = `/shopimg/${productImgDetail.product_img0}`;

  //가격 포메팅
  function formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(price);
  }
  return (
    <div>
      <main>
        <div className="order-form">
          <section className="title">
            <h1>주문 및 결제</h1>
          </section>

          <div className="order-details">
            <div className="store-name">{productDetail.product_name}</div>
            <div className="order-info">
              <img
                className=""
                src={imagePath}
                alt="product_img0"
                width="300"
                height="300"
              />
              <p>가격: {formatPrice(productDetail.product_price)}원</p>
              <label>
                수량 선택:
                <input
                  type="number"
                  name="quantity"
                  value={orderInfo.quantity}
                  onChange={handleQuantityChange}
                />
              </label>
              <p>
                총 결제 금액:{" "}
                {formatPrice(productDetail.product_price * orderInfo.quantity)}
                원
              </p>
            </div>
          </div>

          <div className="order-menu">
            <h3>결제 수단 선택</h3>
            <div className="paymentMethod_box">
              <div className="paymentMethod_boxi">
                <img
                  className="paymenticorn"
                  src="/basicicon/card.png"
                  alt="카드"
                />
                <input
                  type="radio"
                  className="inputsize"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={handlePaymentMethodChange}
                />
                신용카드
                <span className="menu-price"></span>
              </div>

              <div className="paymentMethod_boxi">
                <img
                  className="paymenticorn"
                  src="/basicicon/cash.png"
                  alt="카드"
                />
                <input
                  type="radio"
                  className="inputsize"
                  name="paymentMethod"
                  value="bankTransfer"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={handlePaymentMethodChange}
                />
                계좌이체
                <span className="menu-price"></span>
              </div>
            </div>
          </div>

          {/* <div className="price">
            <div>
              <span>총 결제 금액</span>
              <span>{productDetail.product_price * orderInfo.quantity}원</span>
            </div>
          </div> */}

          <div className="total">
            <div>
              <span>총 결제 금액</span>
              <span>
                {formatPrice(productDetail.product_price * orderInfo.quantity)}
                원
              </span>
            </div>
          </div>

          <button
            className="order-button"
            onClick={submitOrder}
            disabled={!paymentMethod}
          >
            {formatPrice(productDetail.product_price * orderInfo.quantity)}원
            결제하기
          </button>
        </div>
      </main>
      {paymentResult && <p>{paymentResult}</p>}
    </div>
  );
};

export default PaymentPage;
