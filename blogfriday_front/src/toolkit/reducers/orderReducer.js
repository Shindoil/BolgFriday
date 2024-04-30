import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    error: null,
  },
  reducers: {
    createOrderSuccess(state, action) {
      state.order = action.payload;
    },
    createOrderFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const { createOrderSuccess, createOrderFailure } = orderSlice.actions;

export default orderSlice.reducer;
