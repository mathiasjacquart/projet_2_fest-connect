import styles from "./Avis.module.scss"


export default function Avis () {
    return(
        <div className={`${styles.avis}`}>
            <div className="container">
                <h3>Confiez nous l'organisation de vos plus belles fêtes</h3>
                <h4>Ils nous ont fait confiance, c'est à votre tour</h4>
            </div>
        </div>
    )
}