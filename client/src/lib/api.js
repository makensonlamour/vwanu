import axios from "axios";
//import Cookies from "js-cookie";
import { getToken } from "../helpers/index";

export const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";
export const token = getToken("feathers-jwt");

export const api = {
  get: async (url, params = {}) =>
    axios.get(baseUrl + "" + url, {
      headers: {
        "x-auth-token": token, //add here to search token in localstorage if user rememberMe: Cookies.get("token")
        authorization: token,
      },
      ...params,
    }),
  post: (url, data) =>
    axios.post(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
        authorization: token,
      },
    }),
  patch: (url, data) =>
    axios.patch(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
        authorization: token,
      },
    }),
  put: (url, data) =>
    axios.put(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
        authorization: token,
      },
    }),
  delete: (url, data) =>
    axios.delete(baseUrl + "" + url, {
      headers: {
        "x-auth-token": token,
        authorization: token,
      },
      data,
    }),
};
