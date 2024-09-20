import React from 'react';
import Slider from 'react-slick';
import styles from "./Register.module.scss"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PartnerImage1 from "../../../assets/image/partenaires/logonest.gif"
import PartnerImage2 from "../../../assets/image/partenaires/bcom-logo.webp"
import PartnerImage3 from "../../../assets/image/partenaires/LOG-LIGT-ROOM-MAIL.webp"
import PartnerImage4 from "../../../assets/image/partenaires/Logo-gros-04.png.webp"
import PartnerImage5 from "../../../assets/image/partenaires/logo-sirocco.webp"
import PartnerImage6 from "../../../assets/image/partenaires/logo-prodrones-3.png"
import PartnerImage7 from "../../../assets/image/partenaires/Fnac-Logo-1985.jpg"


const PartnerSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false, // Désactiver les flèches de navigation
    };

    return (
        <Slider {...settings} className={`${styles.partenaireContainer}`}>
            <div className={`${styles.partner}`}>
                <img src={PartnerImage1} alt="Partner 1" />
            </div>
            <div className={`${styles.partner}`}>
                <img src={PartnerImage2} alt="Partner 2" />
            </div>
            <div className={`${styles.partner}`}>
                <img src={PartnerImage3} alt="Partner 3" />
            </div>
            <div className={`${styles.partner}`}>
                <img src={PartnerImage4} alt="Partner 4" />
            </div>
            <div className={`${styles.partner}`}>
                <img src={PartnerImage5} alt="Partner 5" />
            </div>
            <div className={`${styles.partner}`}>
                <img src={PartnerImage6} alt="Partner 6" />
            </div>
            <div className={`${styles.partner}`}> 
                <img src={PartnerImage7} alt="Partner 7" />
            </div>

        </Slider>
    );
};

export default PartnerSlider;
