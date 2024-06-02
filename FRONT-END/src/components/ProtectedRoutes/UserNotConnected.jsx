import { useContext } from "react";
import { UserContext } from "../../components/context/UserContext";
import { Navigate } from "react-router-dom";

export default function UserNotConnected({ children }) {
  const { user } = useContext(UserContext);
  return !user ? children : <Navigate to="/" />;
}
