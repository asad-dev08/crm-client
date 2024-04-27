// src/redux/userSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  USER_CONTROLLER,
  USER_PAGINATION_CONTROLLER,
} from "../../util/actionTypes";

export const getUsersWithPagination = createAsyncThunk(
  "user/getUsersWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${USER_PAGINATION_CONTROLLER}`,
        obj,
        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Date Fetching failed");
      }

      const data = await response;

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);
export const saveUser = createAsyncThunk(
  "user/saveUser",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${USER_CONTROLLER}`,
        obj,
        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Date Fetching failed");
      }

      const data = await response;

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${USER_CONTROLLER}/${obj.id}`,
        obj,
        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Date Fetching failed");
      }

      const data = await response;

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${USER_CONTROLLER}`,

        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Date Fetching failed");
      }

      const data = await response;

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);
export const getUser = createAsyncThunk(
  "user/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${USER_CONTROLLER}/${id}`,

        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Date Fetching failed");
      }

      const data = await response;

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${USER_CONTROLLER}/${id}`,
        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Date Fetching failed");
      }

      const data = await response;

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersWithPagination.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUsersWithPagination.rejected, (state, action) => {
        state.users = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.users =
          data &&
          data.length > 0 &&
          data.map((x) => {
            return {
              label: x.name,
              value: x.id,
            };
          });
        state.loading = false;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
