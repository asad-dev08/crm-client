import { Button, Typography } from "antd";
import "./App.css";
import ThemeProvider from "./components/theme/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/theme/global/GlobalLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ErrorPage from "./pages/error/ErrorPage";
import UserList from "./pages/users/user-list/UserList";
import CreateUser from "./pages/users/create-user/CreateUser";
import { LoaderWrapper } from "./components/theme/global/loader/LoaderWrapper";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/login/Login";
import SecurityRuleList from "./pages/security-rule/security-rule-list/SecurityRuleList";
import SecurityGroupList from "./pages/security-group/security-group-list/SecurityGroupList";
import Calendar from "./pages/calendar/EventCalendar";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <LoaderWrapper>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />

                <Route path="*" element={<ErrorPage />} />
                <Route path="login" element={<Login />} />

                <Route path="dashboard" element={<Dashboard />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="users/user-list" element={<UserList />} />

                <Route
                  path="security-rule/security-rule-list"
                  element={<SecurityRuleList />}
                />
                <Route
                  path="security-group/security-group-list"
                  element={<SecurityGroupList />}
                />
              </Route>
            </Routes>
          </AuthProvider>
        </LoaderWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
