// src/redux/campaignSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import { CAMPAIGN_CONTROLLER, PAGINATION_API } from "../../util/actionTypes";

export const getCampaignsWithPagination = createAsyncThunk(
  "campaign/getCampaignsWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_CONTROLLER}/${PAGINATION_API}`,
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
export const saveCampaign = createAsyncThunk(
  "campaign/saveCampaign",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_CONTROLLER}`,
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
export const updateCampaign = createAsyncThunk(
  "campaign/updateCampaign",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${CAMPAIGN_CONTROLLER}/${obj.id}`,
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

export const getCampaigns = createAsyncThunk(
  "campaign/getCampaigns",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_CONTROLLER}`,

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
export const getCampaign = createAsyncThunk(
  "campaign/getCampaign",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_CONTROLLER}/${id}`,

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
export const deleteCampaign = createAsyncThunk(
  "campaign/deleteCampaign",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${CAMPAIGN_CONTROLLER}/${id}`,
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
const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: [],
    campaignsComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaignsWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignsWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaigns = action.payload.data;
        state.campaignsComboList =
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
      .addCase(getCampaignsWithPagination.rejected, (state, action) => {
        state.campaigns = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaigns = data;
        state.campaignsComboList =
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
      .addCase(getCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = campaignSlice.actions;
export default campaignSlice.reducer;
