import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:4000/api",
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = (getState().auth.token || "").trim();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },

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
      query: (credentials) => ({ url: "/user/resetPassword", method: "POST", body: credentials }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/user/verify/${data.id}/${data.activationKey}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useResetPasswordMutation, useVerifyEmailMutation } =
  apiSlice;
