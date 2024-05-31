// src/redux/emailTemplateSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  EMAIL_TEMPLATE_CONTROLLER,
  PAGINATION_API,
} from "../../util/actionTypes";

export const getEmailTemplatesWithPagination = createAsyncThunk(
  "emailTemplate/getEmailTemplatesWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${EMAIL_TEMPLATE_CONTROLLER}/${PAGINATION_API}`,
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
export const saveEmailTemplate = createAsyncThunk(
  "emailTemplate/saveEmailTemplate",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${EMAIL_TEMPLATE_CONTROLLER}`,
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
export const updateEmailTemplate = createAsyncThunk(
  "emailTemplate/updateEmailTemplate",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${EMAIL_TEMPLATE_CONTROLLER}/${obj.id}`,
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

export const getEmailTemplates = createAsyncThunk(
  "emailTemplate/getEmailTemplates",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${EMAIL_TEMPLATE_CONTROLLER}`,

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
export const getEmailTemplate = createAsyncThunk(
  "emailTemplate/getEmailTemplate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${EMAIL_TEMPLATE_CONTROLLER}/${id}`,

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
export const deleteEmailTemplate = createAsyncThunk(
  "emailTemplate/deleteEmailTemplate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${EMAIL_TEMPLATE_CONTROLLER}/${id}`,
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
const emailTemplateSlice = createSlice({
  name: "emailTemplate",
  initialState: {
    emailTemplates: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmailTemplatesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmailTemplatesWithPagination.fulfilled, (state, action) => {
        state.emailTemplates = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getEmailTemplatesWithPagination.rejected, (state, action) => {
        state.emailTemplates = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveEmailTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveEmailTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveEmailTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEmailTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmailTemplates.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.emailTemplates =
          data &&
          data.length > 0 &&
          data.map((x) => {
            return {
              label: x.emailTemplatename,
              value: x.id,
            };
          });
        state.loading = false;
        state.error = null;
      })
      .addCase(getEmailTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = emailTemplateSlice.actions;
export default emailTemplateSlice.reducer;
