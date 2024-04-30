import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";
import "./Productsave.css";

const Porductsave = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    category_code: "",
    product_name: "",
    product_price: "",
    product_count: "",
    product_content_text: "",
    filename: null,
    secondFile: null,
  });

  const user_id = localStorage.getItem("user_id");

  const {
    category_code,
    product_name,
    product_price,
    product_count,
    product_content_text,
    filename,
    secondFile,
  } = product;

  const productDetail = useSelector((state) => state.product.productDetail);

  const handleValueChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const savemenunavi = (e) => {};

  const listmenunavi = (e) => {
    navigate("/seller/product/list");
  };

  const mypagemenunavi = (e) => {
    navigate(`/mypage`);
  };

  const sellistnavi = (e) => {
    navigate(`/selllist`);
  };

  const handleFileChange = (e) => {
    setProduct((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // 프로필 이미지 전송시에는 multipart/form-data로 설정
      Authorization: localStorage.getItem("Authorization"),
      "Authorization-refresh": localStorage.getItem("Authorization-refresh"),
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("category_code", category_code);
    formData.append("product_name", product_name);
    formData.append("product_price", product_price);
    formData.append("product_count", product_count);
    formData.append("product_content_text", product_content_text);
    formData.append("filename", filename);
    formData.append("secondFile", secondFile);

    try {
      await dispatch(productActions.getProductWrite(formData, config));
      alert("action 전송 성공.");
    } catch (error) {
      console.error("action 전송 실패", error);
    }

    setProduct({
      category_code: "",
      product_name: "",
      product_price: "",
      product_count: "",
      product_content_text: "",
      filename: null,
      secondFile: null,
    });
  };

  //카테고리 관련
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const handleCategoryClick = (category, number) => {
    setSelectedCategoryName(category);
    setProduct({ ...product, category_code: number.toString() });
  };

  return (
    <>
      <div className="seller_body">
        <div className="seller_menu_box">
          <div className="seller_menu_button" onClick={mypagemenunavi}>
            구매탭
          </div>
          <div className="seller_menu_button_2">판매탭</div>
        </div>
        <div className="seller_menu_box">
          <div className="seller_menu_button" onClick={listmenunavi}>
            판매 물품 리스트
          </div>
          <div className="seller_menu_button_c" onClick={savemenunavi}>
            물품 등록
          </div>
          <div className="seller_menu_button" onClick={sellistnavi}>
            판매 내역
          </div>
        </div>
        <div className="save">
          <div className="saveinput">
            <div className="category_box">
              {["패션", "식품", "가전제품", "악세서리", "가구", "기타"].map(
                (category, index) => (
                  <button
                    key={index}
                    className={
                      selectedCategoryName === category ? "active" : ""
                    }
                    onClick={() => handleCategoryClick(category, index + 1)}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
            <form onSubmit={onSubmit} className="save_form_box">
              <div className="savecontextinputbox">
                <div className="save_inputbody">
                  <div className="save_t">
                    <div className="save_input_text">상품 카테고리</div>
                    <div className="save_input_text">상품명</div>
                    <div className="save_input_text">상품 가격</div>
                    <div className="save_input_text">상품 수량</div>
                    <div className="save_input_text">상품 설명</div>
                    {/* <div className="save_input_text">상품 이미지</div>
                    <div className="save_input_text">상품 상세 설명 이미지</div> */}
                  </div>

                  <div className="save_inputbox">
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="category_code"
                      value={selectedCategoryName}
                      readOnly
                    ></input>
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="product_name"
                      onChange={handleValueChange}
                    ></input>
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="product_price"
                      onChange={handleValueChange}
                    ></input>
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="product_count"
                      onChange={handleValueChange}
                    ></input>
                    <input
                      className="save_inputbox_input"
                      type="text"
                      name="product_content_text"
                      onChange={handleValueChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="save_inputimg">
                {/* <div className="save_inputimg_c">
                    <div className="save_input_text">상품 이미지</div>
                    <div className="save_input_text">상품 상세 설명 이미지</div>
                  </div> */}
                <div className="save_inputimg_d">
                  <input
                    className="save_file"
                    type="file"
                    name="filename"
                    id="filepath"
                    onChange={handleFileChange}
                  />

                  <input
                    className="save_file"
                    type="file"
                    name="secondFile"
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit" className="savesubmit_btn">
                  등록완료
                </button>
              </div>
            </form>
          </div>
          <div className="savepreview">
            <div className="savepreview_topbox">
              <div className="savepreview_img0">
                {filename ? (
                  <img src={URL.createObjectURL(filename)} alt="Preview" />
                ) : (
                  "상품이미지"
                )}
              </div>
              <div className="savepreview_text">
                <p>상품명: {product_name}</p>
                <p>가격: {product_price}</p>
                <p>수량: {product_count}</p>
                <p>내용: {product_content_text}</p>
              </div>
            </div>
            <div className="savepreview_img1">
              {secondFile ? (
                <img src={URL.createObjectURL(secondFile)} alt="Preview" />
              ) : (
                "상품 상세 설명 이미지"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Porductsave;
