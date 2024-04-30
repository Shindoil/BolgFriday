import axios from "axios";
import {
  createOrderSuccess,
  createOrderFailure,
} from "../reducers/orderReducer";

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/orders", orderData);
    dispatch(createOrderSuccess(response.data));
  } catch (error) {
    dispatch(createOrderFailure(error.message));
  }
};
