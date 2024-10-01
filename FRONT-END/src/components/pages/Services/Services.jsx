import styles from "./Services.module.scss"
import backgroundImage from "../../../assets/image/services/backgroundService.jpg"
import SearchBarServices from "./SearchBar/SearchBarServices"
import { useEffect, useState } from "react"
import PrestatairesItem from "./PrestatairesItem"
import { getAllPrestataires} from "../../../apis/prestataires"
export default function Services() {

  const [allPrestataires, setAllPrestataires] = useState([])
  useEffect(() => {
    async function fetchPrestataires() {
      try {
        const prestatairesFromApi = await getAllPrestataires();
        setAllPrestataires(prestatairesFromApi);
        
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchPrestataires();
  }, []) ;
  console.log(allPrestataires);
  
  return (
    <div className={styles.Services}>
 
      <div className={styles.backgroundOverlay}>
          <img src={backgroundImage} alt="fête événement" />
          <SearchBarServices/>
      </div>
      <div className={styles.ServicesContainer}>
      <h3>Trouvez le prestataire qu'il vous faut</h3>
      <h4>Tous nos prestataires sont vérifiés au préalable</h4>
      <div className={styles.displayItems}>
        {allPrestataires.map((p) => (
          <PrestatairesItem key={p.id} p={p}></PrestatairesItem>
        ))}
      </div>
      </div>


    </div>
  )
}
