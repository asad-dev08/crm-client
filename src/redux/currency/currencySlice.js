// src/redux/currencySlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import { CURRENCY_CONTROLLER, PAGINATION_API } from "../../util/actionTypes";

export const getCurrencysWithPagination = createAsyncThunk(
  "currency/getCurrencysWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CURRENCY_CONTROLLER}/${PAGINATION_API}`,
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
export const saveCurrency = createAsyncThunk(
  "currency/saveCurrency",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CURRENCY_CONTROLLER}`,
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
export const updateCurrency = createAsyncThunk(
  "currency/updateCurrency",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${CURRENCY_CONTROLLER}/${obj.id}`,
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

export const getCurrencys = createAsyncThunk(
  "currency/getCurrencys",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CURRENCY_CONTROLLER}`,

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
export const getCurrency = createAsyncThunk(
  "currency/getCurrency",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CURRENCY_CONTROLLER}/${id}`,

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
export const deleteCurrency = createAsyncThunk(
  "currency/deleteCurrency",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${CURRENCY_CONTROLLER}/${id}`,
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
const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencys: [],
    currencysComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencysWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrencysWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.currencys = action.payload.data;
        state.currencysComboList =
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
      .addCase(getCurrencysWithPagination.rejected, (state, action) => {
        state.currencys = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrencys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrencys.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.currencys = data;
        state.currencysComboList =
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
      .addCase(getCurrencys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = currencySlice.actions;
export default currencySlice.reducer;
