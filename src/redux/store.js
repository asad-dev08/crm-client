// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import loadingReducer from "./loader/loadingSlice";
import userReducer from "./user/userSlice";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    loading: loadingReducer,
    user: userReducer,
  },
});
export default store;
