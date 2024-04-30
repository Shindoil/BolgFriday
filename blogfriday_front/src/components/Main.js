import { useEffect, useState } from "react";
import "./layout/Main.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../toolkit/actions/product_action";
const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorysearch = (category_name) => {
    navigate(`/searchcategory/${category_name}`);
  };

  //상품검색
  const { productList, productImages } = useSelector((state) => state.product);
  const { productList1, productImages1 } = useSelector(
    (state) => state.product
  );
  const handleimgClick1 = (product_code) => {
    navigate(`/search/user/product/${product_code}`);
  };

  //배너
  const bannerimages = [
    "/Banner/1_Banner.jpg",
    "/Banner/2_Banner.jpg",
    "/Banner/3_Banner.jpg",
    "/Banner/4_Banner.jpg",
    "/Banner/5_Banner.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 다음 이미지로 이동하는 함수
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === bannerimages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 이미지 변경 간격 설정 (7초마다 변경)
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(productActions.getMainList());
    dispatch(productActions.getMainList2());
  }, [dispatch]);

  //여긴 페이지가 너무 길어 제일위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 상품가격 포멧팅
  function formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(price);
  }
  return (
    <>
      <div
        className="main_img"
        style={{
          backgroundImage: `url(${bannerimages[currentImageIndex]})`,
        }}
      ></div>
      <div className="category_menu_box">
        <div className="category_menu_box_0"></div>
        <div className="category_menu_box_a"></div>
        <div
          className="category_menu_box_1"
          onClick={() => categorysearch("패션")}
        ></div>
        <div
          className="category_menu_box_2"
          onClick={() => categorysearch("식품")}
        ></div>
        <div
          className="category_menu_box_3"
          onClick={() => categorysearch("가전제품")}
        ></div>
        <div
          className="category_menu_box_4"
          onClick={() => categorysearch("악세서리")}
        ></div>
        <div
          className="category_menu_box_5"
          onClick={() => categorysearch("가구")}
        ></div>
        <div
          className="category_menu_box_6"
          onClick={() => categorysearch("기타")}
        ></div>
      </div>
      <div className="category_menu_box_name">
        <div className="category_menu_box_0_name">카테고리</div>
        <div className="category_menu_box_a_name"></div>
        <div className="category_menu_box_1_name">패션</div>
        <div className="category_menu_box_2_name">식품</div>
        <div className="category_menu_box_3_name">전자제품</div>
        <div className="category_menu_box_4_name">악세서리</div>
        <div className="category_menu_box_5_name">가구</div>
        <div className="category_menu_box_6_name">기타</div>
      </div>
      <div className="main_sample_img_name">
        <div className="main_sample_img_name_box">전자제품</div>
      </div>
      <div className="main_sample_img_box">
        {productList &&
          productList.map((product) => (
            <div
              key={product.product_code}
              className="main_map_box"
              onClick={() => handleimgClick1(product.product_code)}
            >
              {productImages[product.product_code] &&
                productImages[product.product_code].product_img0 && (
                  <img
                    className="main_search_img"
                    src={`/shopimg/${
                      productImages[product.product_code].product_img0
                    }`}
                    alt={`${product.product_name}`}
                  />
                )}

              <div className="main_search_text">
                <div className="main_search_text_name">
                  {product.product_name}
                </div>
                <div className="main_search_text_price">
                  {formatPrice(product.product_price)}원
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="main_sample_img_name">
        <div className="main_sample_img_name_box">패션</div>
      </div>
      <div className="main_sample_img_box">
        {productList1 &&
          productList1.map((product) => (
            <div
              key={product.product_code}
              className="main_map_box"
              onClick={() => handleimgClick1(product.product_code)}
            >
              {productImages1[product.product_code] &&
                productImages1[product.product_code].product_img0 && (
                  <img
                    className="main_search_img"
                    src={`/shopimg/${
                      productImages1[product.product_code].product_img0
                    }`}
                    alt={`${product.product_name}`}
                  />
                )}

              <div className="main_search_text">
                <div className="main_search_text_name">
                  {product.product_name}
                </div>
                <div className="main_search_text_price">
                  {formatPrice(product.product_price)}원
                </div>
              </div>
            </div>
          ))}
      </div>
      <div></div>
    </>
  );
};

export default Main;
