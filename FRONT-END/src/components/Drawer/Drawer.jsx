import React from 'react';
import styles from'./Drawer.module.scss';
import { NavLink } from 'react-router-dom';

const Drawer = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
      {/* <div className={`${styles.drawerHeader}`}>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div> */}
      <ul className="drawer-menu">
        <li> <NavLink end>Mon compte</NavLink></li>
        <li> <NavLink>Mon profil</NavLink></li>
        <li> <NavLink>Messagerie</NavLink></li>
        <li> <NavLink>Mes éléments enregistrés</NavLink></li>
        <li> <NavLink to='/logout'>Se déconnecter</NavLink></li>

      </ul>
    </div>
  );
};

export default Drawer;
