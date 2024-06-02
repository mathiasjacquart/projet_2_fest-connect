import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

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
    <div >
    {feedback && <p>{feedback}</p>}
    <p>Vous allez être redirigé vers la page de connexion dans 5 secondes...</p>
        
        
        

    </div>
  )
}
