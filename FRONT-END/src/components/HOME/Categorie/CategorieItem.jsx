import styles from "./CategorieItem.module.scss";
import React, { useState } from "react";
import { useSpring, animated as a } from "@react-spring/web";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function CategorieItem({ c}) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className={styles.container} >

      <a.div
        className={`${styles.card} ${styles.front}`}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          backgroundImage: `url(${c.urlCategory})`,
        }}
      >
        <div className={`${styles.CircleArrow}`} onClick={() => set((state) => !state)}>
          <KeyboardArrowRightIcon
          sx={{
            color:"white"

          }}/>
      </div>
        <p>{c.nameCategory}</p>
        <div className={styles.overlay} />
      </a.div>
      <a.div
        className={`${styles.card} ${styles.back}`}
        style={{
          opacity: opacity.to((o) => o),
          transform: transform.to(t => `${t} rotateY(180deg)`),
          backgroundImage: `url(${c.urlCategory})`,
        }}  
      >
           <div className={`${styles.CircleArrow}`} onClick={() => set((state) => !state)}>
          <KeyboardArrowRightIcon
          sx={{
            color:"white"

          }}/>
      </div>
        {c.subCategories.map((subCategory, index) => (
          <article className="mb-1°"key={index}>{subCategory.nameSubCategory}</article>
        ))}
    
        <div className={styles.overlay} />
      </a.div>
    </div>
  );
}
