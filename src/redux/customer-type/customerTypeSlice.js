// src/redux/customerTypeSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  CUSTOMER_TYPE_CONTROLLER,
  PAGINATION_API,
} from "../../util/actionTypes";

export const getCustomerTypesWithPagination = createAsyncThunk(
  "customerType/getCustomerTypesWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CUSTOMER_TYPE_CONTROLLER}/${PAGINATION_API}`,
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
export const saveCustomerType = createAsyncThunk(
  "customerType/saveCustomerType",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CUSTOMER_TYPE_CONTROLLER}`,
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
export const updateCustomerType = createAsyncThunk(
  "customerType/updateCustomerType",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${CUSTOMER_TYPE_CONTROLLER}/${obj.id}`,
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

export const getCustomerTypes = createAsyncThunk(
  "customerType/getCustomerTypes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CUSTOMER_TYPE_CONTROLLER}`,

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
export const getCustomerType = createAsyncThunk(
  "customerType/getCustomerType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CUSTOMER_TYPE_CONTROLLER}/${id}`,

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
export const deleteCustomerType = createAsyncThunk(
  "customerType/deleteCustomerType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${CUSTOMER_TYPE_CONTROLLER}/${id}`,
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
const customerTypeSlice = createSlice({
  name: "customerType",
  initialState: {
    customerTypes: [],
    customerTypesComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerTypesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerTypesWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.customerTypes = action.payload.data;
        state.customerTypesComboList =
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
      .addCase(getCustomerTypesWithPagination.rejected, (state, action) => {
        state.customerTypes = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCustomerType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCustomerType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCustomerType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCustomerTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomerTypes.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.customerTypes = data;
        state.customerTypesComboList =
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
      .addCase(getCustomerTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = customerTypeSlice.actions;
export default customerTypeSlice.reducer;
