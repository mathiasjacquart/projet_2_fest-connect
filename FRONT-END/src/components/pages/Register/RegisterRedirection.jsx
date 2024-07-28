import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.scss"

export default function ({feedback}) {
  console.log(feedback);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className='container d-flex center'>
      <div className={`${styles.Redirection}`}>
      <p>{feedback && <p>{feedback}</p>}</p>
    <p style={{
      color: '',
    }}>Vous allez être redirigé vers la page de connexion dans 5 secondes...</p>
      </div>
    </div>
  )
}
