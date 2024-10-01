import React, {useContext, useEffect, useState} from 'react'
import styles from "./PrestataireProfile.module.scss"
import { Link, useParams} from 'react-router-dom'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import "./slider.css"
import Slider from "react-slick";
import ClickedHeart from "../../../assets/image/serviceprofil/heart2.png"
import NotClickedHeart from "../../../assets/image/serviceprofil/heart1.png"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Review from '../../review/Review';
import { UserContext } from '../../context/UserContext';
import Rating from '@mui/material/Rating';

export default function PrestataireProfile() {
   
  const { id } = useParams(); 
  const [prestataire, setPrestataire] = useState(null); 
  const [isLiked, setIsLiked] = useState(false)
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(UserContext);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(null)

  const handleCloseModal = () => {  
      setShowModal(false)
  };
  console.log(user);
  
  console.log(id);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser || user) {
      setIsUserConnected(true);
    } else {
      setIsUserConnected(false);
    }
  }, [user]);
  const handleWriteReview= () => {
    if (!isUserConnected) {
      setShowModal(true); 
    } else {
      setShowReviewForm(true);
    }
  };
   const handleBackReview = () => { 
    setShowReviewForm(!showReviewForm)
   }
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
        
       
        const filteredReviews = allReviews.filter(review => review.prestataireId.id === id);
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    }
  
    if (id) {
      fetchReviews(); 
    }
  }, [id]);
  


  console.log(prestataire);
  console.log(reviews);
  

  if (!prestataire) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }
  if (!reviews) { 
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
    

      return matchingSubcategories;
    }
    

    const matchedSubcategories = getMatchingSubcategories(prestataire);
    
    console.log(matchedSubcategories);
    
      return (
        
    <div className={styles.PrestataireProfile}>
    {showModal &&
      
      <div className={`${styles.modalBg}`} onClick={handleCloseModal}>
      <div className={`${styles.modalContent}`} onClick={(e) => e.stopPropagation()}>
        <div>
          <i onClick={handleCloseModal} className="fa-solid fa-xmark"></i>
        </div>
        <div className='d-flex center h-100'>
        <div className='d-flex flex-column center'>
          <p>
            Vous devez être connecté pour pouvoir rédiger un avis. 
          </p>
          <Link to='/login'className='mj-btn-primary'>Se connecter</Link>
        </div>
        </div>

      </div>
    </div>
}

      <>
        <div className={styles.btnRetour}>
            <Link  className="mj-btn-primary"to="/services"> <ArrowBackOutlinedIcon/> <p>Retour</p></Link>
        </div>
        <div className='container d-flex '>
          <div className='d-flex flex-row align-items-center mt-20'>
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
                <div>
                <img  onClick={handleLikeButton}  src={isLiked ? ClickedHeart : NotClickedHeart} alt="" />
                </div>
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
        
          {!showReviewForm ? (
                      <div className='d-flex flex-row flex-wrap'>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
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
                            ))
                          ) : (
                            <p>Cet utilisateur n'a pas encore d'avis.</p>
                          )}
                    </div>
                    
          ):(
            <div className='container'>
            <div className={styles.btnRetour}>
            <button onClick={handleBackReview} className=" d-flex center mj-btn-primary"to="/services"> <ArrowBackOutlinedIcon/> <p>Retour aux avis</p></button>
            </div>
            <div className='d-flex center'>
              
              <Review p={id}/>
  
              </div>
            </div>
)}

            <div className='d-flex center'>
              {
                !showReviewForm &&
                <button onClick={handleWriteReview} className='mj-btn-primary'>Rédiger un avis</button>
              }
              
            </div>


        </div>
 
      </>
  
    </div>
    

  
  )
}
