import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendEmailPassword, signin } from "../../../apis/users";
import { UserContext } from "../../context/UserContext";
import styles from "./UserConnexion.module.scss";
import ConnexionRedirection from "./UserConnexionRedirection";
import { Link, useNavigate } from "react-router-dom";

function Connexion({ onClose }) {
  const [feedback, setFeedback] = useState(null);
  const [showLoginRedirection, setShowLoginRedirection] = useState(false);
  const { setConnectedUser } = useContext(UserContext);
  const [forgottenPassword, setForgottenPassword] = useState(false);
  const navigate = useNavigate();
  const [feedbackEmail, setFeedbackEmail] = useState(null);

  const [redirectionTimeout, setRedirectionTimeout] = useState(null);

  useEffect(() => {
    if (showLoginRedirection) {
      // Lancer un timer de 5 secondes quand la redirection est affichée
      const timer = setTimeout(() => {
        setShowLoginRedirection(false); // Masquer la redirection après 5 secondes
      }, 3000);

      // Nettoyer le timer quand le composant est démonté ou quand showLoginRedirection est changé
      setRedirectionTimeout(timer);
      return () => clearTimeout(timer);
    }
  }, [showLoginRedirection]);
  // Schéma pour la connexion
  const schemaLogin = yup.object({
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("L'e-mail n'est pas valide"),
    password: yup.string().required("Le mot de passe est obligatoire"),
  });

  // Schéma pour l'email
  const schemaEmail = yup.object({
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .email("L'e-mail n'est pas valide"),
  });

  // useForm pour la connexion
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLogin,
    formState: { errors: errorsLogin },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    resolver: yupResolver(schemaLogin),
  });

  // useForm pour l'email
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    reset: resetEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    defaultValues: { email: "" },
    mode: "onChange",
    resolver: yupResolver(schemaEmail),
  });

  // Fonction de soumission pour la connexion
  const handleSubmit = async (values) => {
    try {
      const response = await signin(values);
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(response));
        setConnectedUser(response.user);
        setShowLoginRedirection(true);
        resetLogin();
        onClose();
      } else {
        setFeedback(response.message);
        setShowLoginRedirection(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function submitEmail(value) {
    try {
      const response = await sendEmailPassword(value);
      console.log(response);
      if (response.status === 200) {
        setFeedbackEmail(response.message);
      } else {
        setFeedbackEmail(response.message);
      }
      setForgottenPassword(true); // Reste sur la page de mot de passe oublié
    } catch (error) {
      console.error(error);
    }
    resetEmail();
  }

  function handleForgottenPassword() {
    setForgottenPassword(true);
  }

  function handleResetFeedback() {
    setFeedback(null);
  }

  return (
    <div className={`${styles.modalBg}`} onClick={onClose}>
      <div
        className={`${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <i onClick={onClose} className="fa-solid fa-xmark"></i>
        </div>

        {forgottenPassword ? (
          <div>
            <h3>Mot de passe oublié ?</h3>
            <form
              className={styles.ResetPassword}
              onSubmit={handleSubmitEmail(submitEmail)}
            >
              <div className="d-flex flex-column align-items-center">
                <label htmlFor="email">E-mail :</label>
                <input
                  autoComplete="on"
                  {...registerEmail("email")}
                  type="email"
                  id="email"
                  placeholder="Adresse e-mail"
                />
                {errorsEmail.email && (
                  <p className={`${styles.textError}`}>
                    {errorsEmail.email.message}
                  </p>
                )}
                {feedbackEmail && <p>{feedbackEmail}</p>}
              </div>

              <button className="mj-btn-primary">Envoyer</button>
            </form>
          </div>
        ) : showLoginRedirection ? (
          <ConnexionRedirection feedback={feedback} />
        ) : (
          <div>
            <h3>Bienvenue !</h3>
            <form onSubmit={handleSubmitLogin(handleSubmit)}>
              <div className="d-flex flex-column align-items-center">
                <label htmlFor="email">E-mail :</label>
                <input
                  {...registerLogin("email")}
                  type="email"
                  id="email"
                  placeholder="Adresse e-mail"
                />
                {errorsLogin.email && (
                  <p className={`${styles.textError}`}>
                    {errorsLogin.email.message}
                  </p>
                )}
              </div>
              <div className="d-flex flex-column align-items-center">
                <label htmlFor="password">Mot de passe :</label>
                <input
                  {...registerLogin("password")}
                  type="password"
                  id="password"
                  placeholder="Mot de passe"
                />
                {errorsLogin.password && (
                  <p className={`${styles.textError}`}>
                    {errorsLogin.password.message}
                  </p>
                )}
              </div>
              <button type="submit" className="mj-btn-primary">
                Se connecter
              </button>
              <div>
                <p>
                  Toujours pas inscrit ?{" "}
                  <Link onClick={onClose} to="/register">
                    <span>Inscris-toi ici !</span>
                  </Link>
                </p>
              </div>
              <div>
                <p className={`${styles.ForgottenPassword}`}>
                  <span onClick={handleForgottenPassword}>
                    Mot de passe oublié ?
                  </span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connexion;
