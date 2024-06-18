import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import App from "./App";
import Homepage from "./components/pages/Homepage/Homepage";
import About from "./components/pages/About/About";
import Account from "./components/pages/Account/Account";
import Register from "./components/pages/Register/Register";
import Error404 from "./components/pages/Error404/Error404";
import Services from "./components/pages/Services/Services";
import UserConnected from "./components/ProtectedRoutes/UserConnected";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import AdminConnected from "./components/ProtectedRoutes/AdminConnected";
import AdminConnexion from "./components/pages/Login/AdminConnexion";
import AdminNotConnected from "./components/ProtectedRoutes/AdminNotConnected";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy";
import Contact from "./components/pages/Contact/Contact";
import Logout from "./components/Logout";

const mainRoutes = {
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/register",
      element: (
        <UserNotConnected>
          <Register />
        </UserNotConnected>
      ),
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/politiques-de-confidentialité",
      element: <PrivacyPolicy />,
    },
    {
      path: "/my-account",
      element: (
        <UserConnected>
          <Account />
        </UserConnected>
      ),
    },
    {
      path: "/logout",
      element: (
        <UserConnected>
          <Logout />
        </UserConnected>
      ),
    },
    {
      path: "/login",
      element: (
        <UserNotConnected>
          <Homepage />
        </UserNotConnected>
      ),
    },
  ],
};

const adminRoutes = {
  path: "/admin",
  element: (
    <AdminNotConnected>
      <AdminConnexion />
    </AdminNotConnected>
  ),
};

const adminDashboardRoutes = {
  path: "/admin-dashboard",
  element: (
    <AdminConnected>
      <AdminDashboard />
    </AdminConnected>
  ),
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [mainRoutes, adminRoutes, adminDashboardRoutes],
  },
]);
