import SearchBar from "../../HOME/SearchBar/SearchBar"
import Categorie from "../../HOME/Categorie/Categorie"
import Avis from "../../HOME/Avis/Avis"
import Connexion from "../Login/UserConnexion"
import AdminRegister from "../../pages/Register/AdminRegister"
// import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
//style
import styles from "./Homepage.module.scss"
//import photos header
import backgroundImage from  "../../../assets/image/photo-bg-header.png"
import { Link } from "react-router-dom"
// import logo réassurance
import logoBooking from "../../../assets/image/reassurance/icons8-booking-60.png"
import logoCustomerSupport from "../../../assets/image/reassurance/icons8-customer-support-60.png"
import logoGuarantee from "../../../assets/image/reassurance/icons8-guarantee-60.png"
import logoSecure from "../../../assets/image/reassurance/icons8-secure-50.png"
import Slider from "react-slick";
import "./sliderReview.css"
//import images

import PrestataireImg from "../../../assets/image/homeprestataire.jpg"
import ClientImg from "../../../assets/image/organisateurHome.jpg"
import { Rating } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Homepage({ showConnexion = false }) {
  const[reviews, setReviews] = useState(null)
  async function getReviews() {
    try {
      const response = await fetch(`http://localhost:4560/api/reviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const reviewData = await response.json();
      console.log(reviewData);
      
      return reviewData;
    } catch (error) {
      console.error("Failed to fetch prestataire data", error);
    }
  }

  useEffect(() => {
    async function fetchReviews() {
      try {
        const allReviews = await getReviews();

        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    }
      fetchReviews(); 
    
  }, []);
  console.log(reviews);
  
  
  const [isConnexionOpen, setIsConnexionOpen] = useState(showConnexion);


  const handleCloseConnexion = () => {
    setIsConnexionOpen(false);
  };
  if (!reviews) { 
    return <div>Loading...</div>; // Placeholder while data is being fetched
  
  }
  return (
    
    <main className={`${styles.main}`}>
      <div className={`${styles.containerintro}`}>
        <div className={`${styles.intro} `}> 
          <div className={`d-flex flex-column`}>
            <h1>Animez vos événements avec Fest Connect</h1>
            <h2>Rencontrez et trouvez le talent qu'il vous faut pour rendre votre fête inoubliable  </h2>


            <div className={`d-flex ${styles.btnContainer}`}>
              <Link to="/about"className={`mj-btn-primary ${styles.btnPrimary}`}>À propos de nous</Link>
              <Link to="/register" className={`mj-btn-primary ${styles.btnPrimary}`}>Rejoignez-nous</Link>
            </div>
         </div>
          <div className={`${styles.photoIntro}`}>
            <img src={backgroundImage} alt="homepage-photo" />
          </div>
        </div>
      
        <SearchBar/>
      </div>
      <Categorie/>
      <div className={`${styles.reassurance}`}>
        <div className={`${styles.reassuranceItems}`}> 
          <img src={logoGuarantee} alt="icone garantie" />
          <p>Tous nos prestataires sont soigneusement vérifiés. </p>
        </div>
        <div className={`${styles.reassuranceItems}`}> 
          <img src={logoSecure} style={{height:"60px", width:"60px"}}alt="icone paiement sécurisé" />
          <p>Les dernières technologies de cryptage pour sécuriser  vos informations personnelles.</p>
        </div>
        <div className={`${styles.reassuranceItems}`}> 
          <img src={logoBooking}  alt="icone réservation gratuite" />
          <p>Trouvez le prestataire idéal pour votre événement. </p>
        </div>
        <div className={`${styles.reassuranceItems}`}> 
          <img src={logoCustomerSupport} alt="icone service client" />
          <p>Notre équipe de support client est disponible à tout moment pour répondre à vos questions. </p>
        </div>
      </div>
      <Avis/>
      <div className={`container d-flex flex-row ${styles.SliderReview}`}>
      {/* <Slider > */}
      { reviews.map((review) => (
          <div key={review._id} className={styles.review}>
            <div className={styles.userReview}>
              <img src={review.userId.avatar} alt="avatar" />
              <p>{review.userId.username}</p>
            </div>
            <div className={styles.contentReview}>
            <p>{review.title}</p>
            <article>{review.content}</article>
            <div className={styles.Rating}>
            <Rating  value={review.note} readOnly />
            </div>
        
            </div>
            
          </div>
      ))}
      {/* </Slider> */}
      </div>
      <div className={styles.CtaEnd}>
        <div className="container">
          <h3>
            Prestataire ou client ? 
          </h3>
          <h4>
            Nous vous donnons toutes les clés pour un événement réussi
          </h4>
          <div className="d-flex flex-row justify-content-around"> 
            <div className={styles.contentCta}>
              <div className={styles.contentCtaImg}>
                <p>Prestataire</p>
                <img src={PrestataireImg} alt="" />
              </div>
              <div className={styles.contentCtaText}>
                <p>Lorem </p>
                <ArrowForwardIosIcon className={styles.contentCtaBtn}/>
              </div>
            </div>
            <div className={styles.contentCta}>
              <div className={styles.contentCtaImg}>
                <p>Organisateur</p>
                <img src={ClientImg} alt="" />
              </div>
              <div className={styles.contentCtaText}>
                <p> Trouvez l'idée qui rendra votre fête plus originale </p>
                <ArrowForwardIosIcon className={styles.contentCtaBtn}/>
              </div>
            </div>

          </div>

        </div>
      </div>

      {isConnexionOpen && <Connexion onClose={handleCloseConnexion} />}
    </main>
    

  )
}


