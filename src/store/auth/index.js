import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../api/auth";
import isLocalStorageAvailable from "../../utils/isLocalStorageAvailable";

const getAuthState = (state) => state.auth;

const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  const response = await authApi.login(email, password);
  if (isLocalStorageAvailable())
    localStorage.setItem("token", response.data.token);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isAuth: false,
    token: null,
    status: "fetchingFromLocalStore", // "loggingIn" | "loggingOut" | "sessionExpired"
    error: null,
    ui: {
      login: {},
    },
  },

  reducers: {
    persistLogin: (state) => {
      if (isLocalStorageAvailable()) {
        const token = localStorage.getItem("token");
        if (token) {
          state.isAuth = true;
          state.token = token;
        }
        state.status = "idle";
      }
    },
    logout: (state) => {
      if (isLocalStorageAvailable()) {
        localStorage.removeItem("token");
      }
      state.isAuth = false;
      state.token = null;
    },
  },

  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loggingIn";
      state.ui.login.loading = true;
    },

    [login.fulfilled]: (state, action) => {
      state.status = "idle";
      state.isAuth = true;
      state.token = action.payload.token;
      state.ui.login.loading = false;
    },

    [login.rejected]: (state, action) => {
      state.status = "idle";
      state.error = action.error.message;
      state.ui.login.loading = false;
    },
  },
});

const { persistLogin, logout } = authSlice.actions;

export default authSlice.reducer;

export { persistLogin, login, logout, getAuthState };
