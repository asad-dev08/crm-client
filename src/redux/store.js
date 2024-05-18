// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import loadingReducer from "./loader/loadingSlice";
import userReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";
import menuReducer from "./menu/menuSlice";
import securityRuleReducer from "./security-rule/securityRuleSlice";
import securityGroupReducer from "./security-group/securityGroupSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    loading: loadingReducer,
    user: userReducer,
    auth: authReducer,
    menu: menuReducer,
    securityRule: securityRuleReducer,
    securityGroup: securityGroupReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
