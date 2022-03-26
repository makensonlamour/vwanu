import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useFetchUserQuery, useUpdateUserMutation, useUpdateProfilePictureMutation } = userApiSlice;

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.data.user;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user;
