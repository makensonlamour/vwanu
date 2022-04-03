import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import _ from "lodash";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (credentials) => `/post?UserId=${credentials?.UserId}&size=${credentials?.pageSize}&page=${credentials?.pageNumber}`,
      keepUnusedDataFor: 10,
      providesTags: ["Post", "Comment"],
    }),

    getPostById: builder.query({
      query: (credentials) => `/post/${credentials?.postId}`,
      providesTags: ["Post", "Comment"],
    }),

    createPost: builder.mutation({
      query: (credentials) => ({
        url: `/post?UserId=${credentials?.UserId}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Post", "Comment"],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, usePrefetch, useGetPostQueryState, useCreatePostMutation } = postApiSlice;

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setPost: (state, action) => {
      console.log(action.payload);
      console.log(state.list);
      state.list = _.unionWith(state.list, action.payload, function (a, b) {
        return a.id === b.id;
      });
    },

    selectPost: (state) => {
      state.posts = apiSlice.endpoints.getPosts.select()(state).currentData;
      console.log(state.list);
    },
  },
});

export const { setPost, selectPost } = postSlice.actions;

export default postSlice.reducer;
