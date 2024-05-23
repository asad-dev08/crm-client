// src/redux/eventCalendarSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  EVENT_CALENDAR_CONTROLLER,
  PAGINATION_API,
} from "../../util/actionTypes";
import moment from "moment";

export const getEventCalendarsWithPagination = createAsyncThunk(
  "eventCalendar/getEventCalendarsWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${EVENT_CALENDAR_CONTROLLER}/${PAGINATION_API}`,
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
export const saveEventCalendar = createAsyncThunk(
  "eventCalendar/saveEventCalendar",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${EVENT_CALENDAR_CONTROLLER}`,
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
export const updateEventCalendar = createAsyncThunk(
  "eventCalendar/updateEventCalendar",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${EVENT_CALENDAR_CONTROLLER}/${obj.id}`,
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

export const getEventCalendars = createAsyncThunk(
  "eventCalendar/getEventCalendars",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${EVENT_CALENDAR_CONTROLLER}`,

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
export const getEventCalendar = createAsyncThunk(
  "eventCalendar/getEventCalendar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${EVENT_CALENDAR_CONTROLLER}/${id}`,

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
export const deleteEventCalendar = createAsyncThunk(
  "eventCalendar/deleteEventCalendar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${EVENT_CALENDAR_CONTROLLER}/${id}`,
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
const eventCalendarSlice = createSlice({
  name: "eventCalendar",
  initialState: {
    eventCalendars: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventCalendarsWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventCalendarsWithPagination.fulfilled, (state, action) => {
        state.eventCalendars = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getEventCalendarsWithPagination.rejected, (state, action) => {
        state.eventCalendars = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveEventCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveEventCalendar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveEventCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEventCalendars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventCalendars.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.eventCalendars = data;

        state.loading = false;
        state.error = null;
      })
      .addCase(getEventCalendars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = eventCalendarSlice.actions;
export default eventCalendarSlice.reducer;
