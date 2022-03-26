import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (credentials) => `/post?UserId=${credentials?.UserId}&size=${credentials?.pageSize}&page=${credentials?.pageNumber}`,
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (credentials) => ({ url: `/post?UserId=${credentials?.UserId}`, method: "POST", body: credentials }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = postApiSlice;

const initialState = {
  post: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload.data.post;
    },
  },
});

export const { setPost } = postSlice.actions;

export default postSlice.reducer;
