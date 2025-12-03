import { createBrowserRouter, Navigate } from "react-router";

import Login from "../pages/login";
import Profile from "../pages/profile";
import KycForm from "../pages/kyc";
import Submissions from "../pages/submissions";
import Results from "../pages/results";
import ClientProfile from "../pages/client-profile";

import AuthLayout from "../layouts/auth";
import AdminLayout from "../layouts/admin";

import { ADMIN_URL, AUTH_URL } from "../constant/url";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={AUTH_URL.LOGIN} replace />,
  },
  {
    path: AUTH_URL.BASE,
    Component: AuthLayout,
    children: [
      { index: true, element: <Navigate to={AUTH_URL.LOGIN} replace /> },
      { path: AUTH_URL.LOGIN, Component: Login },
    ],
  },
  {
    path: ADMIN_URL.BASE,
    Component: AdminLayout,
    children: [
      { index: true, element: <Navigate to={ADMIN_URL.PROFILE} replace /> },
      { path: ADMIN_URL.PROFILE, Component: Profile },
      { path: ADMIN_URL.KYC, Component: KycForm },
      { path: ADMIN_URL.SUBMISSIONS, Component: Submissions },
      { path: ADMIN_URL.RESULTS, Component: Results },
      { path: ADMIN_URL.CLIENT_PROFILE, Component: ClientProfile },
    ],
  },
]);

export default Router;
