// src/redux/companySlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import { COMPANY_CONTROLLER, PAGINATION_API } from "../../util/actionTypes";

export const getCompanysWithPagination = createAsyncThunk(
  "company/getCompanysWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${COMPANY_CONTROLLER}/${PAGINATION_API}`,
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
export const saveCompany = createAsyncThunk(
  "company/saveCompany",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${COMPANY_CONTROLLER}`,
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
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${COMPANY_CONTROLLER}/${obj.id}`,
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

export const getCompanys = createAsyncThunk(
  "company/getCompanys",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${COMPANY_CONTROLLER}`,

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
export const getCompany = createAsyncThunk(
  "company/getCompany",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${COMPANY_CONTROLLER}/${id}`,

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
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${COMPANY_CONTROLLER}/${id}`,
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
const companySlice = createSlice({
  name: "company",
  initialState: {
    companys: [],
    companyForComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanysWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanysWithPagination.fulfilled, (state, action) => {
        state.companys = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCompanysWithPagination.rejected, (state, action) => {
        state.companys = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCompanys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanys.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.companys = data;
        state.companyForComboList =
          data &&
          data.length > 0 &&
          data.map((x) => {
            return {
              label: x.company_name,
              value: x.id,
            };
          });
        state.loading = false;
        state.error = null;
      })
      .addCase(getCompanys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = companySlice.actions;
export default companySlice.reducer;
