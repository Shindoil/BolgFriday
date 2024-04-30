import axios from "axios";
import {
  createPaymentSuccess,
  createPaymentFailure,
} from "../reducers/paymentReducer";

export const createPayment = (paymentData) => async (dispatch) => {
  try {
    await axios.post("/api/transactions/createPayment", paymentData);
    dispatch(createPaymentSuccess());
  } catch (error) {
    dispatch(createPaymentFailure(error.message));
  }
};
