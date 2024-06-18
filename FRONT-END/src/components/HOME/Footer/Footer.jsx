import React, { useState } from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import logoFest from "../../../assets/image/LOGO-FEST-CONNECT.svg";
import LogoFacebook from "../../../assets/image/socials_logo/facebook-logo.png";
import LogoFacebookHover from "../../../assets/image/socials_logo/facebook-logo-hover.png";

import LogoTwitter from "../../../assets/image/socials_logo/twitter-logo.png";
import LogoTwitterHover from "../../../assets/image/socials_logo/twitter-logo-hover.png";

export default function Footer() {
  const [hovered, setHovered] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
  });

  return (
    <footer className={`${styles.footer}`}>
      <div>
        <Link to="/"><img src={logoFest} alt="logo" /></Link>
      </div>
      <div className={`d-flex flex-column`}>
        <Link className={`${styles.middle}`} to='/politiques-de-confidentialité'>Politique de confidentialité</Link>
        <Link className={`${styles.middle}`} to='/mentions-légales'>Mentions légales</Link>
        <p className={`${styles.middle}`}>Fest Connect © 2024</p>
      </div>
      <div className={`${styles.socials} d-flex flex-row`}>
        <div>
          <Link
            onMouseEnter={() => setHovered({ ...hovered, facebook: true })}
            onMouseLeave={() => setHovered({ ...hovered, facebook: false })}
          >
            <img src={hovered.facebook ? LogoFacebookHover : LogoFacebook} alt="Facebook" />
          </Link>
        </div>

        <div>
          <Link
            onMouseEnter={() => setHovered({ ...hovered, twitter: true })}
            onMouseLeave={() => setHovered({ ...hovered, twitter: false })}
          >
            <img src={hovered.twitter ? LogoTwitterHover : LogoTwitter} alt="Twitter" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
