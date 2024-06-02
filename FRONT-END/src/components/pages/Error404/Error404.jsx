import React from 'react'
import styles from "./Error404.module.scss"
import { Link } from 'react-router-dom'
import image404 from "../../../assets/image/image404.png"
export default function Error404() {
  return (
     <div className={`${styles.error}`}>
        <div>
          <img src={image404} alt="image 404" />
        </div>
        <div className={`${styles.errorContent}`}>
          <p  className={`${styles.errorContentp1}`}>ERROR 404</p>
          <p className={`${styles.errorContentp2}`}>Oups... il y a quelque chose qui cloche.</p>
          <p  className={`${styles.errorContentp3}`}>Cette page n'existe plus ou n'est plus disponible</p>
          <p  className={`${styles.errorContentp4}`}>T'inquiètes pas, ça va aller, tu peux retourner sur la page d'accueil pour faire la fête !</p>
          <Link to="/" className={`mj-btn-primary ${styles.btnBackHome}`}>Retourner à la page d'accueil</Link>
        </div>
     </div>
  )
}
