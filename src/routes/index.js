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
import CompanyList from "../pages/company/company-list/CompanyList";
import Boards from "../pages/task-management/boards/Boards";
import TaskManipulation from "../pages/task-management/task-manipulation/TaskManipulation";
import EmailTemplateList from "../pages/setttings/email-template/EmailTemplateList";
import SourceList from "../pages/leads/source-list/SourceList";
import StatusList from "../pages/leads/status-list/StatusList";
import LeadsList from "../pages/leads/leads-list/LeadsList";
import CustomersList from "../pages/customers/customers-list/CustomersList";
import CurrencyList from "../pages/currency/currency-list/CurrencyList";
import CustomerTypeList from "../pages/customers/customer-type/customer-type-list/CustomerTypeList";
import TaxRateList from "../pages/tax-rate/tax-rate-list/TaxRateList";
import PaymentMediumList from "../pages/payment-medium/payment-medium-list/PaymentMediumList";
import ExpenseCategoryList from "../pages/expense-category/expense-category-list/ExpenseCategoryList";
import CampaignFormBuilder from "../pages/campaign/form-builder/CampaignFormBuilder";
import CampaignList from "../pages/campaign/campaign-list/CampaignList";
import CampaignFormList from "../pages/campaign/campaign-form-list/CampaignFormList";

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
          path: "/company",
          element: <CompanyList />,
        },
        {
          path: "/task-management/boards",
          element: <Boards />,
        },
        {
          path: "/task-management/task-manipulation/:id",
          element: <TaskManipulation />,
        },
        {
          path: "/settings/email-template",
          element: <EmailTemplateList />,
        },
        {
          path: "/leads/source-list",
          element: <SourceList />,
        },
        {
          path: "/leads/status-list",
          element: <StatusList />,
        },
        {
          path: "/leads/leads-list",
          element: <LeadsList />,
        },
        {
          path: "/customers/customers-list",
          element: <CustomersList />,
        },
        {
          path: "/currency",
          element: <CurrencyList />,
        },
        {
          path: "/customers/customer-types",
          element: <CustomerTypeList />,
        },

        {
          path: "/tax-rates",
          element: <TaxRateList />,
        },
        {
          path: "/payment-mediums",
          element: <PaymentMediumList />,
        },
        {
          path: "/expense-categorys",
          element: <ExpenseCategoryList />,
        },
        {
          path: "/campaign/campaign-list",
          element: <CampaignList />,
        },
        {
          path: "/campaign/campaign-form-list",
          element: <CampaignFormList />,
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

  const routesForFirstTime = [
    {
      path: "/company-setup",
      element: <CompanyList />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  useEffect(() => {
    const routes = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
      ...routesForFirstTime,
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
