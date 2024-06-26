import Header from "./components/HOME/Header/Header";
import Footer from "./components/HOME/Footer/Footer";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Drawer from "./components/Drawer/Drawer";



function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isDrawerOpen]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlecloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Header
        toggleModal={handlecloseModal}
        isModalOpen={isModalOpen}
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
      />

      {isDrawerOpen && (
        <div className={`${styles.overlay}`} onClick={toggleDrawer}></div>
      )}
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
