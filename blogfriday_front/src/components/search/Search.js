import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";
import "./Search.css";
import axios from "axios";

const Search = () => {
  //기본 함수 선언
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product_name } = useParams();

  //이동
  const handleimgClick1 = (product_code) => {
    navigate(`/search/user/product/${product_code}`);
  };

  const { productList, productImages } = useSelector((state) => state.product);

  //반응
  useEffect(() => {
    dispatch(productActions.getProductList(product_name));

    setTimeout(() => {
      // 데이터 로딩에 따른 지연 후 실행
      // if (productList && productList.length === 0) {
      //   navigate("/search/searchempty");
      // }
      if (productList && productList.length > 0) {
        productList.forEach((product) => {
          const imageUrl = productImages[product.product_code]?.product_img0;
          console.log(`이미지 URL for ${product.product_name}: ${imageUrl}`);
        });
      }
    }, 500);
    // if (productList && productList.length > 0) {
    //   productList.forEach((product) => {
    //     const imageUrl = productImages[product.product_code]?.product_img0;
    //     console.log(`이미지 URL for ${product.product_name}: ${imageUrl}`);
    //   });
    // }
    // if (productList && productList.length === 0) {
    //   navigate("/search/searchempty");
    // }
  }, [product_name, dispatch]);
  //product_name, dispatch

  //가격 포메팅
  function formatPrice(price) {
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(price);
  }

  return (
    <div>
      <div className="product_list_body">
        <div className="search_output">
          <span className="product_name_red">{product_name} </span> 검색결과
        </div>
        <div className="product_blank4"></div>
        <div className="product_map">
          {productList &&
            productList.map((product) => (
              <div
                key={product.product_code}
                className="map_box"
                onClick={() => handleimgClick1(product.product_code)}
              >
                {productImages[product.product_code]?.product_img0 && (
                  <img
                    className="search_img"
                    src={`/shopimg/${
                      productImages[product.product_code].product_img0
                    }`}
                    alt={`${product.product_name}`}
                  />
                )}

                <div className="search_text">
                  <div className="search_text_name">{product.product_name}</div>
                  <div className="search_text_price">
                    {formatPrice(product.product_price)}원
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
