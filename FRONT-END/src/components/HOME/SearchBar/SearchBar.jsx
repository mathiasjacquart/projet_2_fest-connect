import styles from "./SearchBar.module.scss"

export default function SearchBar() {
  return (
    <div className={`${styles.searchBar}`}>
      <form>
        <div>
          <p>Qu'est-ce que vous recherchez ?</p>
        </div>
        <div className={`d-flex flex-row align-items-center ${styles.form}`}>
          <div className={ `d-flex flex-column mr-15 ` }>
            <label>Je recherche :</label>
            <input type="text" placeholder="DJ, Chanteur, Musiciens..." />
          </div>
          <div className="d-flex flex-column">
            <label>Où ?</label>
            <input type="text" placeholder="Ville, code postal..."/>
          </div>
          
          <button className="mj-btn-primary">Rechercher</button>
        </div>
      </form>
    </div>
  )
}
