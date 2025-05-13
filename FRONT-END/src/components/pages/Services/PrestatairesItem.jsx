import React from "react";
import styles from "./PrestatairesItem.module.scss";
import { Link } from "react-router-dom";

const PrestatairesItem = ({ p }) => {
  return (
    <div className={styles.PrestatairesItem}>
      <div className={styles.photo}>
        <img src={p.photo[0]} alt="photo profil" />
      </div>
      <div className={styles.infos}>
        <p className={styles.businessname}>{p.businessname}</p>
        <p className={styles.description}>{p.service.category.nameCategory}</p>
        <p className={styles.location}>
          {p.location.city}, {p.location.region} ({p.location.postalCode})
        </p>
        <div className="d-flex">
          <Link to={`/services/${p.id}`} className="mj-btn-primary">
            Voir le profil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrestatairesItem;
