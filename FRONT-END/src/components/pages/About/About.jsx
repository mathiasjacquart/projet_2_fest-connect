import React from 'react'
import styles from "./About.module.scss"
import videoOverlay from "../../../assets/image/aboutus/overlayvideo.mp4"
import iconePlus from "../../../assets/image/aboutus/icons8-plus-48.png"
import history from "../../../assets/image/aboutus/history.png"
import valeurs1 from "../../../assets/image/aboutus/valeurs1.png"
import valeurs2 from "../../../assets/image/aboutus/valeurs2.png"
import valeurs3 from "../../../assets/image/aboutus/valeurs3.png"
import valeurs4 from "../../../assets/image/aboutus/valeurs4.png"
import iconeEgal from "../../../assets/image/aboutus/icone=.png"
import ImagePlan from "../../../assets/image/register_icons/plan.png";
import ImageProfile from "../../../assets/image/register_icons/profile.png";
import ImageRegister from "../../../assets/image/register_icons/register.png";
import ImageSend from "../../../assets/image/register_icons/send.png";
import ImageSearch from "../../../assets/image/register_icons/search.png";
import { Link, NavLink } from "react-router-dom";

export default function About() {
  return (
    <div className={styles.About}>
      <div className={styles.videoOverlay}>
        <video src={videoOverlay} autoPlay loop muted></video>
        <div className={styles.titleOverlay}>
          À propos de nous 
        </div>
      </div>
      <div className='container d-flex flex-column'>
       <h3>Notre mission</h3>
       <p>Chez <span>Fest Connect</span>, notre mission est de transformer la manière dont les événements sont planifiés en offrant une plateforme innovante qui connecte directement les clients avec des prestataires événementiels de qualité. Nous visons à simplifier chaque étape du processus de planification, rendant ainsi l'organisation d'événements accessible, fluide et agréable pour tous.</p>
       <h3>Notre engagement </h3>
       <p>Nous aspirons à devenir la plateforme de référence pour tous les besoins événementiels, en bâtissant une communauté dynamique de professionnels et de clients. Notre vision est de faire de chaque événement <span>un succès inoubliable</span> en mettant l'accent sur l'excellence, l'innovation, et la satisfaction de nos utilisateurs.</p>

      
      </div>
      <div className='container'>
        <h3>Nos valeurs </h3>
        <div className='d-flex flex-column align-items-center'>
        <div className= {`d-flex flex-row align-items-center ${styles.containerValeurs}`}>
          <div className={styles.contentValeurs}>
            <img src={valeurs1} alt="" />
            <p> TRANSPARENCE</p>
          </div>
          <div>
            <img src={iconePlus} alt="" />
          </div>
          <div className={styles.contentValeurs}>
            <img src={valeurs2} alt="" />
            <p> COLLABORATION</p>
          </div>
          <div>
            <img src={iconePlus} alt="" />
          </div>
          <div className={styles.contentValeurs}>
            <img src={valeurs3} alt="" />
            <p>INNOVATION</p>
          </div>
          <div>
            <img src={iconePlus} alt="" />
          </div>
          <div className={styles.contentValeurs}>
            <img src={valeurs4} alt="" />
            <p>QUALITÉ</p>
          </div>

        </div>
        <div className=' d-flex center'>
            <img src={iconeEgal} alt="" />
        </div>
        <div className={`${styles.TitreValeur} d-flex center`}>
            <p>FEST CONNECT </p>
        </div>
        </div>

      </div>
     
       <div className={` ${styles.history}`}>
        <div className='container'>
        <h3>Notre histoire</h3>
        </div>
      
        <div className={` ${styles.historyWrapper} container d-flex flex-row align-items-center`}>
       
        <div className={styles.Imghistory}>
          <img src={history} alt="photo idée solution" />
        </div>
        <div className='w-100'>
          <p> <span>Fest Connect</span> est née d'une idée simple : <span>organiser un événement devrait être un plaisir</span>, et non une source de stress. </p> 
          <p> Après avoir constaté les défis rencontrés lors de la recherche de prestataires fiables, nous avons décidé de créer une solution qui simplifierait cette étape cruciale. </p>
          <p> Fondée par des passionnés de l'événementiel, Fest Connect est le fruit de plusieurs années d'expérience combinée dans le domaine, avec un objectif clair : <span>rendre la planification événementielle accessible à tous.</span></p>
        <p>Guidés par la passion de <span>créer des expériences mémorables</span> et par la conviction que chaque détail compte, nous avons conçu Fest Connect pour combler le fossé entre les besoins des clients et l'expertise des prestataires, en rendant chaque étape de l'organisation événementielle plus fluide et plus accessible</p>
        </div>
        </div>

       </div>

        <div className={styles.stepContainer} >
          <div className="container"> 
          <h3 >Comment ça marche ?</h3>
          <div className={`${styles.stepWrapper} d-flex flex-row justify-content-around`}>
          

            <div className={`${styles.stepContent} d-flex flex-column`}>
              <div className={styles.stepImage}>
                <img src={ImageRegister} alt="Inscription" />
              </div>
              <div>
                <p>Créez votre compte gratuitement en quelques minutes.</p>
              </div>
            </div>
            <div className={`${styles.stepContent} d-flex flex-column`}>
              <div className={styles.stepImage}>
                <img src={ImageProfile} alt="Profil" />
              </div>
              <div>
                <p>Complétez votre profil avec vos informations et préférences.</p>
              </div>
            </div>
            <div className={`${styles.stepContent} d-flex flex-column`}>
              <div className={styles.stepImage}>
                <img src={ImageSearch} alt="Recherche" />
              </div>
              <div>
                <p>Recherchez et connectez-vous avec les prestataires ou clients.</p>
              </div>
            </div>
            <div className={`${styles.stepContent} d-flex flex-column`}>
              <div className={styles.stepImage}>
                <img src={ImageSend} alt="Message" />
              </div>
              <div>
                <p>Envoyez des messages et des demandes de devis facilement.</p>
              </div>
            </div>
            <div className={`${styles.stepContent} d-flex flex-column`}>
              <div className={styles.stepImage}>
                <img src={ImagePlan} alt="Planification" />
              </div>
              <div>
                <p>Planifiez votre événement et finalisez les détails.</p>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className='d-flex center'>
          <Link to="/contact"><button className='mj-btn-primary'>Contactez-nous</button></Link>
        </div>
    </div>
  )
}
