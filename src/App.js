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

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <LoaderWrapper>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="*" element={<ErrorPage />} />

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<UserList />} />
              <Route path="user/:id" element={<CreateUser />} />
            </Route>
          </Routes>
        </LoaderWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
