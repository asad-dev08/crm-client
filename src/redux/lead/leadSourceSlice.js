// src/redux/leadSourceSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import { LEAD_SOURCE_CONTROLLER, PAGINATION_API } from "../../util/actionTypes";

export const getLeadSourcesWithPagination = createAsyncThunk(
  "leadSource/getLeadSourcesWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${LEAD_SOURCE_CONTROLLER}/${PAGINATION_API}`,
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
export const saveLeadSource = createAsyncThunk(
  "leadSource/saveLeadSource",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${LEAD_SOURCE_CONTROLLER}`,
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
export const updateLeadSource = createAsyncThunk(
  "leadSource/updateLeadSource",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${LEAD_SOURCE_CONTROLLER}/${obj.id}`,
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

export const getLeadSources = createAsyncThunk(
  "leadSource/getLeadSources",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${LEAD_SOURCE_CONTROLLER}`,

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
export const getLeadSource = createAsyncThunk(
  "leadSource/getLeadSource",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${LEAD_SOURCE_CONTROLLER}/${id}`,

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
export const deleteLeadSource = createAsyncThunk(
  "leadSource/deleteLeadSource",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${LEAD_SOURCE_CONTROLLER}/${id}`,
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
const leadSourceSlice = createSlice({
  name: "leadSource",
  initialState: {
    leadSources: [],
    leadSourcesComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadSourcesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadSourcesWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.leadSources = action.payload.data;
        state.leadSourcesComboList =
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
      .addCase(getLeadSourcesWithPagination.rejected, (state, action) => {
        state.leadSources = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveLeadSource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveLeadSource.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveLeadSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLeadSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadSources.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.leadSources = data;
        state.leadSourcesComboList =
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
      .addCase(getLeadSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = leadSourceSlice.actions;
export default leadSourceSlice.reducer;
