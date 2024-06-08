// src/redux/expenseCategorySlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeApiCall } from "../../util/makeAPICall";
import {
  EXPENSE_CATEGORY_CONTROLLER,
  PAGINATION_API,
} from "../../util/actionTypes";

export const getExpenseCategorysWithPagination = createAsyncThunk(
  "expenseCategory/getExpenseCategorysWithPagination",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${EXPENSE_CATEGORY_CONTROLLER}/${PAGINATION_API}`,
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
export const saveExpenseCategory = createAsyncThunk(
  "expenseCategory/saveExpenseCategory",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "post",
        `/${EXPENSE_CATEGORY_CONTROLLER}`,
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
export const updateExpenseCategory = createAsyncThunk(
  "expenseCategory/updateExpenseCategory",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "put",
        `/${EXPENSE_CATEGORY_CONTROLLER}/${obj.id}`,
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

export const getExpenseCategorys = createAsyncThunk(
  "expenseCategory/getExpenseCategorys",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${EXPENSE_CATEGORY_CONTROLLER}`,

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
export const getExpenseCategory = createAsyncThunk(
  "expenseCategory/getExpenseCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "get",
        `/${EXPENSE_CATEGORY_CONTROLLER}/${id}`,

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
export const deleteExpenseCategory = createAsyncThunk(
  "expenseCategory/deleteExpenseCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApiCall(
        "delete",
        `/${EXPENSE_CATEGORY_CONTROLLER}/${id}`,
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
const expenseCategorySlice = createSlice({
  name: "expenseCategory",
  initialState: {
    expenseCategorys: [],
    expenseCategorysComboList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExpenseCategorysWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpenseCategorysWithPagination.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.expenseCategorys = action.payload.data;
        state.expenseCategorysComboList =
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
      .addCase(getExpenseCategorysWithPagination.rejected, (state, action) => {
        state.expenseCategorys = [];
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(saveExpenseCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveExpenseCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveExpenseCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getExpenseCategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpenseCategorys.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.expenseCategorys = data;
        state.expenseCategorysComboList =
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
      .addCase(getExpenseCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = expenseCategorySlice.actions;
export default expenseCategorySlice.reducer;
