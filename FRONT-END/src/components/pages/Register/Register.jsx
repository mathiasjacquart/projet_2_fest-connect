import React, {useRef} from 'react';
import RegisterForm from './RegisterForm';
import Accordion from "./Accordion"

import PartnerSlider from './SliderPartenaires';
import styles from "./Register.module.scss";
import ImageSupportClient from "../../../assets/image/register_icons/customerSupport.png";
import ImageSecurity from "../../../assets/image/register_icons/securityShield.png";
import ImageVerified from "../../../assets/image/register_icons/Verified.png";
import ImageEasy from "../../../assets/image/register_icons/Easy.png";
import ImagePlan from "../../../assets/image/register_icons/plan.png";
import ImageProfile from "../../../assets/image/register_icons/profile.png";
import ImageRegister from "../../../assets/image/register_icons/register.png";
import ImageSend from "../../../assets/image/register_icons/send.png";
import ImageSearch from "../../../assets/image/register_icons/search.png";

export default function Register() {
  const ContentOne = useRef(null);
  const ContentTwo = useRef(null);
  const ContentThree = useRef(null);
  const ContentFour = useRef(null);

  function handleClickOne() {
    ContentOne.current.scrollIntoView({
      behavior:"smooth"
    })
  }
  function handleClickTwo() {
    ContentTwo.current.scrollIntoView({
      behavior:"smooth"
    })
  }
  function handleClickThree() {
    ContentThree.current.scrollIntoView({
      behavior:"smooth"
    })
  }
  function handleClickFour() {
    ContentFour.current.scrollIntoView({
      behavior:"smooth"
    })
  }
  return (
    <div>
      <RegisterForm handleClickOne={handleClickOne} handleClickTwo={handleClickTwo} handleClickThree={handleClickThree} handleClickFour={handleClickFour}  />
      <div className={`${styles.RegisterContainer} d-flex flex-column`}>
        <div className='container'>
          <h3 ref={ContentOne}>Pourquoi nous choisir ?</h3>
          <div className='d-flex flex-row justify-content-around mb-20'>
            <div className='d-flex flex-column'>
              <div className={styles.reassuranceContent}>
                <div className={styles.reassuranceImage}>
                  <img src={ImageSecurity} alt="Sécurité" />
                </div>
                <div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero at quidem obcaecati odio?</p>
                </div>
              </div>
              <div className={styles.reassuranceContent}>
                <div className={styles.reassuranceImage}>
                  <img src={ImageVerified} alt="Vérifié" />
                </div>
                <div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero at quidem obcaecati odio?</p>
                </div>
              </div>
            </div>
            <div className='d-flex flex-column'>
              <div className={styles.reassuranceContent}>
                <div className={styles.reassuranceImage}>
                  <img src={ImageEasy} alt="Facile" />
                </div>
                <div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero at quidem obcaecati odio?</p>
                </div>
              </div>
              <div className={styles.reassuranceContent}>
                <div className={styles.reassuranceImage}>
                  <img src={ImageSupportClient} alt="Support Client" />
                </div>
                <div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero at quidem obcaecati odio?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stepContainer} >
          <div className="container"> 
          <h3 ref={ContentTwo}>Comment ça marche ?</h3>
          <div className='d-flex flex-row justify-content-around'>
          

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
          <div className='' >
            <div > 
            <div className='container'>
            <h3 ref={ContentThree}>Des partenaires de confiance</h3>
            
            <PartnerSlider/>
            </div>   

            </div>
          </div>
          <div>
          <div className='container'>
          <h3 ref={ContentFour}>Notre F.A.Q</h3>
            <Accordion/>
          </div>
        </div>
        </div>
        
    </div>
  );
}
