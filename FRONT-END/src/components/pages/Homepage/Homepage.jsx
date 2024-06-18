import SearchBar from "../../HOME/SearchBar/SearchBar"
import Categorie from "../../HOME/Categorie/Categorie"
import Avis from "../../HOME/Avis/Avis"
import Connexion from "../Login/UserConnexion"
import Upload from "../../Upload"
import AdminRegister from "../../pages/Register/AdminRegister"
// import { Link } from "react-router-dom"
import { useState } from "react"
//style
import styles from "./Homepage.module.scss"
//import photos header
import backgroundImage from  "../../../assets/image/photo-bg-header.png"

// import logo réassurance
import logoBooking from "../../../assets/image/reassurance/icons8-booking-60.png"
import logoCustomerSupport from "../../../assets/image/reassurance/icons8-customer-support-60.png"
import logoGuarantee from "../../../assets/image/reassurance/icons8-guarantee-60.png"
import logoSecure from "../../../assets/image/reassurance/icons8-secure-50.png"
// import './App.css'

export default function Homepage({ showConnexion = false }) {
  const [isConnexionOpen, setIsConnexionOpen] = useState(showConnexion);

  const handleCloseConnexion = () => {
    setIsConnexionOpen(false);
  };
  return (
    
    <main className={`${styles.main}`}>
      {/* <Upload></Upload> */}
      <div className={`${styles.intro} `}> 
        <div className={`d-flex flex-column`}>
        <h1>Animez vos événements avec Fest Connect</h1>
        <h2>Rencontrez et trouvez le talent qu'il vous faut pour rendre votre fête inoubliable  </h2>


          <div className={`d-flex ${styles.btnContainer}`}>
            <button className={`mj-btn-primary ${styles.btnPrimary}`}>À propos de nous</button>
            <button className={`mj-btn-primary ${styles.btnPrimary}`}>Rejoignez-nous</button>
          </div>
        </div>
        <div className={`${styles.photoIntro}`}>
          <img src={backgroundImage} alt="landing-page-photo" />
        </div>
      </div>
      
      <SearchBar/>
      <Categorie/>
      <div className={`${styles.reassurance}`}>
        <div className={`${styles.reassuranceItems}`}> 
          <img src={logoGuarantee} alt="icone garantie" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quaerat consectetur aperiam est? </p>
        </div>
        <div className={`${styles.reassuranceItems}`}> 
          <img src={logoSecure} style={{height:"60px", width:"60px"}}alt="icone paiement sécurisé" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quaerat consectetur aperiam est? </p>
        </div>
        <div className={`${styles.reassuranceItems}`}> 
          <img src={logoBooking}  alt="icone réservation gratuite" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quaerat consectetur aperiam est? </p>
        </div>
        <div className={`${styles.reassuranceItems}`}> 
          <img src={logoCustomerSupport} alt="icone service client" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quaerat consectetur aperiam est? </p>
        </div>
      </div>
      <Avis/>

      {isConnexionOpen && <Connexion onClose={handleCloseConnexion} />}
    </main>
    

  )
}


