// src/redux/campaignTypeSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  CAMPAIGN_TYPE_CONTROLLER,
  PAGINATION_API,
} from "../../util/actionTypes";

export const getCampaignTypesWithPagination = createAsyncThunk(
  "campaignType/getCampaignTypesWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_TYPE_CONTROLLER}/${PAGINATION_API}`,
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
export const saveCampaignType = createAsyncThunk(
  "campaignType/saveCampaignType",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_TYPE_CONTROLLER}`,
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
export const updateCampaignType = createAsyncThunk(
  "campaignType/updateCampaignType",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${CAMPAIGN_TYPE_CONTROLLER}/${obj.id}`,
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

export const getCampaignTypes = createAsyncThunk(
  "campaignType/getCampaignTypes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_TYPE_CONTROLLER}`,

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
export const getCampaignType = createAsyncThunk(
  "campaignType/getCampaignType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_TYPE_CONTROLLER}/${id}`,

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
export const deleteCampaignType = createAsyncThunk(
  "campaignType/deleteCampaignType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${CAMPAIGN_TYPE_CONTROLLER}/${id}`,
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
const campaignTypeSlice = createSlice({
  name: "campaignType",
  initialState: {
    campaignTypes: [],
    campaignTypesComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaignTypesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignTypesWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaignTypes = action.payload.data;
        state.campaignTypesComboList =
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
      .addCase(getCampaignTypesWithPagination.rejected, (state, action) => {
        state.campaignTypes = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCampaignType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCampaignType.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCampaignType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCampaignTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignTypes.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaignTypes = data;
        state.campaignTypesComboList =
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
      .addCase(getCampaignTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = campaignTypeSlice.actions;
export default campaignTypeSlice.reducer;
