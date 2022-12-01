import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isEmpty from "../../utils/is-empty";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
  },
  reducers: {
    loginUser: (state, action) => {
      const data = action.payload.data;
      AsyncStorage.setItem("jwt", data.token);
      const decoded = jwt_decode(data.token);
      state.currentUser = {
        isAuthenticated: !isEmpty(decoded),
        user: decoded,
        userEmail: data.user,
      };
    },
    logoutUser: (state) => {
      state.currentUser = {};
      AsyncStorage.removeItem("jwt");
    },
  },
});

export const loginUser = authSlice.actions.loginUser;
export const logoutUser = authSlice.actions.logoutUser;

export default authSlice.reducer;
