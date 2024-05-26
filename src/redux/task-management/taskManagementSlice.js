// src/redux/taskManagementSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  TASK_MANAGEMENT_CONTROLLER,
  PAGINATION_API,
  BOARD_API,
  TASK_API,
  TASK_BY_BOARD_API,
} from "../../util/actionTypes";

export const getBoardsWithPagination = createAsyncThunk(
  "taskManagement/getBoardsWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${TASK_MANAGEMENT_CONTROLLER}/${PAGINATION_API}`,
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
export const saveBoard = createAsyncThunk(
  "taskManagement/saveBoard",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${TASK_MANAGEMENT_CONTROLLER}/${BOARD_API}`,
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
export const updateBoard = createAsyncThunk(
  "taskManagement/updateBoard",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${TASK_MANAGEMENT_CONTROLLER}/${BOARD_API}/${obj.id}`,
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

export const getBoards = createAsyncThunk(
  "taskManagement/getBoards",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${TASK_MANAGEMENT_CONTROLLER}/${BOARD_API}`,

        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Date Fetching failed");
      }

      const data = await response;

      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);
export const getBoard = createAsyncThunk(
  "taskManagement/getBoard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${TASK_MANAGEMENT_CONTROLLER}/${BOARD_API}/${id}`,

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
export const deleteBoard = createAsyncThunk(
  "taskManagement/deleteBoard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${TASK_MANAGEMENT_CONTROLLER}/${BOARD_API}/${id}`,
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

// for task

export const getTaskByBoard = createAsyncThunk(
  "taskManagement/getTaskByBoard",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${TASK_MANAGEMENT_CONTROLLER}/${TASK_BY_BOARD_API}`,
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
export const saveTask = createAsyncThunk(
  "taskManagement/saveTask",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${TASK_MANAGEMENT_CONTROLLER}/${TASK_API}`,
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
export const updateTask = createAsyncThunk(
  "taskManagement/updateTask",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${TASK_MANAGEMENT_CONTROLLER}/${TASK_API}/${obj.id}`,
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

export const getTasks = createAsyncThunk(
  "taskManagement/getTasks",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${TASK_MANAGEMENT_CONTROLLER}/${TASK_API}`,

        {}
      );

      if (!response) {
        // Handle non-successful responses
        throw new Error("Date Fetching failed");
      }

      const data = await response;

      return data.data || [];
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message to the rejectWithValue payload
    }
  }
);
export const getTask = createAsyncThunk(
  "taskManagement/getTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${TASK_MANAGEMENT_CONTROLLER}/${TASK_API}/${id}`,

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
export const deleteTask = createAsyncThunk(
  "taskManagement/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${TASK_MANAGEMENT_CONTROLLER}/${TASK_API}/${id}`,
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

const taskManagementSlice = createSlice({
  name: "taskManagement",
  initialState: {
    boards: [],
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoardsWithPagination.fulfilled, (state, action) => {
        state.boards = action.payload.data;
        state.loading = false;
        state.error = null;
      })
      .addCase(getBoardsWithPagination.rejected, (state, action) => {
        state.boards = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.boards = data;

        state.loading = false;
        state.error = null;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.tasks = data;

        state.loading = false;
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTaskByBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskByBoard.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.tasks = data;

        state.loading = false;
        state.error = null;
      })
      .addCase(getTaskByBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = taskManagementSlice.actions;
export default taskManagementSlice.reducer;
