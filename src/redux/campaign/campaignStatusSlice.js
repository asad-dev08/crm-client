// src/redux/campaignStatusSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  CAMPAIGN_STATUS_CONTROLLER,
  PAGINATION_API,
} from "../../util/actionTypes";

export const getCampaignStatussWithPagination = createAsyncThunk(
  "campaignStatus/getCampaignStatussWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_STATUS_CONTROLLER}/${PAGINATION_API}`,
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
export const saveCampaignStatus = createAsyncThunk(
  "campaignStatus/saveCampaignStatus",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_STATUS_CONTROLLER}`,
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
export const updateCampaignStatus = createAsyncThunk(
  "campaignStatus/updateCampaignStatus",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${CAMPAIGN_STATUS_CONTROLLER}/${obj.id}`,
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

export const getCampaignStatuss = createAsyncThunk(
  "campaignStatus/getCampaignStatuss",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_STATUS_CONTROLLER}`,

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
export const getCampaignStatus = createAsyncThunk(
  "campaignStatus/getCampaignStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_STATUS_CONTROLLER}/${id}`,

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
export const deleteCampaignStatus = createAsyncThunk(
  "campaignStatus/deleteCampaignStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${CAMPAIGN_STATUS_CONTROLLER}/${id}`,
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
const campaignStatusSlice = createSlice({
  name: "campaignStatus",
  initialState: {
    campaignStatuss: [],
    campaignStatussComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaignStatussWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignStatussWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaignStatuss = action.payload.data;
        state.campaignStatussComboList =
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
      .addCase(getCampaignStatussWithPagination.rejected, (state, action) => {
        state.campaignStatuss = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCampaignStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCampaignStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCampaignStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCampaignStatuss.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignStatuss.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaignStatuss = data;
        state.campaignStatussComboList =
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
      .addCase(getCampaignStatuss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = campaignStatusSlice.actions;
export default campaignStatusSlice.reducer;
