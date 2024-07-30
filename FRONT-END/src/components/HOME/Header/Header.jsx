import styles from "./Header.module.scss";
import Drawer from "../../Drawer/Drawer";
import logoFest from "../../../assets/image/LogoFestConnect.png";
import { Link, NavLink } from "react-router-dom";
import Connexion from "../../pages/Login/UserConnexion";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import * as React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Header({ toggleModal, isModalOpen, onClose, isOpen }) {
    const { user } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    function handleClickLogin() {
        toggleModal(true);
        handleShowAccountMenu(false)  
    }
    function handleShowMenu() {
        setShowMenu(prevShowMenu => !prevShowMenu);
    }
    function handleShowAccountMenu() {
        setShowAccountMenu(prevShowAccountMenu => !prevShowAccountMenu);
    }
    console.log(showAccountMenu);
    console.log(showMenu);

    return (

        <header className={`${styles.header}`}>

            <div className={styles.LogoHead}>
                <Link to="/" className="d-flex flex-row align-items-center">
                    <div className="logo">
                        <img src={logoFest} alt="logo" />
                    </div>
                    <div>
                        <h1>Fest Connect</h1>
                    </div>
                </Link>
            </div>
            <div className={styles.burgerNav}>
                <nav>
                    <div>
                        <ul className={`d-flex flex-row align-items-center`}>
                            <li><NavLink to="/" end>Accueil</NavLink></li>
                            <li><NavLink to="/about">À propos</NavLink></li>
                            <li><NavLink to="/services">Services</NavLink></li>
                            <li><NavLink to="/blog">Blog</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                </nav>
                <div>
                    {!user ? (
                        <>
                            <Link to="/register" className="mj-btn-primary m-10">Tes talents ?</Link>
                            <Link to="/login" onClick={toggleModal} className="mj-btn-secondary">Se connecter</Link>
                        </>
                    ) : (
                        <div className={`${styles.App}`}>
                            <button onClick={onClose} className="d-flex flex-row align-items-center">
                                <img src={user.avatar} alt="avatar" />
                                <p>{user.username}</p>
                                <ArrowDropDownIcon />
                            </button>
                        </div>
                    )}
                    {isModalOpen && <Connexion onClose={toggleModal} />}
                </div>
            </div>
            <div className={styles.BurgerMenuContainer}>

                <i
                    onClick={handleShowMenu}
                    className={`fas ${showMenu ? 'fa-times' : 'fa-bars'}  ${styles.BurgerMenu}`}
                    style={{ pointerEvents: showAccountMenu || isOpen  ? 'none' : 'auto', opacity: showAccountMenu ? 0.3 : 1 }}
                ></i>
            </div>

            {showMenu && (
                <>
                    <div className={styles.calc}></div>
                    <div className={`${styles.mobileMenu} ${showMenu ? styles.open : ""}`}>
                        <ul>
                            <li className={styles.noBorder}><NavLink  to="/" end>Accueil</NavLink></li>
                            <li><NavLink to="/about">À propos</NavLink></li>
                            <li><NavLink to="/services">Services</NavLink></li>
                            <li><NavLink to="/blog">Blog</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>
                </>
            )}
            {!user ? (
            <div className={`${styles.AccountMenu} ${showMenu ? styles.close : ""}`}>
                <i className={`fa-solid  ${showAccountMenu ? 'fa-times' : 'fa-user'}  ${styles.AccountMenu}`}
                    onClick={handleShowAccountMenu}
                    style={{ pointerEvents: showMenu ? 'none' : 'auto', opacity: showMenu ? 0.3 : 1 }}></i>
            </div>
    ) : ( 
    <div className={`${styles.AppMobile}`}>
       
            <img  onClick={onClose}  src={user.avatar} alt="avatar" 
            />
       
        </div>
        )}
            {showAccountMenu && (
                <div className={styles.AccountMenuMobile}>
                    
                        <div className="d-flex flex-column center">
                            <Link onClick={() => setShowAccountMenu(false)} to="/register" className="mj-btn-primary">Tes talents ?</Link>
                            <Link  to="/login" onClick={handleClickLogin} className="mj-btn-secondary">Se connecter</Link>
                        </div>
                   
                    </div>
                    )}
                    {isModalOpen && <Connexion onClose={toggleModal} />}
        </header>
    );
}
