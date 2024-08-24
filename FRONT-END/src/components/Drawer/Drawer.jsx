import React, { useContext } from 'react';
import styles from'./Drawer.module.scss';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';



export default function Drawer ({ isOpen, onClose }) {
  const { user } = useContext(UserContext)


  if (!user) {
    return null;
  }
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
      {/* <div className={`${styles.drawerHeader}`}>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div> */}
      <ul className="drawer-menu">
        <li> <NavLink onClick={onClose} to={`my-account/${user.id}`} end>Mon compte</NavLink></li>
        <li> <NavLink to={`myProfile/${user.id}`} onClick={onClose}>Mon profil</NavLink></li>
        <li> <NavLink onClick={onClose}>Messagerie</NavLink></li>
        <li> <NavLink onClick={onClose}>Mes éléments enregistrés</NavLink></li>
        <li> <NavLink onClick={onClose} to='/logout'>Se déconnecter</NavLink></li>

      </ul>
    </div>
  );
};


