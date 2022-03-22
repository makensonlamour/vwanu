import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";
import userReducer from "../features/user/userSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
