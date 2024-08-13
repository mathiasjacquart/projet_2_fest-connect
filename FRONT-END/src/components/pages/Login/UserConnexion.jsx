
import styles from "./UserConnexion.module.scss"
import {Link, NavLink} from "react-router-dom"
import React, { useState, useContext, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signin } from "../../../apis/users";
import ConnexionRedirection from "./UserConnexionRedirection";
import { UserContext } from "../../context/UserContext";


function Connexion({onClose}) {

  const [feedback, setFeedback] = useState(null);
  const [showLoginRedirection, setShowLoginRedirection] = useState(false);
  const { setConnectedUser } = useContext(UserContext);


  useEffect(() => { 
    let timer;
    if (showLoginRedirection) {
      timer = 
      setTimeout(() => {
        setShowLoginRedirection(false)
    }, 2000)
  }
  return () => clearTimeout(timer)
}, [showLoginRedirection]);


  // schéma de validation
  const schema = yup.object({
    email: yup
    .string()
    .required("Le champ est obligatoire")
    .email()
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "L'e-mail n'est pas valide"),
    password: yup.string().required("Le mot de passe est obligatoire"),
  });

  //   valeurs par défaut
  const defaultValues = {
    email: "",
    password: "",
  };

  //   méthodes utilisées par useForm et options : resolver fait le lien entre le formulaire et le schéma
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //   fonction de validation de formulaire
  async function submit(values) {
    handleResetFeedback();
    console.log(values);
    try {
      const response = await signin(values);
      if  (!response.message) {
        localStorage.setItem("user", JSON.stringify(response));
        setConnectedUser(response.user);
        setShowLoginRedirection(true);
        reset(defaultValues);
        onClose();

      } else {
        setFeedback(response.message);
        setShowLoginRedirection(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleResetFeedback() {
    setFeedback(null);
  }

  function handleCloseModal () {
    setShowLoginRedirection(false);
    
  }
  return (
    <>
    
      <div className={`${styles.modalBg}`}  onClick={onClose} >
          <div className={`${styles.modalContent}`} onClick={(e) => e.stopPropagation()} > 
          
            <div>
              <i onClick={onClose}className="fa-solid fa-xmark"></i>
            </div>
            {!showLoginRedirection ? (
            <div>
              <h3>Bienvenue !</h3>
              <form onSubmit={handleSubmit(submit)}>
                <div className='d-flex flex-column align-items-center'>
                  <label htmlFor="">E-mail :</label>
                  <input 
                  {...register("email")}
                  type="email"
                  id="email" 
                  placeholder='Adresse e-mail' />
                  {errors.email && <p className={`${styles.textError}`}>{errors.email.message}</p>}
                </div>
                <div className='d-flex flex-column align-items-center'>
                  <label htmlFor="">Mot de passe :</label>
                  <input 
                  {...register("password")}
                  type="password"
                  id="password" 
                  placeholder='Mot de passe' 
                  />
                  {errors.password && ( <p className={`${styles.textError}`}>{errors.password.message}</p>)}
                </div>
                <button className='mj-btn-primary'>
                  Se connecter
                </button>
                <div>
                  <p>Toujours pas inscrit ?  <Link onClick={onClose}to="/register"><span>Inscris-toi ici ! </span></Link></p>
                </div>
                <div>
                  <p className={`${styles.ForgottenPassword}`}> <span>Mot de passe oublié ? </span> </p>
                </div>

              </form>
            </div>
          ) : (
         
               <ConnexionRedirection feedback={feedback}> </ConnexionRedirection>
      
           

          )
          }       
 

          </div>
      </div>
    </>
  );
}

export default Connexion;
