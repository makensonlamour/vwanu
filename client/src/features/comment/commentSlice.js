import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import _ from "lodash";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (credentials) => `/comment?UserId=${credentials?.UserId}&page=${credentials.pageNumber}&size=${credentials.pageSize}`,
      keepUnusedDataFor: 10,
      providesTags: ["Post", "Comment"],
    }),

    getCommentById: builder.query({
      query: (credentials) => `/comment/${credentials?.postId}`,
      providesTags: ["Post", "Comment"],
    }),

    createComment: builder.mutation({
      query: (credentials) => ({
        url: `/comment`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Post", "Comment"],
    }),

    editComment: builder.mutation({
      query: (credentials) => ({
        url: `/comment/${credentials.id}`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Post", "Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentByIdQuery,
  usePrefetch,
  useGetCommentQueryState,
  useCreateCommentMutation,
  useEditCommentMutation,
} = commentApiSlice;

const initialState = {
  posts: [],
};

export const commentSlice = createSlice({
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
  },
});

export const { setComment } = commentSlice.actions;

export default commentSlice.reducer;
