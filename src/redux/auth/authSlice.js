// src/redux/authSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  AUTH_CONTROLLER,
  VERIFY_LOGIN_API,
  VERIFY_TOKEN_API,
} from "../../util/actionTypes";
import jwtService from "../../jwtService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${AUTH_CONTROLLER}/${VERIFY_LOGIN_API}`,
        credentials,
        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Login failed");
      }

      const data = await response.data;
      if (data) {
        jwtService.setSession(data && data.data.token);
        jwtService.setUserData(data && data.data.user);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${AUTH_CONTROLLER}/${VERIFY_LOGIN_API}/${VERIFY_TOKEN_API}`,
        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("User not verified");
      }

      const data = await response.data;
      if (data) {
        jwtService.setSession(data && data.data.token);
        jwtService.setUserData(data && data.data.user);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (credentials, { rejectWithValue }) => {
    try {
      jwtService.setSession(null);
      jwtService.removeUserData();

      return true;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    menus: [],
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setIsAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.menus = action.payload.menus;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.menus = [];
        state.token = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.menus = action.payload.menus;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.menus = [];
        state.token = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.menus = [];
        state.token = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.menus = [];
        state.token = null;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setIsAuthentication } = authSlice.actions;
export default authSlice.reducer;
