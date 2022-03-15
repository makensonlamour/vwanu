import * as action from "./api";
import env from "../config";
import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { saveToken, deleteToken } from "../middleware/api";

const url = env.endpoints;
//const { EXPECTED_HEADER } = env;

const initialState = {
  loading: false,
  data: null,
  lastFetch: null,
  token: null,
  error: null,
};

export const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequested: (state) => {
      state.loading = true;
    },
    loginSucceed: (state, action) => {
      state.loading = false;
      state.token = action.payload.data.token;
      saveToken(action.payload.data.token);
      //state.data = action.payload.data.user;
      state.data = jwtDecode(action.payload.data.token);
      state.lastFetch = Date.now;
    },

    LoginFailed: (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.payload;
      state.data = null;
      deleteToken();
    },
    setUser: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      saveToken(action.payload);
      state.data = jwtDecode(action.payload);
    },
    LogOut: (state) => {
      state.loading = false;
      state.token = null;
      state.data = null;
      state.error = null;
      deleteToken();
      window.location.replace("/login");
    },
  },
});

export const Login = (credentials) => (dispatch, getState) => {
  const { data, loading } = getState();
  if (data != null || loading) return;
  dispatch(
    action.apiCallBegan({
      url: url.LOGIN,
      data: credentials,
      method: "POST",
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};

export const createUser = (newUserData) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: url.REGISTER,
      data: newUserData,
      method: "POST",
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};

export const forgotPassword = (userData) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: url.FORGOT_PASSWORD,
      data: userData,
      method: "POST",
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};

export const resetPassword = (newUserData) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: url.RESET_PASSWORD,
      data: newUserData,
      method: "POST",
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};

export const verifiedEmail = (data) => (dispatch) => {
  dispatch(
    action.apiCallBegan({
      url: `user/verify/${data.id}/${data.activationKey}`,
      data: data,
      method: "POST",
      onSuccess: Auth.actions.loginSucceed.type,
      onStart: Auth.actions.loginRequested.type,
      onError: Auth.actions.LoginFailed.type,
    })
  );
};

export const { setUser } = Auth.actions;
export const logout = () => (dispatch) => dispatch(Auth.actions.LogOut());
export const getCurrentUser = (state) => state.authentication;
export const logged = Auth.actions.loginSucceed.type;
export default Auth.reducer;
