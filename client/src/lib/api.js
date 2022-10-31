import axios from "axios";
//import Cookies from "js-cookie";
import { getToken } from "../helpers/index";

export const url = process.env.REACT_APP_API_URL || "localhost:4000";
export const token = getToken("feathers-jwt");

const baseUrl = `http://${url}`;
export const api = {
  get: async (url, params = {}) =>
    axios.get(url?.includes("https") ? url : baseUrl + "" + url, {
      headers: {
        "x-auth-token": token, //add here to search token in localstorage if user rememberMe: Cookies.get("token")
        authorization: token || token === null ? getToken("feathers-jwt") : null,
      },
      ...params,
    }),
  post: (url, data) =>
    axios.post(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
        authorization: token || token === null ? getToken("feathers-jwt") : null,
      },
    }),
  patch: (url, data) =>
    axios.patch(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
        authorization: token || token === null ? getToken("feathers-jwt") : null,
      },
    }),
  put: (url, data) =>
    axios.put(baseUrl + "" + url, data, {
      headers: {
        "x-auth-token": token,
        authorization: token || token === null ? getToken("feathers-jwt") : null,
      },
    }),
  delete: (url, data) =>
    axios.delete(baseUrl + "" + url, {
      headers: {
        "x-auth-token": token,
        authorization: token || token === null ? getToken("feathers-jwt") : null,
      },
      data,
    }),
};
