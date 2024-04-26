// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import loadingReducer from "./loader/loadingSlice";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    loading: loadingReducer,
  },
});
export default store;
