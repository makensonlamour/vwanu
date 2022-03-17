import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const authSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.list.push(action.payload);
    },
    removeAlert: (state, action) => {
      const firstIndex = state.list.findIndex((alert) => alert.id === action.payload);

      state.list.splice(firstIndex, 1);
    },
  },
});

export default authSlice.reducer;
export const { removeAlert, setAlert } = authSlice.actions;
export const getAlerts = (state) => state.alert;
