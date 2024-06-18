import  { useContext, useEffect } from "react";
import { UserContext } from "../components/context/UserContext";

export default function Logout() {
  const { logoutConnectedUser } = useContext(UserContext);
  useEffect(() => {
    logoutConnectedUser();
  }, []);
  
  return (
    <div>
      <h2>Déconnexion en cours ...</h2>
    </div>
  );
}
