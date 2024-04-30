import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  fetchCartList,
  fetchCartDelete,
  updateCartProductCount,
} from "../../toolkit/actions/cart_action";
import "./CartItem.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CartComponent = () => {
  const navigate = useNavigate();
  const [productcode, setproductcode] = useState();
  const [count, setcount] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [checked, setChecked] = useState({});
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태를 관리하는 상태 추가

  console.log("cartItems:", cartItems);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    console.log("user_id:", user_id);
    if (!user_id) {
      alert("로그인이 필요한 서비스입니다");
      navigate("/login");
    } else {
      (async () => {
        const res = await fetchCartList(user_id);
        if (res && res.status === 200) {
          setCartItems(res.data.cartList);
          const initialCheckState = {};
          (res.data.cartList || []).forEach((item) => {
            initialCheckState[item.cart_product_code] = false;
          });
          setChecked(initialCheckState);
        } else {
          // 장바구니가 비어있는 경우에 대한 처리
          console.log("장바구니가 비어있습니다.");
          // 또는 다른 처리를 추가할 수 있습니다.
        }
      })();
    }
  }, []);

  const handleCountChange = async (cartProductCode, newCount) => {
    try {
      console.log(cartProductCode, newCount);
      const res = await updateCartProductCount(cartProductCode, newCount);
      if (res.status === 200) {
        const updatedCartItems = cartItems.map((item) =>
          item.cart_product_code === cartProductCode
            ? { ...item, cart_product_count: newCount }
            : item
        );
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.error("Error updating cart item count:", error);
      alert("수량 업데이트에 실패했습니다."); // User-friendly error message
    }
  };

  //삭제하기
  const handleDelete = async (cart_product_code) => {
    try {
      await fetchCartDelete(cart_product_code); // fetchCartDelete 함수 호출
      const newData = cartItems.filter(
        (item) => item.cart_product_code !== cart_product_code
      ); // 삭제된 아이템을 제외하고 새로운 데이터 생성
      setCartItems(newData); // 새로운 데이터로 상태 업데이트
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  //전체삭제
  const handleAllDelete = async () => {
    const selectedProducts = Object.keys(checked).filter(
      (cartProductCode) => checked[cartProductCode]
    );

    try {
      // 선택된 각 상품을 순회하면서 비동기적으로 삭제합니다.
      for (const cartProductCode of selectedProducts) {
        await fetchCartDelete(cartProductCode);
        // 각 상품 삭제 후 상태 업데이트
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cart_product_code !== cartProductCode)
        );
      }

      // 전체 삭제 후에 페이지를 새로고침합니다.
      window.location.replace("/cart");
    } catch (error) {
      console.error("Error deleting selected cart items:", error);
    }
  };

  //전체 선택
  const handleSelectAllToggle = () => {
    setSelectAll(!selectAll); // 전체 선택 상태를 토글합니다.
    const updatedCheckedState = {}; // 업데이트할 체크 상태를 담을 객체 생성
    (cartItems || []).forEach((item) => {
      updatedCheckedState[item.cart_product_code] = !selectAll; // 모든 상품의 체크 상태를 전체 선택 상태와 동일하게 설정합니다.
    });
    setChecked(updatedCheckedState); // 변경된 체크 상태를 적용합니다.
  };

  //총상품가격
  const totalSum = (cartItems || []).reduce((acc, item) => {
    if (checked[item.cart_product_code]) {
      const itemTotal = item.cart_product_count * item.product_price;
      return acc + itemTotal;
    }
    return acc;
  }, 0);

  //총할인
  const totalSale = (cartItems || []).reduce((acc, item) => {
    if (checked[item.cart_product_code]) {
      const itemSale = (item.cart_product_count * item.product_price) / 10;
      return acc + itemSale;
    }
    return acc;
  }, 0);

  //상품정보, 상품 이미지 정보 가져오기
  const productDetail = useSelector((state) => state.product.productDetail);
  const productImgDetail = useSelector(
    (state) => state.product.productImgDetail
  );

  const onhandlepaybutton = () => {
    // 장바구니에 선택된 상품이 없을 경우 경고 메시지를 표시하고 결제 페이지로 이동하지 않음
    if (Object.values(checked).every((value) => !value)) {
      alert("상품을 선택해주세요.");
      return;
    }
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////
    navigate(`/payment/${productcode}/${count}`);
    console.log("물품 판매 코드 넘기기", productcode);
  };

  const handleCheckChange = (cartProductCode, product_code, count) => {
    setChecked({
      ...checked,
      [cartProductCode]: !checked[cartProductCode],
    });
    setproductcode(product_code);
    setcount(count);
  };
  //수량 변경
  const handleCountIncrement = async (cartProductCode) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex(
      (item) => item.cart_product_code === cartProductCode
    );
    updatedCartItems[index].cart_product_count++;
    setCartItems(updatedCartItems);
    await updateCartProductCount(
      // updateCartProductCount 함수 호출
      cartProductCode,
      updatedCartItems[index].cart_product_count
    );
  };

  const handleCountDecrement = async (cartProductCode) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex(
      (item) => item.cart_product_code === cartProductCode
    );
    if (updatedCartItems[index].cart_product_count > 1) {
      updatedCartItems[index].cart_product_count--;
      setCartItems(updatedCartItems);
      await updateCartProductCount(
        // updateCartProductCount 함수 호출
        cartProductCode,
        updatedCartItems[index].cart_product_count
      );
    }
  };

  function formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(price);
  }

  return (
    <div className="cart_container">
      <h2 className="horizenline2">장바구니</h2>
      <div className="horizenline" />
      <button onClick={handleSelectAllToggle}>전체 선택</button>{" "}
      <button onClick={handleAllDelete}>선택 삭제</button>
      {/* 전체 선택 버튼 추가 */}
      <div className="cart_item_box">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.cart_product_code} className="cart_item">
              <input
                type="checkbox"
                className="checkbox-custom"
                checked={checked[item.cart_product_code] || false}
                onChange={() =>
                  handleCheckChange(
                    item.cart_product_code,
                    item.product_code,
                    item.cart_product_count
                  )
                }
              />
              <img
                src={`./shopimg/${item.product_img0}`} // 이미지 추가
                alt={item.product_name}
                style={{
                  width: "150px",
                  height: "150px",
                }}
              />
              <div className="product_details">
                <div className="font2">
                  <p>이름: {item.product_name}</p>
                  <p>가격: {formatPrice(item.product_price)}원</p>
                </div>
                <div className="product_amount_b">
                  <div
                    className="amount_bm"
                    onClick={() => handleCountDecrement(item.cart_product_code)}
                    disabled={item.cart_product_count <= 1}
                  >
                    -
                  </div>
                  <span>{item.cart_product_count}</span>
                  <div
                    className="amount_ba"
                    onClick={() => handleCountIncrement(item.cart_product_code)}
                  >
                    +
                  </div>
                </div>

                <label
                  htmlFor={item.cart_product_code}
                  className="checkbox-label"
                ></label>
                <div>
                  <button onClick={() => handleDelete(item.cart_product_code)}>
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>장바구니에 상품이 없습니다.</p>
        )}
      </div>
      <div className="checkout-box">
        <div className="checkout-box_f">
          <div className="">주문예상가격</div>
        </div>
        <div className="checkout-box_w">
          <div>총상품가격: {formatPrice(totalSum)}원</div>
        </div>
        <div className="checkout-box_b">
          <button className="button:hover" onClick={onhandlepaybutton}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
