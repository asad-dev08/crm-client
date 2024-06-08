// src/redux/taxRateSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import { TAX_RATE_CONTROLLER, PAGINATION_API } from "../../util/actionTypes";

export const getTaxRatesWithPagination = createAsyncThunk(
  "taxRate/getTaxRatesWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${TAX_RATE_CONTROLLER}/${PAGINATION_API}`,
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
export const saveTaxRate = createAsyncThunk(
  "taxRate/saveTaxRate",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${TAX_RATE_CONTROLLER}`,
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
export const updateTaxRate = createAsyncThunk(
  "taxRate/updateTaxRate",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${TAX_RATE_CONTROLLER}/${obj.id}`,
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

export const getTaxRates = createAsyncThunk(
  "taxRate/getTaxRates",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${TAX_RATE_CONTROLLER}`,

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
export const getTaxRate = createAsyncThunk(
  "taxRate/getTaxRate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${TAX_RATE_CONTROLLER}/${id}`,

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
export const deleteTaxRate = createAsyncThunk(
  "taxRate/deleteTaxRate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${TAX_RATE_CONTROLLER}/${id}`,
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
const taxRateSlice = createSlice({
  name: "taxRate",
  initialState: {
    taxRates: [],
    taxRatesComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaxRatesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaxRatesWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.taxRates = action.payload.data;
        state.taxRatesComboList =
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
      .addCase(getTaxRatesWithPagination.rejected, (state, action) => {
        state.taxRates = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveTaxRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTaxRate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveTaxRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTaxRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaxRates.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.taxRates = data;
        state.taxRatesComboList =
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
      .addCase(getTaxRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = taxRateSlice.actions;
export default taxRateSlice.reducer;
