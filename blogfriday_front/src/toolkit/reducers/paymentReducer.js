import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentStatus: null,
    error: null,
  },
  reducers: {
    createPaymentSuccess(state) {
      state.paymentStatus = "success";
    },
    createPaymentFailure(state, action) {
      state.paymentStatus = "failure";
      state.error = action.payload;
    },
  },
});

export const { createPaymentSuccess, createPaymentFailure } =
  paymentSlice.actions;

export default paymentSlice.reducer;
