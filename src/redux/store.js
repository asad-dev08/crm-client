// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import loadingReducer from "./loader/loadingSlice";
import userReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";
import menuReducer from "./menu/menuSlice";
import securityRuleReducer from "./security-rule/securityRuleSlice";
import securityGroupReducer from "./security-group/securityGroupSlice";
import companyReducer from "./company/companySlice";
import eventCalendarReducer from "./event-calendar/eventCalendarSlice";
import taskManagementReducer from "./task-management/taskManagementSlice";
import emailTemplateReducer from "./email-template/emailTemplateSlice";
import leadSourceReducer from "./lead/leadSourceSlice";
import leadStatusReducer from "./lead/leadStatusSlice";
import leadReducer from "./lead/leadSlice";
import customerTypeReducer from "./customer-type/customerTypeSlice";
import currencyReducer from "./currency/currencySlice";
import customerReducer from "./customer/customerSlice";

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
    company: companyReducer,
    eventCalendar: eventCalendarReducer,
    taskManagement: taskManagementReducer,
    emailTemplate: emailTemplateReducer,
    leadSource: leadSourceReducer,
    leadStatus: leadStatusReducer,
    lead: leadReducer,
    leadSource: leadSourceReducer,
    leadStatus: leadStatusReducer,
    lead: leadReducer,

    customerType: customerTypeReducer,
    currency: currencyReducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
