import React, { useContext } from "react";
import { UserContext } from "../../components/context/UserContext";
import { Navigate } from "react-router-dom";

export default function UserConnected({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
}
