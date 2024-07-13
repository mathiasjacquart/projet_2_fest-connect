import React, { useState } from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import logoFest from "../../../assets/image/LogoFestConnect.png"
import LogoFacebook from "../../../assets/image/socials_logo/LOGOFB.png";

import LogoInstagram from "../../../assets/image/socials_logo/LOGOINSTA.png"
import LogoTwitter from "../../../assets/image/socials_logo/LOGOX.png";


export default function Footer() {


  return (
    <footer className={`${styles.footer}`}>
      <div className="logo">
        <Link href="#"><img src={logoFest} alt="logo" /></Link>
      </div>
      <div className={`d-flex flex-column`}>
        <Link className={`${styles.middle}`} to='/politiques-de-confidentialité'>Politique de confidentialité</Link>
        <Link className={`${styles.middle}`} to='/mentions-légales'>Mentions légales</Link>
        <p className={`${styles.middle}`}>Fest Connect © 2024</p>
      </div>
      <div className={`${styles.socials} d-flex flex-row`}>
        <div>
          <Link className="logo">

            <img src={LogoFacebook} alt="Facebook" />
          </Link>
        </div>

        <div >
          <Link className="logo"
          >
            <img src={LogoTwitter} alt="Twitter" />
          </Link>
        </div>
        <div>
          <Link className="logo"
          >
            <img src={LogoInstagram} alt="Twitter" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
