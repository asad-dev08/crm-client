// src/redux/leadStatusSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import { LEAD_STATUS_CONTROLLER, PAGINATION_API } from "../../util/actionTypes";

export const getLeadStatussWithPagination = createAsyncThunk(
  "leadStatus/getLeadStatussWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${LEAD_STATUS_CONTROLLER}/${PAGINATION_API}`,
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
export const saveLeadStatus = createAsyncThunk(
  "leadStatus/saveLeadStatus",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${LEAD_STATUS_CONTROLLER}`,
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
export const updateLeadStatus = createAsyncThunk(
  "leadStatus/updateLeadStatus",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${LEAD_STATUS_CONTROLLER}/${obj.id}`,
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

export const getLeadStatuss = createAsyncThunk(
  "leadStatus/getLeadStatuss",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${LEAD_STATUS_CONTROLLER}`,

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
export const getLeadStatus = createAsyncThunk(
  "leadStatus/getLeadStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${LEAD_STATUS_CONTROLLER}/${id}`,

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
export const deleteLeadStatus = createAsyncThunk(
  "leadStatus/deleteLeadStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${LEAD_STATUS_CONTROLLER}/${id}`,
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
const leadStatusSlice = createSlice({
  name: "leadStatus",
  initialState: {
    leadStatuss: [],
    leadStatussComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadStatussWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadStatussWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.leadStatuss = action.payload.data;
        state.leadStatussComboList =
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
      .addCase(getLeadStatussWithPagination.rejected, (state, action) => {
        state.leadStatuss = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveLeadStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveLeadStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveLeadStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLeadStatuss.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeadStatuss.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.leadStatuss = data;
        state.leadStatussComboList =
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
      .addCase(getLeadStatuss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = leadStatusSlice.actions;
export default leadStatusSlice.reducer;
