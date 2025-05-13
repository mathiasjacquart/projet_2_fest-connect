import styles from "./AdminRegister.module.scss";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../../apis/admin";
import { useNavigate, Link } from "react-router-dom";
import RegisterRedirection from "./RegisterRedirection";

export default function RegisterForm() {
  const [feedback, setFeedback] = useState(null);
  // const [status, setStatus] = useState(0);
  const [showRedirection, setShowRedirection] = useState(false);
  // const navigate = useNavigate();

  const schema = yup.object({
    username: yup.string().required("Le champ est obligatoire"),
    email: yup
      .string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email non valide")
      .required("Le champ est obligatoire"),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(5, "trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("password"), ""], "Les mots ne correspondent pas"),
  });

  //   valeurs par défaut
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  const handleSubmit = async (values) => {
    try {
      const response = await signup(values);
      if (response.ok) {
        setFeedback("Inscription réussie");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // function handleResetFeedback() {
  //   setFeedback(null);
  // }

  return (
    <div className={`${styles.register}`}>
      <div className={`${styles.bgImg}`}>
        <div className={`${styles.titre}`}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
      </div>
      {!showRedirection ? (
        <div className={`${styles.RegisterForm} container`}>
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
          <form className="d-flex flex-column" onSubmit={handleSubmit(submit)}>
            <div className="d-flex">
              {/* EMAIL  */}
              <div className="d-flex flex-column mr-30">
                <label htmlFor="email">Adresse-mail : </label>
                <input {...register("email")} type="email" id="email" />
                {errors.email && (
                  <p className="text-error">{errors.email.message}</p>
                )}
                {/* USERNAME  */}
                <label htmlFor="username">Pseudo :</label>
                <input {...register("username")} type="text" id="username" />
                {errors.username && (
                  <p className="text-error">{errors.username.message}</p>
                )}
              </div>
              <div className="d-flex flex-column mr-30">
                {/* MDP  */}
                <label htmlFor="password">Mot de passe :</label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                />
                {errors.password && (
                  <p className="text-error">{errors.password.message}</p>
                )}
                {/* MDP CONFIRMATION */}
                <label htmlFor="">Confirmation de mot de passe :</label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  id="confirmPassword"
                />
                {errors.confirmPassword && (
                  <p className="text-error">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center mb-20">
              <button className="mj-btn-primary">C'est parti !</button>
            </div>
          </form>
        </div>
      ) : (
        <RegisterRedirection feedback={feedback}></RegisterRedirection>
      )}
    </div>
  );
}
