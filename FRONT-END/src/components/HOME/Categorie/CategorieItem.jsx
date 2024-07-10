import styles from "./CategorieItem.module.scss";
import React, { useState } from "react";
import { useSpring, animated as a } from "@react-spring/web";

export default function CategorieItem({ c }) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className={styles.container} onClick={() => set((state) => !state)}>
      <a.div
        className={styles.card}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          backgroundImage: `url(${c.urlCategory})`,
        }}
      />
      <a.div
        className={`${styles.card} ${styles.front}`}
        style={{
          opacity,
          transform,
          backgroundImage: `url(${c.urlCategory})`,
        }}
      >
        <p>{c.nameCategory}</p>
        <div className={styles.overlay} />
      </a.div>
    </div>
  );
}
