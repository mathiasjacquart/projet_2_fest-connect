import styles from "./Header.module.scss"
import logoFest from "../../../assets/image/LOGO-FEST-CONNECT.svg"
import {Link, NavLink} from "react-router-dom"
import Connexion from "../../pages/Login/Connexion"
import { UserContext } from "../../context/UserContext"
import { useContext } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// import logoAccount from "../../../assets/image/icons8-user-circle-48.png"

export default function Header ({openModal, closeModal, isModalOpen}) {
    const { user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    return(
        <header className={`${styles.header}`}>
            <div>
                <Link to="/"><img src={logoFest} alt="logo" /> </Link>
            </div>
            <nav>
                <ul className={`d-flex flex-row `}>
                    <li> <NavLink to="/">Accueil</NavLink></li>
                    <li> <NavLink to="/about">À propos</NavLink></li>
                    <li> <NavLink to="/services">Services</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink> </li>
                </ul>
            </nav>
            <div>

                {!user ? (
                        <>
                        
                        <Link to="/register" className="mj-btn-primary m-10">
                            Tes talents ? 
                        </Link>
                        <Link to="/login" onClick={openModal}className="mj-btn-secondary">
                            Se connecter
                        </Link>
                        </>
                            
                    ):(
                    <div>
                        <button
                        className="mj-btn-secondary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        >
                        Mon compte
                        </button>
                        <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        >
                        <MenuItem className={`${styles.MenuItemAccount}`}onClick={handleClose}>Mon profil</MenuItem>
                        <MenuItem onClick={handleClose}>Mon compte</MenuItem>
                        <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
                        </Menu>
                    </div>
                    )
                }   

                 {isModalOpen && <Connexion onClose={closeModal}/>}
            </div>
        </header>
    )
}