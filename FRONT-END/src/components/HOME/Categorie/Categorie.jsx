import { useEffect, useState } from "react";
import styles from "./Categorie.module.scss";
import CategorieItem from "./CategorieItem";
import { getAllCategories } from "../../../apis/categorie";

export default function Categorie() {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesFromApi = await getAllCategories();
        setAllCategories(categoriesFromApi);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className={styles.categorie}>
      <div className="container">
        <h3>Trouvez le prestataire qu'il vous faut</h3>
        <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h4>
        <div className={styles.items}>
          {allCategories.map((c) => (
            <CategorieItem key={c._id} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
