import axios from "axios";
//import Cookies from "js-cookie";
import { getToken } from "../helpers/index";

export const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
export const token = getToken();

export const api = {
  get: async (url, params = {}) =>
    axios.get(baseUrl + "" + url, {
      headers: {
        "x-auth-token": token, //add here to search token in localstorage if user rememberMe: Cookies.get("token")
      },
      ...params,
    }),
  post: (url, data) =>
    axios.post(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
      },
    }),
  patch: (url, data) =>
    axios.patch(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
      },
    }),
  put: (url, data) =>
    axios.put(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
      },
    }),
  delete: (url, data) =>
    axios.delete(baseUrl + "" + url, {
      headers: {
        "x-auth-token": token,
      },
      data,
    }),
};
