import { Button, Typography } from "antd";
import "./App.css";
import ThemeProvider from "./components/theme/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/theme/global/GlobalLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ErrorPage from "./pages/error/ErrorPage";
import UserList from "./pages/users/user-list/UserList";
import CreateUser from "./pages/users/create-user/CreateUser";
import { LoaderWrapper } from "./components/theme/global/loader/LoaderWrapper";
// import { AuthProvider } from "./hooks/useAuthOld";
import Login from "./pages/login/Login";
import SecurityRuleList from "./pages/security-rule/security-rule-list/SecurityRuleList";
import SecurityGroupList from "./pages/security-group/security-group-list/SecurityGroupList";
import Calendar from "./pages/calendar/EventCalendar";
import { Toaster } from "react-hot-toast";
import Settings from "./components/theme/settings/Settings";
import AuthProvider from "./hooks/useAuth";
import AppRoutes from "./routes";

function App() {
  return (
    <ThemeProvider>
      {/* <BrowserRouter> */}
      <LoaderWrapper>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LoaderWrapper>
      {/* </BrowserRouter> */}

      <Toaster />
      <Settings />
    </ThemeProvider>
  );
}

export default App;
