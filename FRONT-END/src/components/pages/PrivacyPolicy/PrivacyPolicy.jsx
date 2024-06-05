import React from 'react'
import { Link } from "react-router-dom"
import styles from "./PrivacyPolicy.module.scss"
import wrapperImage from "../../../assets/image/flexy-cyber-security-and-password-protection.png"

export default function PrivacyPolicy() {
  return (
    <div className={`${styles.PrivacyPolicyContainer}`}>
      <div className={ `${styles.wrapperTitles} d-flex justify-content-around`}>
        <div className={`${styles.Titles}`}>
          <h1>Politique de confidentialité</h1>
          <h2>Bienvenue sur Fest Connect. Nous attachons une grande importance à la protection de vos données personnelles et nous nous engageons à les traiter de manière transparente, confidentielle et sécurisée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles.</h2>
        </div>
        <div>
          <img src={wrapperImage} alt="secureDatasImage" />
        </div>
        
      </div>
      <div className={`${styles.contentContainer}`}>
        <h3>
          Présentation
        </h3>
        <p>
        Fest Connect (dont le siège social est situé au 123 Rue des Festivals, 75001 Paris, France), en sa qualité de responsable du traitement,
        attache une grande importance à la protection et au respect de votre vie privée. La présente politique
        vise à vous informer, conformément au Règlement n°2016-679 du 27 avril 2016 relatif à la protection
        des personnes physiques à l’égard du traitement des données à caractère personnel et à la libre
        circulation de ces données (ci-après dénommé le « Règlement »), de nos pratiques concernant la
        collecte, l’utilisation et le partage des informations que vous êtes amenés à nous fournir par le biais
        de notre site internet <a href="http://fest-connect.fr"> <span>Fest Connect</span></a>.
        </p>
        <p>
        Cette politique a pour but de vous informer sur les catégories de données personnelles que nous
          pourrions recueillir ou détenir sur vous, comment nous les utilisons, quels en sont les destinataires et
          avec qui nous les partageons, la durée pendant laquelle nous les conservons et comment nous les
          protégeons, enfin les droits dont vous disposez sur vos données personnelles. 
        </p>
        <h3>
          Les données que nous collectons
        </h3>
        <p>
        En utilisant Fest Connect, vous êtes amenés à nous transmettre des informations,
        dont certaines sont de nature à vous identifier et constituent de ce fait des données à caractère
        personnel (ci-après dénommées les « données »). C’est notamment le cas : 
          <ul>
            <li>
            <span>Lors de la création d’un compte :</span> lorsque vous créez un compte sur Fest Connect, nous recueillons des informations telles que votre nom, prénom, adresse email, numéro de téléphone et coordonnées de paiement.
            </li>
            <li>
            <span>Lorsque vous remplissez votre profil :</span> si vous êtes un prestataire, nous collectons des informations supplémentaires telles que votre expérience professionnelle, compétences, portfolio, photographies et vidéos professionnelles, liens vers des réseaux sociaux professionnels et vos disponibilités.
            </li>
            <li>
            <span>Lorsque vous vous abonnez à notre newsletter :</span> lorsque vous vous inscrivez pour recevoir notre newsletter, nous recueillons votre adresse email et vos préférences en matière de communication.
            </li>
            <li>
            <span>Lorsque vous passez commande :</span> lorsque vous demandez un devis ou réservez un prestataire, nous recueillons des informations sur l'événement, y compris la date, le lieu, le type d'événement, le budget estimé et toute exigence particulière.
            </li>
            <li>
            <span>Lors de l’utilisation du site :</span> nous collectons des informations techniques et de navigation, telles que votre adresse IP, le type de navigateur, le système d'exploitation, les pages visitées et la durée de la visite.
            </li>
          </ul>

        </p>
        <p>
        Ces informations contiennent notamment les données suivantes :

        <h4>Données des prestataires</h4>
        <ol>
          <li>Nom et prénom</li>
          <li>Coordonnées (adresse, email, téléphone)</li>
          <li>Informations professionnelles (expérience, compétences, portfolio)</li>
          <li>Photographies et vidéos professionnelles</li>
          <li>Liens vers des réseaux sociaux professionnels</li>
          <li>Disponibilités</li>
          <li>Avis et évaluations des clients</li>
        </ol>
        <h4>Données des clients</h4>
        <ol>
          <li>Nom et prénom</li>
          <li>Coordonnées (adresse, email, téléphone)</li>
          <li>Informations sur l'événement (date, lieu, type d'événement)</li>
          <li>Demandes spécifiques ou exigences particulières</li>
          <li>Avis et évaluations des prestataires</li>
        </ol>
        <h4>Données collectées automatiquement :</h4>
        <ol>
          <li>Adresse IP</li>
          <li>Données de navigation (pages visitées, durée de la visite, etc.)</li>
          <li>Cookies et technologies similaires</li>
        </ol>
        </p>
        <h3>Comment utilisons-nous les données que nous collectons ?</h3>
        <p>
        Nous utilisons les données que nous recueillons afin de :
        <ol>
          <li>Mettre en relation les prestataires et les clients</li>
          <li>Gérer les profils des prestataires et les demandes de devis des clients</li>
          <li>Améliorer nos services et l'expérience utilisateur</li>
          <li>Communiquer avec vous (notifications, newsletters, support client)</li>
          <li>Effectuer des analyses statistiques et de performance</li>
          <li>Assurer la sécurité de notre plateforme</li>
        </ol>
        </p>
        <p>
        Lors de la collecte des données, vous serez informé si certaines données doivent être obligatoirement
        renseignées ou si elles sont facultatives. Les données identifiées par un astérisque au sein du
        formulaire de collecte sont obligatoires. A défaut, l’exécution de votre demande pourra être restreinte. 
        </p>
        <h3>Qui sont les destinataires des données que nous collectons et pour quelles raisons leur
            transmettons-nous ces données ?</h3>
        <p>Les données collectées nous sont destinées en notre qualité de responsable du traitement notamment à notre service informatique et marketing.</p>
        <p>Conformément à la règlementation en vigueur, les Données peuvent être transmises aux autorités
          compétentes sur requête et notamment aux organismes publics, aux auxiliaires de justice, aux officiers
          ministériels, aux organismes chargés d’effectuer le recouvrement de créances, exclusivement pour
          répondre aux obligations légales, ainsi que dans le cas de la recherche des auteurs d’infractions
          commises sur internet.
        </p>
        <p>
        Vos données ne seront pas conservées au-delà de la durée strictement nécessaire aux finalités
        poursuivies telles qu’énoncées dans la présente politique et ce conformément au Règlement et aux
        lois applicables.
        </p>
        <p>
        A cet égard, les données utilisées sont conservées pendant 3 mois.
        </p>
        <p>
        Lorsque les durées de conservation arrivent à leur terme, vos données sont effacées ou anonymisées
        de manière à pouvoir les exploiter sans porter atteinte à vos droits. Néanmoins, vos données pourront
        être archivées au-delà des durées prévues pour les besoins de la recherche, la constatation et de la
        poursuite des infractions pénales dans le seul but de permettre, en tant que de besoin, la mise à
        disposition de vos données à l’autorité judiciaire.
        </p>
        <p>
        L’archivage implique que vos données ne seront plus consultables en ligne mais seront extraites et
        conservées sur un support autonome et sécurisé.
        </p>
        <p>Vos données ne font pas l’objet de transfert hors du territoire de l’Union européenne.</p>
        <h3>Comment vos données sont-elles protégées ? </h3>
        <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'accès non autorisé, la divulgation ou la destruction. Nos mesures incluent :
        <ol>
          <li>L'utilisation de protocoles de sécurité pour protéger les données transmises en ligne.</li>
          <li>Le stockage sécurisé des données.</li>
          <li>La limitation de l'accès aux données aux seuls employés et prestataires ayant besoin d'y accéder.</li>
        </ol>
        </p>
      <h3>Quels sont vos droits sur vos données ?</h3>
      <p>
      Conformément aux lois et règlements applicables en matière de protection des données personnelles,
      vous bénéficiez d’un certain nombre de droits relatifs à vos données, à savoir :
      <ul>
        <li><span>Un droit d’accès et d’information :</span> vous avez le droit d’être informé de manière concise,
          transparente, intelligible et facilement accessible de la manière dont vos Données sont
          traitées. Vous avez également le droit d’obtenir (i) la confirmation que des Données vous
          concernant sont traitées et, le cas échéant (ii) d’accéder à ces Données et d’en obtenir une
          copie.</li>
        <li><span>Un droit de rectification :</span> vous avez le droit d’obtenir la rectification des Données inexactes
          vous concernant. Vous avez également le droit de compléter les Données incomplètes vous
          concernant, en fournissant une déclaration complémentaire. En cas d’exercice de ce droit,
          nous nous engageons à communiquer toute rectification à l’ensemble des destinataires de vos
          données.</li>
        <li><span>Un droit d’effacement :</span> dans certains cas, vous avez le droit d’obtenir l’effacement de vos
          données. Cependant, ceci n’est pas un droit absolu et nous pouvons pour des raisons légales
          ou légitimes conserver ces données.</li>
        <li><span>Un droit à la limitation du traitement :</span> dans certains cas, vous avez le droit d’obtenir la
          limitation du traitement sur vos données.
        </li>
        <li><span>Un droit à la portabilité des données :</span> vous avez le droit de recevoir vos Données que vous
          nous avez fournies, dans un format structuré, couramment utilisé et lisible par une machine,
          pour votre usage personnel ou pour les transmettre à un tiers de votre choix. Ce droit ne
          s’applique que lorsque le traitement de vos Données est basé sur votre consentement, sur un
          contrat et que ce traitement est effectué par des moyens automatisés.
        </li>
        <li><span>Un droit d’opposition au traitement :</span>vous avez le droit de vous opposer à tout moment au
          traitement de vos Données pour les traitements basés sur notre intérêt légitime, une mission
          d’intérêt public et ceux à des fins de prospection commerciale. Ceci n’est pas un droit absolu
          et nous pouvons pour des raisons légales ou légitimes refuser votre demande d’opposition.
        </li>
        <li><span>Le droit de retirer votre consentement à tout moment :</span> vous pouvez retirer votre
          consentement au traitement de vos Données lorsque le traitement est basé sur votre
          consentement. Le retrait du consentement ne compromet pas la licéité du traitement fondé
          sur le consentement effectué avant ce retrait.
        </li>
        <li><span>Le droit de donner des directives concernant le sort de vos données après votre décès : </span> : vous
          avez le droit de nous donner des directives concernant l’utilisation de vos Données après votre
          décès.
        </li>
        <li><span>Le droit de déposer une plainte auprès d’une autorité de contrôle :</span> vous avez le droit de
            contacter votre autorité de protection des données pour vous plaindre de nos pratiques de
            protection des données personnelles.
        </li>
      </ul>
      </p>
      <p>Pour exercer vos droits, vous pouvez nous contacter à l'adresse suivante : contact@festconnect.com.</p>
      <h3>Modification de notre politique de confidentialité</h3>
      <p>Nous pouvons être amenés à modifier occasionnellement la présente politique, afin notamment de se
          conformer à toutes évolutions réglementaires, jurisprudentielles, éditoriales ou techniques. Le cas
          échéant, nous changerons la date de « dernière mise à jour » et indiquerons la date à laquelle les
          modifications ont été apportées. Lorsque cela est nécessaire, notamment mais pas exclusivement en
          cas de modification substantielle ou d’évènement particulier requérant la modification de la présente
          politique, nous vous informerons et/ou solliciterons votre accord. Nous vous conseillons de consulter
          régulièrement cette page pour prendre connaissance des éventuelles modifications ou mises à jour
          apportées à notre politique. 
      </p>
      <h3>Contact</h3>
      <p>
      Si vous avez des questions concernant cette politique de confidentialité ou la manière dont nous traitons vos données personnelles, veuillez nous contacter à :
     <ul>
      <li>Email : contact@festconnect.com</li>
      <li>Téléphone : +33 1 23 45 67 89</li>
      <li> Adresse : 123 Rue des Festivals, 75001 Paris, France</li>
    </ul> 
      </p>
      </div>
    </div>
  )
}
