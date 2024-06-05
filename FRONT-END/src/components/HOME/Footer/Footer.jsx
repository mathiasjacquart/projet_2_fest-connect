import styles from "./Footer.module.scss"
import { Link } from "react-router-dom"
import logoFest from "../../../assets/image/LOGO-FEST-CONNECT.svg"

export default function Footer() {
  return (
    <footer className={`${styles.footer}`}>
        <div>
            <img src={logoFest} alt="logo" />
        </div>
        <div className={`d-flex flex-column `}>
        <Link className={`${styles.middle}`} to='/politiques-de-confidentialité'>Politique de confidentialité</Link>
        <Link className={`${styles.middle}`}to='/mentions-légales'>Mentions légales</Link>
        <p className={`${styles.middle}`}>Fest Connect © 2024</p>
        </div>
        <div className={`${styles.socials} d-flex flex-row`}>
            <div><Link><i class="fa-brands fa-square-facebook"></i></Link></div>
            <div><Link><i class="fa-brands fa-square-instagram"></i></Link></div>
            <div><Link><i class="fa-brands fa-square-x-twitter"></i></Link></div>
        </div>
    </footer>
  )
}
