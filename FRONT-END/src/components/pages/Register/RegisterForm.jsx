import styles from "./RegisterForm.module.scss"
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "../../../apis/users";
import { useNavigate } from "react-router-dom";
import RegisterRedirection from "./RegisterRedirection";



export default function RegisterForm() {

  const [feedback, setFeedback] = useState(null);
  // const [status, setStatus] = useState(0);
  const [showRedirection, setShowRedirection] = useState(false);
  // const navigate = useNavigate();

  const schema = yup.object({
    firstname: yup.string().required("Le champ est obligatoire"),
    surname : yup.string().required("Le champ est obligatoire"),
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
    rgpd: yup
      .boolean()
      .oneOf([true], "Vous devez accepter les termes et les conditions"),
  });


  //   valeurs par défaut
  const defaultValues = {
    firstname: "",
    surname:"",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rgpd: false,
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
    // handleResetFeedback();
    console.log(values);
    try {
      const response = await signup(values);
      console.log(response);
      setFeedback(response.message);
      // setFeedback("heeloo");
  //     // setStatus(response.status);
      setShowRedirection(true);
    } catch (error) {
      console.error(error);
    }
  }
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
        {
          !showRedirection ? (
            <div className={`${styles.RegisterForm} container`}>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h3>
                <form className='d-flex flex-column' onSubmit={handleSubmit(submit)}>
                  <div className="d-flex">
                    {/* FIRSTNAME */}
                    <div className="d-flex flex-column mr-30">
                      <label htmlFor="firstname">Prénom : </label>
                      <input 
                      type="text"
                      {...register("firstname")}
                      id="firstname" />
                      {errors.firstname && (
                      <p className="text-error">{errors.firstname.message}</p>
                      )}
                      {/* SURNAME */}
                      <label htmlFor="surname">Nom : </label>
                      <input 
                      type="text"
                      {...register("surname")}
                      id="surname"
                       />
                      {errors.surname && (
                      <p className="text-error">{errors.surname.message}</p>
                      )}
                    </div>
                    {/* EMAIL  */}
                    <div className="d-flex flex-column mr-30">
                      <label htmlFor="email">Adresse-mail : </label>
                      <input            
                      {...register("email")}
                      type="email"
                      id="email" 
                      />
                      {errors.email && <p className="text-error">{errors.email.message}</p>}
                      {/* USERNAME  */}
                      <label htmlFor="username">Pseudo :</label>
                      <input             
                      {...register("username")}
                      type="text"
                      id="username" 
                      />
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
                  <div className={`d-flex justify-content ${styles.rgpdInput}`} >
                      <label htmlFor="rgpd" className="mb-10">
                      <input type="checkbox" 
                      id="rgpd"
                      {...register("rgpd")}
                      />
                      En soumettant ce formulaire, vous acceptez que vos données personnelles soient traitées conformément à notre politique de confidentialité et aux dispositions du RGPD.
                      {errors.rgpd && <p className="text-error">{errors.rgpd.message}</p>}
                      </label>
                
                    </div>
                    <div className="d-flex justify-content-center mb-20">
                    <button className="mj-btn-primary">C'est parti !</button>
                    </div>
                </form>
            </div>
          ) : (
            <RegisterRedirection feedback={feedback}>
            </RegisterRedirection>
          )
        }

    </div>
  )
}
