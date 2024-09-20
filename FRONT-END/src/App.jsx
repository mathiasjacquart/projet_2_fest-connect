import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import CookieConsent, { Cookies } from "react-cookie-consent";
import Header from "./components/HOME/Header/Header";
import Footer from "./components/HOME/Footer/Footer";
import Drawer from "./components/Drawer/Drawer";
import styles from "./App.module.scss";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCookieConsentOpen, setIsCookieConsentOpen] = useState(true); 
  const navigate = useNavigate()
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCookieAccept = () => {
    setIsCookieConsentOpen(false);
    Cookies.set("Fest_Connect_Cookie", true, { expires: 0.5 });
  };

  const handleCookieDecline = () => {
    setIsCookieConsentOpen(false);
    Cookies.set("Fest_Connect_Cookie", false, { expires: 0.5 });
  };

  useEffect(() => {
    const cookieConsent = Cookies.get("Fest_Connect_Cookie");
    if (cookieConsent !== undefined) {
      setIsCookieConsentOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isDrawerOpen || isCookieConsentOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isDrawerOpen, isCookieConsentOpen]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
    navigate('/')
  };

  return (
    <>
      <Header
        toggleModal={handleCloseModal}
        isModalOpen={isModalOpen}
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
      />

      {isDrawerOpen && (
        <div className={`${styles.overlay}`} onClick={toggleDrawer}></div>
      )}
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      <Outlet />
      <CookieConsent
        onAccept={handleCookieAccept}
        onDecline={handleCookieDecline}
        visible="byCookieValue"
        flipButtons
        enableDeclineButton
        location="bottom"
        buttonText="Accepter"
        declineButtonText="Refuser"
        cookieName="Fest_Connect_Cookie"
        style={{ background: "#2B2D42", color: '#EDF2F4' }}
        buttonClasses="mj-btn-primary"
        buttonStyle={{
          color: "#EDF2F4",
          backgroundColor: "#EF233C ",
          borderRadius: '10px',
          fontSize: '1rem',
          boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)"
        }}
        declineButtonStyle={{
          color: "#EDF2F4",
          backgroundColor: "#2B2D42",
          borderRadius: '10px',
          fontSize: '1rem',
          boxShadow: "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)",
          border: 'solid 1px #EDF2F4',
          padding: '11px 35px',
          fontWeight:"500"
        }}
        expires={0.5}
      >
        Ce site internet utilise des cookies conformément à sa <Link style={{ color: "#EF233C" }} to="/politiques-de-confidentialité">Politique de confidentialité</Link>.
      </CookieConsent>
      <Footer />
    </>
  );
}

export default App;
