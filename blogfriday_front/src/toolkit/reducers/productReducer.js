import { createSlice } from "@reduxjs/toolkit";

//action타입, actioncreater,reducer를 여기에서 설정

let initialState = {
  product: {},
  productDetail: {},
  productImgDetail: {
    product_img0: "",
    product_img1: "",
  },
  productList: [],
  productImages: {},
  productList1: [],
  productImages1: {},
  producthistory: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct(state, action) {
      state.productDetail = action.payload.data;
    },

    getPoductImg(state, action) {
      state.productImgDetail = action.payload.data;
    },

    getProductList(state, action) {
      state.productList = action.payload.productList;
      state.productImages = action.payload.productImages;
    },
    getProductList1(state, action) {
      state.productList1 = action.payload.productList;
      state.productImages1 = action.payload.productImages;
    },
    getProducthistory(state, action) {
      state.producthistory = action.payload.producthistory;
    },
  },
});

export const productReducers = productSlice.actions;

export default productSlice;
