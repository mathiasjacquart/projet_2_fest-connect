import styles from "./RegisterForm.module.scss";
import { useState, useRef } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../../apis/users";
import { useNavigate, Link } from "react-router-dom";
import RegisterRedirection from "./RegisterRedirection";

export default function RegisterForm({
  handleClickOne,
  handleClickTwo,
  handleClickThree,
  handleClickFour,
}) {
  const [feedback, setFeedback] = useState(null);
  const [showRedirection, setShowRedirection] = useState(false);

  const schema = yup.object({
    firstname: yup.string().required("Le champ est obligatoire"),
    surname: yup.string().required("Le champ est obligatoire"),
    username: yup.string().required("Le champ est obligatoire"),
    email: yup
      .string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email non valide")
      .required("Le champ est obligatoire"),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(9, "Mot de passe trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("password"), ""], "Les mots ne correspondent pas"),
    role: yup.string().required("Veuillez sélectionner votre rôle"),
    rgpd: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les termes et les conditions"),
  });

  const defaultValues = {
    firstname: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    rgpd: false,
  };

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

  const handleSubmit = async (values) => {
    try {
      const response = await signup(values);
      if (response.ok) {
        setFeedback("Inscription réussie");
        setShowRedirection(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.register}`}>
      <div className={`${styles.bgImg}`}>
        <div className={`${styles.titre}`}>
          <p>REJOIGNEZ Fest Connect et TRANSFORMEZ vos ÉVÉNEMENTS ! </p>
        </div>
      </div>
      {!showRedirection ? (
        <div className={`${styles.RegisterForm} container`}>
          <h3>Créez votre profil et trouvez votre bonheur </h3>
          <div className="d-flex flex-row jc-between">
            <form
              className="d-flex flex-column"
              onSubmit={handleSubmit(submit)}
            >
              <div className="d-flex">
                <div className="d-flex flex-column mr-30">
                  <label htmlFor="firstname">Prénom : </label>
                  <input
                    type="text"
                    {...register("firstname")}
                    id="firstname"
                  />
                  {errors.firstname && (
                    <p className="text-error">{errors.firstname.message}</p>
                  )}
                  <label htmlFor="surname">Nom : </label>
                  <input type="text" {...register("surname")} id="surname" />
                  {errors.surname && (
                    <p className="text-error">{errors.surname.message}</p>
                  )}
                </div>
                <div className="d-flex flex-column mr-30">
                  <label htmlFor="email">Adresse-mail : </label>
                  <input type="email" {...register("email")} id="email" />
                  {errors.email && (
                    <p className="text-error">{errors.email.message}</p>
                  )}
                  <label htmlFor="username">Pseudo :</label>
                  <input type="text" {...register("username")} id="username" />
                  {errors.username && (
                    <p className="text-error">{errors.username.message}</p>
                  )}
                </div>
                <div className="d-flex flex-column mr-30">
                  <label htmlFor="password">Mot de passe :</label>
                  <input
                    type="password"
                    {...register("password")}
                    id="password"
                  />
                  {errors.password && (
                    <p className="text-error">{errors.password.message}</p>
                  )}
                  <label htmlFor="confirmPassword">
                    Confirmation de mot de passe :
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    id="confirmPassword"
                  />
                  {errors.confirmPassword && (
                    <p className="text-error">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div className={`${styles.radioTitle}`}>
                <label htmlFor="role">
                  Choisissez le rôle que vous souhaitez avoir sur Fest Connect :
                </label>
              </div>
              <div className={`${styles.radioButtonContainer}`}>
                <div className={`${styles.radioButton}`}>
                  <input
                    type="radio"
                    className={`${styles.radioButtonInput}`}
                    id="radio1"
                    name="role"
                    value="client"
                    {...register("role")}
                  />
                  <label
                    className={`${styles.radioButtonLabel}`}
                    htmlFor="radio1"
                  >
                    <span className={`${styles.radioButtonCustom}`}></span>
                    Je souhaite proposer mes services pour un évènement.
                  </label>
                </div>
                <div className={`${styles.radioButton}`}>
                  <input
                    type="radio"
                    className={`${styles.radioButtonInput}`}
                    id="radio2"
                    name="role"
                    value="prestataire"
                    {...register("role")}
                  />
                  <label
                    className={`${styles.radioButtonLabel}`}
                    htmlFor="radio2"
                  >
                    <span className={`${styles.radioButtonCustom}`}></span>
                    Je recherche un prestataire pour mon évènement
                  </label>
                </div>
                {errors.role && (
                  <p className="text-error">{errors.role.message}</p>
                )}
              </div>
              <div
                className={`d-flex justify-content align-items-center ${styles.rgpdInput}`}
              >
                <input
                  type="checkbox"
                  id="rgpd"
                  {...register("rgpd")}
                  className={`${styles.uiCheckbox}`}
                />
                <label htmlFor="rgpd" className="mb-10">
                  <p>
                    En soumettant ce formulaire, vous acceptez que vos données
                    personnelles soient traitées conformément à{" "}
                    <Link to="/politiques-de-confidentialité">
                      notre politique de confidentialité
                    </Link>{" "}
                    et aux dispositions du RGPD.
                  </p>
                </label>
              </div>
              {errors.rgpd && (
                <p className="text-error">{errors.rgpd.message}</p>
              )}
              <div className="d-flex justify-content-center mb-20">
                <button type="submit" className="mj-btn-primary">
                  Créer un compte
                </button>
              </div>
            </form>
            <div className={`d-flex flex-column ${styles.menu}`}>
              <p onClick={handleClickOne}>Pourquoi nous choisir ?</p>

              <p onClick={handleClickTwo}>Comment ça marche ? </p>
              <p onClick={handleClickThree}> Des partenaires de confiance</p>
              <p onClick={handleClickFour}>F.A.Q</p>
            </div>
          </div>
        </div>
      ) : (
        <RegisterRedirection feedback={feedback} />
      )}
    </div>
  );
}
