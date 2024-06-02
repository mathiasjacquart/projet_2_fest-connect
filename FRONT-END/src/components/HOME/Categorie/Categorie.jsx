import styles from "./Categorie.module.scss"
import CategorieItem from "./CategorieItem"
export default function Categorie() {
  return (
    <div className={`${styles.categorie}`}>
        <div className="container">
            <h3>Trouvez le prestataire qu'il vous faut</h3>
            <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </h4>
            <div className={`${styles.items}`}>
              <CategorieItem/>
            </div>
        </div>


    </div>
  )
}
