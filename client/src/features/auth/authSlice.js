import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import jwtDecode from "jwt-decode";
import { saveToken, deleteToken } from "../../helpers/index";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({ url: "/auth", method: "POST", body: credentials }),
    }),
    register: builder.mutation({
      query: (credentials) => ({ url: "/user", method: "POST", body: credentials }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({ url: "/user/forgotPassword", method: "POST", body: credentials }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: `/user/resetPassword/${credentials.idUser}/${credentials.resetPasswordKey}`,
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/user/verify/${data.id}/${data.activationKey}`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useResetPasswordMutation, useVerifyEmailMutation } =
  authApiSlice;

const initialState = {
  data: null,
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logged: (state, action) => {
      state.data = action.payload.data.token;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      saveToken(action.payload.data.token);
    },
    setUser: (state, action) => {
      state.token = action.payload;
      state.user = jwtDecode(action.payload);
      state.data = action.payload;
      saveToken(action.payload);
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.data = null;
      deleteToken();
    },
  },
});

export const { logged, setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth;
export const logout = () => (dispatch) => dispatch(authSlice.actions.logOut());
