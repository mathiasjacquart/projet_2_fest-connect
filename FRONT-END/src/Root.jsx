import React from "react";
import { Outlet } from "react-router-dom";
import UserProvider from "./components/Providers/UserProvider";
import AdminProvider from "./components/Providers/AdminProvider";

const Root = () => {
  return (
    <AdminProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </AdminProvider>
  );
};

export default Root;
