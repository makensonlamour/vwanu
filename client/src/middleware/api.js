import axios from "axios";
import * as actions from "../store/api";
import env from "../config";

const api = (store) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);
  const { onSuccess, onError, onStart } = action.payload;
  if (onStart) store.dispatch({ type: onStart });
  next(action);
  try {
    const response = await axios({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api",
      ...action.payload,
    });

    store.dispatch({
      type: actions.apiCallSucceeded.type,
      payload: response.data,
    });
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    store.dispatch({
      type: actions.apiCallFailed.type,
      payload: error?.response?.data || "An unknown network error has occurred on Vwanu. Try again later.",
    });
    if (onError)
      store.dispatch({
        type: onError,
        payload: error?.response?.data || "An unknown network error has occurred on Vwanu. Try again later.",
      });
  }
};

export const setHeader = (headerKey, headerVal) => (axios.defaults.headers.common[headerKey] = headerVal);

export const saveToken = (token) => {
  setHeader(env.EXPECTED_HEADER, token);
  localStorage.setItem("token", token);
};
export const deleteToken = () => {
  setHeader(env.EXPECTED_HEADER, null);
  localStorage.removeItem("token");
};
export default api;
