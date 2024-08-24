import { useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";

import {useNavigate}  from "react-router-dom"

export default function AdminProvider({ children}) {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminStorage = JSON.parse(localStorage.getItem("admin")); 
    if (adminStorage) {
      const { token, admin } = adminStorage;
      if (token && isTokenValid(token)) {
        setAdmin(admin);
      } else {
        logoutConnectedAdmin();
      }
    }
  }, []);

  function logoutConnectedAdmin() {
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/admin")
    
  }

  function setConnectedAdmin(adminConnected) {
    setAdmin(adminConnected);
  }

  function isTokenValid(token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.exp * 1000 > new Date().getTime();
  }

  return (
    <AdminContext.Provider
      value={{ admin, setConnectedAdmin, logoutConnectedAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
}
