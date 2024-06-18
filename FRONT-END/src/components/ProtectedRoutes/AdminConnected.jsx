import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { Navigate } from "react-router-dom";

export default function AdminConnected({ children }) {
  const { admin } = useContext(AdminContext);
  return admin ? children : <Navigate to="/admin" />;
}
