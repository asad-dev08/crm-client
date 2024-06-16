// src/redux/campaignAudienceSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  CAMPAIGN_AUDIENCE_CONTROLLER,
  PAGINATION_API,
} from "../../util/actionTypes";

export const getCampaignAudiencesWithPagination = createAsyncThunk(
  "campaignAudience/getCampaignAudiencesWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_AUDIENCE_CONTROLLER}/${PAGINATION_API}`,
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
export const saveCampaignAudience = createAsyncThunk(
  "campaignAudience/saveCampaignAudience",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_AUDIENCE_CONTROLLER}`,
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
export const updateCampaignAudience = createAsyncThunk(
  "campaignAudience/updateCampaignAudience",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${CAMPAIGN_AUDIENCE_CONTROLLER}/${obj.id}`,
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

export const getCampaignAudiences = createAsyncThunk(
  "campaignAudience/getCampaignAudiences",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_AUDIENCE_CONTROLLER}`,

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
export const getCampaignAudience = createAsyncThunk(
  "campaignAudience/getCampaignAudience",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_AUDIENCE_CONTROLLER}/${id}`,

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
export const deleteCampaignAudience = createAsyncThunk(
  "campaignAudience/deleteCampaignAudience",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${CAMPAIGN_AUDIENCE_CONTROLLER}/${id}`,
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
const campaignAudienceSlice = createSlice({
  name: "campaignAudience",
  initialState: {
    campaignAudiences: [],
    campaignAudiencesComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaignAudiencesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCampaignAudiencesWithPagination.fulfilled,
        (state, action) => {
          const data = action.payload.data;
          state.campaignAudiences = action.payload.data;
          state.campaignAudiencesComboList =
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
        }
      )
      .addCase(getCampaignAudiencesWithPagination.rejected, (state, action) => {
        state.campaignAudiences = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCampaignAudience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCampaignAudience.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCampaignAudience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCampaignAudiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignAudiences.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaignAudiences = data;
        state.campaignAudiencesComboList =
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
      .addCase(getCampaignAudiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = campaignAudienceSlice.actions;
export default campaignAudienceSlice.reducer;
