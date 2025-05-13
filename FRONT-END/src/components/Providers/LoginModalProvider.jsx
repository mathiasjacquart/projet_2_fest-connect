import { useState } from "react";
import { ModalContext } from "../context/ModalContext";

export const LoginModalProvider = ({ children }) => {
  const [isConnexionOpen, setIsConnexionOpen] = useState(false);

  const openConnexion = () => {
    setIsConnexionOpen(true);
  };
  const handleCloseConnexion = () => setIsConnexionOpen(!isConnexionOpen);
  console.log(isConnexionOpen);
  return (
    <ModalContext.Provider
      value={{ isConnexionOpen, openConnexion, handleCloseConnexion }}
    >
      {children}
    </ModalContext.Provider>
  );
};
