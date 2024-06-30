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
import AdminApp from "./components/pages/admin/AdminApp";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy";
import Contact from "./components/pages/Contact/Contact";
import Logout from "./components/Logout";
import Dashboard from "./components/pages/admin/Dashboard";
import UserList from "./components/pages/admin/users/UserList";
import UserCreate from "./components/pages/admin/users/UserCreate";
import PostList from "./components/pages/admin/posts/PostList";
import PostCreate from "./components/pages/admin/posts/PostCreate";
import PostEdit from "./components/pages/admin/posts/PostEdit";
import UserEdit from "./components/pages/admin/users/UserEdit";

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
  path: "/admin-dashboard/",
  element: (
    <AdminConnected>
      <AdminApp/>
    </AdminConnected>
  ),
  children : [
    {
      path:"/admin-dashboard/prestataires",
      element: (
      <PostList/>),
      children :[
        {
          path: "/admin-dashboard/prestataires/create",
          element: (
            <PostCreate/>
          ),
        },
        {
          path: "/admin-dashboard/prestataires/edit",
          element: (
            <PostEdit/>
          ),
        },
      ] 
    },
    {
      path:"/admin-dashboard/users",
      element: (
      <UserList/>),
      children :[
        {
          path: "/admin-dashboard/users/create",
          element: (
            <UserCreate/>
          ),
        },
        {
          path: "/admin-dashboard/users/:id",
          element: (
            <UserEdit/>
          ),
        },
      ] 
    }
  ]
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <Error404 />,
    children: [mainRoutes, adminRoutes, adminDashboardRoutes],
  },
]);
