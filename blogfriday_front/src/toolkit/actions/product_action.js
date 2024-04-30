import axios from "axios";
import { productReducers } from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";

function getProductWrite(formData, config) {
  return async () => {
    await axios
      .post(`/api/product/save`, formData, config)
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert("등록성공");

        return data;
      })

      .catch((error) => {
        console.log(error);
        alert("등록에 실패하였습니다");
      });
  };
}

function getProductDetail(product_code) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/content/${product_code}`)
      .then((response) => response.data);

    dispatch(productReducers.getProduct({ data }));
  };
}

function getProductimgDownload(product_code) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/content/img/${product_code}`)
      .then((response) => response.data);

    dispatch(productReducers.getPoductImg({ data }));
  };
}

//검색바 물품조회
function getProductList(product_name) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/list/${product_name}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProductList(data));
  };
}

//카테고리 물품조회
function getProductCategoryList(category_name) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/categorylist/${category_name}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProductList(data));
  };
}

//판매자용조회
function getSellerList(user_id) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/seller/${user_id}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProductList(data));
  };
}

function deleteProducts(productCodes) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/product/deletenumlist`, {
        headers: {
          "Content-Type": "application/json", // Ensure the content-type is set correctly
        },
        data: JSON.stringify(productCodes), // Send the array directly as JSON
      });
      dispatch({ type: "DELETE_PRODUCTS_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Error deleting products:", error);
      // Optionally dispatch a failure action here
      dispatch({ type: "DELETE_PRODUCTS_FAIL", payload: error.response.data });
    }
  };
}

//판매자용조회
function getMainList() {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/mainlist`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProductList(data));
  };
}

//판매자용조회
function getMainList2() {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/mainlist2`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProductList1(data));
  };
}

//구매내역
function getProductBuyerhistory(user_id2) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/producthistory/buyer/${user_id2}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProducthistory(data));
  };
}

//판매내역
function getProductSellerhistory(user_id1) {
  return async (dispatch) => {
    const data = await axios
      .get(`/api/product/producthistory/seller/${user_id1}`)
      .then((Response) => Response.data);
    console.log("Map", data);

    dispatch(productReducers.getProducthistory(data));
  };
}

export const productActions = {
  getProductWrite,
  getProductDetail,
  getProductimgDownload,
  getProductList,
  getSellerList,
  getProductCategoryList,
  deleteProducts,
  getMainList,
  getProductBuyerhistory,
  getProductSellerhistory,
  getMainList2,
};
