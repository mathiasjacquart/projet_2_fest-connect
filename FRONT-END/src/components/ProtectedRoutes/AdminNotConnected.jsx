import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { Navigate } from "react-router-dom";

export default function AdminNotConnected({ children }) {
  const { admin } = useContext(AdminContext);
  return !admin ? children : <Navigate to="/admin-dashboard" />;
}
