import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PaymentCompletePage.css";

const PaymentCompletePage = () => {
  const order = useSelector((state) => state.order.order);

  return (
    <div className="payment-complete-container">
      <div className="payment-complete-content">
        <h2>결제가 완료되었습니다.</h2>
        {/* 결제 완료 메시지 및 주문 정보 표시 */}
        {/* <p>주문 번호: {order?.orderId}</p>
        <p>주문 금액: {order?.orderAmount}</p> */}
        {/* 기타 주문 정보 */}

        {/* 네비게이션 버튼 */}
        <div className="navigation-buttons">
          <Link to="/shophome" className="navigation-button">
            홈으로 돌아가기
          </Link>
          <Link to="/mypage" className="navigation-button">
            마이페이지
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompletePage;
