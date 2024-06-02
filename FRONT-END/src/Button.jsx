import styles from "./Button.module.scss"

export default function Button() {
  return (
    <div className={`d-flex ${styles.btnContainer}`}>
        <button className={`mj-btn-primary ${styles.btnPrimary}`}>À propos de nous</button>
        <button className={`mj-btn-primary ${styles.btnPrimary}`}>Rejoignez-nous</button>
    </div>
  )
}
