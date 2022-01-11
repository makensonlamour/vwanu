import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";
import api from "../middleware/api";
import alerts from "../middleware/alerts";

export const store = configureStore({
  reducer,
  middleware: [thunkMiddleware, api, alerts],
});
