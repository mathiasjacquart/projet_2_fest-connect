import React from 'react';
import { Link } from "react-router-dom";
import styles from "./MentionsLégales.module.scss";
import wrapperImage from "../../../assets/image/legalnoticeimage.png"; // Assurez-vous d'avoir une image appropriée

export default function LegalNotice() {
  return (
    <div className={`${styles.LegalNoticeContainer}`}>
      <div className={`${styles.wrapperTitles} d-flex justify-content-around`}>
        <div className={`${styles.Titles}`}>
          <h1>Mentions Légales</h1>
          <h2>Bienvenue sur Fest Connect. Conformément aux dispositions légales, nous vous informons sur les conditions d'utilisation de notre site, notre identification ainsi que vos droits en tant qu'utilisateur.</h2>
        </div>
        <div>
          <img src={wrapperImage} alt="legalNoticeImage" />
        </div>
      </div>
      <div className={`${styles.contentContainer}`}>
        <h3>Identification de l'éditeur</h3>
        <p>
          Le site <a href="http://fest-connect.fr"> <span>Fest Connect</span></a> est édité par la société Fest Connect, 
          société à responsabilité limitée (SARL) au capital de 10 000 €, dont le siège social est situé au 
          123 Rue des Festivals, 75001 Paris, France, immatriculée au Registre du Commerce et des Sociétés de 
          Paris sous le numéro 123 456 789.
        </p>
        <h3>Responsabilité éditoriale</h3>
        <p>
          Le directeur de la publication est Monsieur Jean Dupont, en qualité de Gérant de la société Fest Connect.
        </p>
        <h3>Hébergement</h3>
        <p>
          Le site est hébergé par la société OVH, dont le siège social est situé au 2 Rue Kellermann, 59100 Roubaix, France.
        </p>
        <h3>Propriété intellectuelle</h3>
        <p>
          L'ensemble des éléments du site Fest Connect, y compris les textes, graphismes, images, logos, 
          icônes, sons, logiciels, etc., sont la propriété exclusive de Fest Connect ou de ses partenaires 
          et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle. 
          Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des 
          éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation 
          écrite préalable de Fest Connect.
        </p>
        <h3>Utilisation du site</h3>
        <p>
          L'utilisateur s'engage à accéder et à utiliser le site <a href="http://fest-connect.fr"> <span>Fest Connect </span></a> 
           conformément aux lois en vigueur et aux présentes mentions légales. 
          L'utilisateur est notamment tenu de ne pas porter atteinte aux droits de propriété intellectuelle 
          de Fest Connect ou de ses partenaires, ni à l'ordre public.
        </p>
        <h3>Données personnelles</h3>
        <p>
          Pour plus d'informations sur la gestion de vos données personnelles, veuillez consulter notre 
          <Link to="/privacy-policy"><span> Politique de Confidentialité</span></Link>.
        </p>
        <h3>Responsabilité</h3>
        <p>
          Fest Connect s'efforce de fournir des informations exactes et à jour sur le site, mais ne saurait 
          être tenue pour responsable des erreurs, omissions ou résultats qui pourraient être obtenus en 
          utilisant ces informations. Fest Connect décline toute responsabilité en cas de dommage résultant 
          d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations diffusées 
          sur le site.
        </p>
        <h3>Liens hypertextes</h3>
        <p>
          Le site Fest Connect peut contenir des liens hypertextes vers d'autres sites. Fest Connect n'exerce 
          aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur fonctionnement.
        </p>
        <h3>Modifications des mentions légales</h3>
        <p>
          Fest Connect se réserve le droit de modifier les présentes mentions légales à tout moment. Les modifications 
          seront publiées sur cette page et entreront en vigueur dès leur mise en ligne. Nous vous recommandons de consulter 
          régulièrement cette page pour prendre connaissance des éventuelles modifications.
        </p>
        <h3>Contact</h3>
        <p>
          Si vous avez des questions concernant ces mentions légales, veuillez nous contacter à :
          <ul>
            <li>Email : contact@festconnect.com</li>
            <li>Téléphone : +33 1 23 45 67 89</li>
            <li>Adresse : 123 Rue des Festivals, 75001 Paris, France</li>
          </ul>
        </p>
      </div>
    </div>
  );
}
