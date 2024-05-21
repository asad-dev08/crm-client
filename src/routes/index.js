import {
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import EventCalendar from "../pages/calendar/EventCalendar";
import UserList from "../pages/users/user-list/UserList";
import SecurityRuleList from "../pages/security-rule/security-rule-list/SecurityRuleList";
import SecurityGroupList from "../pages/security-group/security-group-list/SecurityGroupList";
import ErrorPage from "../pages/error/ErrorPage";
import { useAuth } from "../hooks/useAuth";
import GlobalLayout from "../components/theme/global/GlobalLayout";
import { useEffect, useState } from "react";

const AppRoutes = () => {
  const { token } = useAuth();
  const [router, setRouter] = useState(null);

  // Define public routes accessible to all users
  const routesForPublic = [];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <GlobalLayout />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "calendar",
          element: <EventCalendar />,
        },
        {
          path: "/users/user-list",
          element: <UserList />,
        },
        {
          path: "/security-rule/security-rule-list",
          element: <SecurityRuleList />,
        },
        {
          path: "/security-group/security-group-list",
          element: <SecurityGroupList />,
        },
        {
          path: "/*",
          element: <ErrorPage />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  useEffect(() => {
    const routes = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
    setRouter(routes);
  }, [token]);

  // Provide the router configuration using RouterProvider
  return (
    <>
      {router ? (
        <RouterProvider router={router}>
          <Routes>
            {routesForPublic.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {!token && <Navigate to="/login" />}
            {routesForAuthenticatedOnly.map((route, index) => (
              <Route key={index} path={route.path}>
                {route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                    exact={childRoute.exact}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </RouterProvider>
      ) : null}
    </>
  );
};

export default AppRoutes;
