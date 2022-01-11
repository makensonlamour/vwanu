import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  list: [],
};
const Alert = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.list.push(action.payload);
    },
    removeAlert: (state, action) => {
      const firstIndex = state.list.findIndex(
        (alert) => alert.id === action.payload
      );

      state.list.splice(firstIndex, 1);
    },
  },
});

export default Alert.reducer;
export const { removeAlert, setAlert } = Alert.actions;
export const getAlerts = (state) => state.alerts;
