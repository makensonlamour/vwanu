import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:4000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("x-auth-token", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Album", "Comment", "Post", "User"],

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
    fetchUser: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: `/user/${credentials.idUser}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfilePicture: builder.mutation({
      query: (credentials) => ({
        url: `/user/${credentials.idUser}`,
        method: "PUT",
        body: credentials.profilePicture,
      }),
      invalidatesTags: ["User"],
    }),
    getPosts: builder.query({
      query: () => `/post/`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useFetchUserQuery,
  useUpdateUserMutation,
  useUpdateProfilePictureMutation,
  useGetPostsQuery,
} = apiSlice;
