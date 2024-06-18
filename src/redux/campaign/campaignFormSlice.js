// src/redux/campaignFormSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  CAMPAIGN_FORM_CONTROLLER,
  CAMPAIGN_FORM_SUBMISSION_API,
  PAGINATION_API,
} from "../../util/actionTypes";

export const getCampaignFormsWithPagination = createAsyncThunk(
  "campaignForm/getCampaignFormsWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_FORM_CONTROLLER}/${PAGINATION_API}`,
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
export const saveCampaignForm = createAsyncThunk(
  "campaignForm/saveCampaignForm",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_FORM_CONTROLLER}`,
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
export const saveCampaignFormSubmissionData = createAsyncThunk(
  "campaignForm/saveCampaignForm",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${CAMPAIGN_FORM_CONTROLLER}/${CAMPAIGN_FORM_SUBMISSION_API}`,
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
export const updateCampaignForm = createAsyncThunk(
  "campaignForm/updateCampaignForm",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${CAMPAIGN_FORM_CONTROLLER}/${obj.id}`,
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

export const getCampaignForms = createAsyncThunk(
  "campaignForm/getCampaignForms",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_FORM_CONTROLLER}`,

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
export const getCampaignForm = createAsyncThunk(
  "campaignForm/getCampaignForm",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${CAMPAIGN_FORM_CONTROLLER}/${id}`,

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
export const deleteCampaignForm = createAsyncThunk(
  "campaignForm/deleteCampaignForm",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${CAMPAIGN_FORM_CONTROLLER}/${id}`,
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
const campaignFormSlice = createSlice({
  name: "campaignForm",
  initialState: {
    campaignForms: [],
    campaignFormsComboList: [],
    campaignForm: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaignFormsWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignFormsWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaignForms = action.payload.data;
        state.campaignFormsComboList =
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
      .addCase(getCampaignFormsWithPagination.rejected, (state, action) => {
        state.campaignForms = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveCampaignForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCampaignForm.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCampaignForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCampaignForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignForms.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaignForms = data;
        state.campaignFormsComboList =
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
      .addCase(getCampaignForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCampaignForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampaignForm.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.campaignForm = data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCampaignForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = campaignFormSlice.actions;
export default campaignFormSlice.reducer;
