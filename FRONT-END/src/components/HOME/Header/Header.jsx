import styles from "./Header.module.scss"
import Drawer from "../../Drawer/Drawer"
import logoFest from "../../../assets/image/LogoFestConnect.png"
import { Link, NavLink } from "react-router-dom"
import Connexion from "../../pages/Login/UserConnexion"
import { UserContext } from "../../context/UserContext"
import { useContext, useState } from "react"
import * as React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// import logoAccount from "../../../assets/image/icons8-user-circle-48.png"

export default function Header({ toggleModal, isModalOpen, onClose }) {
    const { user } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(false);
    console.log(showMenu);

    function handleShowMenu() {
        setShowMenu(prevShowMenu => !prevShowMenu);
    }

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
                        <ul className={`d-flex flex-row`}>
                            <li> <NavLink to="/" end>Accueil</NavLink></li>
                            <li> <NavLink to="/about">À propos</NavLink></li>
                            <li> <NavLink to="/services">Services</NavLink></li>
                            <li><NavLink to="/blog">Blog</NavLink> </li>
                            <li><NavLink to="/contact">Contact</NavLink> </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    {!user ? (
                        <>
                            <Link to="/register" className="mj-btn-primary m-10">
                                Tes talents ?
                            </Link>
                            <Link to="/login" onClick={toggleModal} className="mj-btn-secondary">
                                Se connecter
                            </Link>
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
                    className={`fas fa-bars mr-10 ${styles.BurgerMenu}`}
                ></i>
            </div>

            {showMenu && (
                <>
                <div className={styles.calc}>

                </div>
                <div className={styles.mobileMenu}>
                    <ul>
                        <li> <NavLink to="/" end>Accueil</NavLink></li>
                        <li> <NavLink to="/about">À propos</NavLink></li>
                        <li> <NavLink to="/services">Services</NavLink></li>
                        <li><NavLink to="/blog">Blog</NavLink> </li>
                        <li><NavLink to="/contact">Contact</NavLink> </li>
                    </ul>
                </div>
                </>
            )}
            <div className={styles.AccountMenu}>
            <i className={`fa-solid fa-user ${styles.AccountMenu}`}></i>
            </div>
        </header>
    )
}
