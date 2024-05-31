export const BASE_URL = "http://localhost:5000";
export const BASE_URLLive = "";

export const TaskPriorityList = [
  { label: "Urgent", value: "Urgent" },
  { label: "High", value: "High" },
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
];

export const EmailEventsTypeList = [
  { value: "1", label: "When new user creates" },
  { value: "2", label: "When new task assigned" },
  { value: "3", label: "Send Estimation to customer" },
  { value: "4", label: "Greetings when accept offer" },
  { value: "5", label: "Contract to customer" },
];

export const SESSION_TIMEOUT = 5;

export const AUTH_CONTROLLER = "auth";
export const VERIFY_LOGIN_API = "verifyLogin";
export const LOGOUT = "logout";
export const VERIFY_TOKEN_API = "verifyToken";

export const USER_PAGINATION_CONTROLLER = "user-pagination";
export const EMAIL_TEMPLATE_CONTROLLER = "email-template";

export const LEAD_SOURCE_CONTROLLER = "lead-source";
export const LEAD_STATUS_CONTROLLER = "lead-status";

export const USER_CONTROLLER = "user";
export const COMPANY_CONTROLLER = "company";
export const EVENT_CALENDAR_CONTROLLER = "event-calendar";
export const TASK_MANAGEMENT_CONTROLLER = "task-management";
export const TASK_API = "task";
export const TASK_BY_BOARD_API = "taskByBoard";
export const BOARD_API = "board";
export const MENU_CONTROLLER = "menu";
export const SECURITY_RULE_CONTROLLER = "security-rule";
export const SECURITY_GROUP_CONTROLLER = "security-group";
export const PAGINATION_API = "pagination";
