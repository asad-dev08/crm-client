// src/redux/themeSlice.js

import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    currentTheme: {
      colorPrimary: "#000000"
    },
  },
  reducers: {
    setCurrentTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setCurrentTheme } = themeSlice.actions;
export default themeSlice.reducer;
