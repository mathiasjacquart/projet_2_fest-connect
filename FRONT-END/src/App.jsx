import Header from "./components/HOME/Header/Header";
import Footer from "./components/HOME/Footer/Footer";
import styles from "./App.module.scss"
import { Outlet } from "react-router-dom";
import { useState } from "react";
import UserProvider from "./components/Providers/UserProvider"


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }; 

  return (
    <>
    <UserProvider>
    <Header openModal = {openModal} closeModal = {closeModal} isModalOpen={isModalOpen}/>
        <Outlet/>
    <Footer/>
    </UserProvider>

    </>

  )
}

export default App
