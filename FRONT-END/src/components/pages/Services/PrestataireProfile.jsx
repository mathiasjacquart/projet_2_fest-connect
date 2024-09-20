import React, {useEffect, useState} from 'react'
import styles from "./PrestataireProfile.module.scss"
import { Link, useParams} from 'react-router-dom'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import "./slider.css"
import Slider from "react-slick";
import ClickedHeart from "../../../assets/image/serviceprofil/heart2.png"
import NotClickedHeart from "../../../assets/image/serviceprofil/heart1.png"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
export default function PrestataireProfile() {
   
  const { id } = useParams(); 
  const [prestataire, setPrestataire] = useState(null); 
  const [isLiked, setIsLiked] = useState(false)

  const handleLikeButton = () => { 
    setIsLiked(!isLiked)
  }
  async function getPrestataireById(id) {
    try {
      const response = await fetch(`http://localhost:4560/api/providers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const prestataireData = await response.json();
      console.log(prestataireData);
      
      return prestataireData;
    } catch (error) {
      console.error("Failed to fetch prestataire data", error);
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const prestataireData = await getPrestataireById(id); 
        setPrestataire(prestataireData); 
      } catch (error) {
        console.error("Error fetching prestataire profile", error);
      }
    }

    if (id) {
      fetchProfile(); 
    }
  }, [id]);
  console.log(prestataire);

  if (!prestataire) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }


    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      waitForAnimate: false
    }

    function getMatchingSubcategories(prestataire) {

      let matchingSubcategories = [];

    
      prestataire.service.category.subCategories.forEach(subcategory => {
 
        if (prestataire.service.subcategories.includes(subcategory._id)) {
         
          matchingSubcategories.push(subcategory);
          console.log(subcategory);
        }
      });
    
      // Retourner les sous-catégories correspondantes
      return matchingSubcategories;
    }
    
    // Utilisation de la fonction
    const matchedSubcategories = getMatchingSubcategories(prestataire);
    
    console.log(matchedSubcategories);
    
      return (
    <div className={styles.PrestataireProfile}>
        <div className={styles.btnRetour}>
            <Link  className="mj-btn-primary"to="/services"> <ArrowBackOutlinedIcon/> <p>Retour</p></Link>
        </div>
        <div className='container d-flex '>
          <div className='d-flex flex-row mt-20'>
            <div >
            <Slider {...settings} className={styles.photoCarrousel}>
            {prestataire && prestataire.photo && 
              prestataire.photo
                // .filter((_, index) => index % 2 === 0) // Filtre les index pairs
                .map((photos, index) => (
                  <div key={index}>
                    <img src={photos} alt={`Photo ${index}`} />
                  </div>
                ))}
            </Slider>
            </div>
            <div className={styles.infosProfile }>
                 <div className={styles.businessname}>
                    <p>{prestataire.businessname}</p>
                  </div>
                  <div className={styles.biography}>
                  
                    <p><span>A propos de moi</span><br/>{prestataire.biography}</p>
                  </div>   
                  <div className={styles.biography}>
                  
                    <p><span>Localisation</span><br/>{prestataire.location.city}, {prestataire.location.region}</p>
                  </div>   
                  <div className={styles.biography}>
                  
                    <p><span>Mobilité </span><br/>Je suis prêt à me déplacer jusqu'à {prestataire.surrounding} kms </p>
                  </div>
                  <div className={styles.btnContact}>
                  <img  onClick={handleLikeButton}  src={isLiked ? ClickedHeart : NotClickedHeart} alt="" />
                  <button className='mj-btn-primary'>Contactez</button>
              
                 
                </div>    
                 
            </div>
          </div>
        </div>
        <div className={styles.titlebg}>
          <div className={`${styles.title} container`}>
            <h3>Description</h3>
            <p>Détails sur le prestataire et ses services</p>
          </div>
        </div>
        <div className={`${styles.description} container`}>
                <p>
                  {prestataire.description}
                </p>
        </div>
        <div className={styles.titlebg}>
          <div className={`${styles.title} container`}>
            <h3>Services</h3>
            <p>Voici une liste des services que ce prestataire propose</p>
          </div>
        </div>
        <div className={`${styles.services} container`}>
                <p>{prestataire.service.category.nameCategory}</p>
                {matchedSubcategories.map((subcategory) => (
                  <p key={subcategory._id}>
                    {subcategory.nameSubCategory}
                  </p>
                ))}
        </div>
        <div className={styles.titlebg}>
          <div className={`${styles.title} container`}>
            <h3>Avis</h3>
            <p>Retours des clients sur leur expérience.</p>
          </div>
        </div>
        <div className={`${styles.avis} container`}>

        </div>

    </div>
  )
}
