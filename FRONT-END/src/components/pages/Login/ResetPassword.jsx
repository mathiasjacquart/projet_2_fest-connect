import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ResetPassword.module.scss";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [feedbackPassword, setfeedbackPassword] = useState(null);
  const { id } = useParams();

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
    defaultValues: { password: "********", confirmPassword: "********" },
    mode: "onChange",
    resolver: yupResolver(schemaPassword),
  });

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id) {
      setfeedbackPassword(id);
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await resetPassword(values);
      if (response.ok) {
        setfeedbackPassword("Mot de passe réinitialisé avec succès");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.ResetPassword} mh-100 d-flex center`}>
      <form onSubmit={handleSubmitPassword(handleSubmit)}>
        <div className="d-flex flex-column align-items-center">
          <h3>Changement de mot de passe</h3>
          <div className="d-flex flex-column">
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
              <p className="text-error">
                {errorsPassword.confirmPassword.message}
              </p>
            )}
          </div>
          <div>{feedbackPassword && <p>{feedbackPassword}</p>}</div>
          <button type="submit" className="mj-btn-primary">
            Réinitialiser son mot de passe
          </button>
        </div>
      </form>
    </div>
  );
}
