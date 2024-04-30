import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productReducer";

import orderReducer from "./reducers/orderReducer";
import paymentReducer from "./reducers/paymentReducer";
import chatSlice from "./reducers/chatReducer";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    payment: paymentReducer,
    order: orderReducer,
    chat: chatSlice.reducer,
  },
});

export default store;
