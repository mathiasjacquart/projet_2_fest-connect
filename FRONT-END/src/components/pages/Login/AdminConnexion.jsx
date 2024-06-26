import styles from "./AdminConnexion.module.scss"
import {Link} from "react-router-dom"
import React, { useState, useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signin } from "../../../apis/admin";
// import ConnexionRedirection from "./UserConnexionRedirection";
import { AdminContext } from "../../context/AdminContext"

function AdminConnexion() {

  const [feedback, setFeedback] = useState(null);
  // const [showLoginRedirection, setShowLoginRedirection] = useState(false);
  const { setConnectedAdmin } = useContext(AdminContext);

  // schéma de validation
  const schema = yup.object({
    identifier: yup
      .string()
      .required("Le champ est obligatoire")
      .test(
        "test-identifier",
        "L'email ou le nom d'utilisateur n'est pas valide",
        (value) => {
          const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
          const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
          return emailRegex.test(value) || usernameRegex.test(value);
        }
      ),
    password: yup.string().required("Le mot de passe est obligatoire"),
  });

  // valeurs par défaut
  const defaultValues = {
    identifier: "",
    password: "",
  };

  // méthodes utilisées par useForm et options : resolver fait le lien entre le formulaire et le schéma
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

  // fonction de validation de formulaire
  async function submit(values) {
    handleResetFeedback();
    console.log(values);
    try {
      const response = await signin(values);
      if (!response.message) {
        localStorage.setItem("admin", JSON.stringify(response));
        setConnectedAdmin(response.admin);
        // setShowLoginRedirection(true);
        reset(defaultValues);
      } else {
        setFeedback(response.message);
        // setShowLoginRedirection(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleResetFeedback() {
    setFeedback(null);
  }

  return (
    <>
      <div className={`mh-100 d-flex center ${styles.body}`}> 
        <div className={`d-flex center flex-column ${styles.modal}`}>
          <h3>Fest Connect</h3>
          <form onSubmit={handleSubmit(submit)}>
            <div className='d-flex flex-column align-items-center'>
              <label htmlFor="identifier">Email ou Nom d'utilisateur :</label>
              <input 
                {...register("identifier")}
                type="text"
                id="identifier" 
                placeholder="Adresse e-mail ou Nom d'utilisateur" 
              />
              {errors.identifier && <p className={`${styles.textError}`}>{errors.identifier.message}</p>}
            </div>
            <div className='d-flex flex-column align-items-center'>
              <label htmlFor="password">Mot de passe :</label>
              <input 
                {...register("password")}
                type="password"
                id="password" 
                placeholder='Mot de passe' 
              />
              {errors.password && ( <p className={`${styles.textError}`}>{errors.password.message}</p>)}
            </div>
            <div className="d-flex justify-content-center w-100 my-10">
              <button className='mj-btn-primary'>
                Se connecter
              </button>
            </div>
          </form>
        </div>
        {feedback && <p>{feedback}</p>}    
      </div>
    </>
  );
}

export default AdminConnexion;
