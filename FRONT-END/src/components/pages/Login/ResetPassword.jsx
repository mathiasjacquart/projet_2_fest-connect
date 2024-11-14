import React from 'react'
import * as yup from "yup";
import { useForm, } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ResetPassword.module.scss"
import { useParams } from 'react-router-dom';
import { useState } from "react";


export default function ResetPassword() {
  const [feedbackPassword, setfeedbackPassword ] = useState(null)
  const { id } = useParams();  
  console.log(id);
    const schemaPassword = yup.object({
        password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(9, "Mot de passe trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("password"), ""], "Les mots ne correspondent pas"),
      });
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        reset: resetPassword,
        formState: { errors: errorsPassword },
      } = useForm({
        defaultValues: { password: "********",
          confirmPassword:"********"
         },
        mode: "onChange",
        resolver: yupResolver(schemaPassword),
      });

      async function submitPassword(values) {
        try {
          const response = await fetch(`https://fest-connect.onrender.com/api/users/resetPassword/${id}`, {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
          });
          console.log(await response.json());
          setfeedbackPassword(response.message)
        } catch (error) {
          console.error(error);
        }
        resetPassword();
      }
  return (
    <div className={`${styles.ResetPassword} mh-100 d-flex center`}>
        
        <form onSubmit={handleSubmitPassword(submitPassword )}>
        <div className="d-flex flex-column align-items-center">
        <h3>Changement de mot de passe</h3>
            <div className='d-flex flex-column'>
            <label htmlFor="password">Mot de passe :</label>
                <input
                  type="password"
                  {...registerPassword("password")}
                  id="password"
                />
                {errorsPassword.password && (
                  <p className="text-error">{errorsPassword.password.message}</p>
                )}
                <label htmlFor="confirmPassword">
                  Confirmation de mot de passe :
                </label>
                <input
                  type="password"
                  {...registerPassword("confirmPassword")}
                  id="confirmPassword"
                />
                {errorsPassword.confirmPassword && (
                  <p className="text-error">{errorsPassword.confirmPassword.message}</p>
                )}
            </div>
            <div>
                {feedbackPassword && <p>{feedbackPassword}</p>}
            </div>
            <button type="submit" className="mj-btn-primary">
                Réinitialiser son mot de passe
              </button>
            
              </div>

        </form>
    </div>
  )
}
