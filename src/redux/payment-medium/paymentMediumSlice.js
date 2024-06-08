// src/redux/paymentMediumSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  PAYMENT_MEDIUM_CONTROLLER,
  PAGINATION_API,
} from "../../util/actionTypes";

export const getPaymentMediumsWithPagination = createAsyncThunk(
  "paymentMedium/getPaymentMediumsWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${PAYMENT_MEDIUM_CONTROLLER}/${PAGINATION_API}`,
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
export const savePaymentMedium = createAsyncThunk(
  "paymentMedium/savePaymentMedium",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${PAYMENT_MEDIUM_CONTROLLER}`,
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
export const updatePaymentMedium = createAsyncThunk(
  "paymentMedium/updatePaymentMedium",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${PAYMENT_MEDIUM_CONTROLLER}/${obj.id}`,
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

export const getPaymentMediums = createAsyncThunk(
  "paymentMedium/getPaymentMediums",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${PAYMENT_MEDIUM_CONTROLLER}`,

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
export const getPaymentMedium = createAsyncThunk(
  "paymentMedium/getPaymentMedium",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${PAYMENT_MEDIUM_CONTROLLER}/${id}`,

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
export const deletePaymentMedium = createAsyncThunk(
  "paymentMedium/deletePaymentMedium",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${PAYMENT_MEDIUM_CONTROLLER}/${id}`,
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
const paymentMediumSlice = createSlice({
  name: "paymentMedium",
  initialState: {
    paymentMediums: [],
    paymentMediumsComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMediumsWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentMediumsWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.paymentMediums = action.payload.data;
        state.paymentMediumsComboList =
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
      .addCase(getPaymentMediumsWithPagination.rejected, (state, action) => {
        state.paymentMediums = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(savePaymentMedium.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePaymentMedium.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(savePaymentMedium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPaymentMediums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentMediums.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.paymentMediums = data;
        state.paymentMediumsComboList =
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
      .addCase(getPaymentMediums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = paymentMediumSlice.actions;
export default paymentMediumSlice.reducer;
