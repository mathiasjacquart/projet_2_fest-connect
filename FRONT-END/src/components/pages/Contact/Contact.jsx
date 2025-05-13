import styles from "./Contact.module.scss";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { sendMessage } from "../../../apis/contact";

export default function Contact() {
  const [feedback, setFeedback] = useState(null);
  const [showRedirection, setShowRedirection] = useState(false);

  const schema = yup.object({
    firstname: yup.string().required("Le champ est obligatoire"),
    surname: yup.string().required("Le champ est obligatoire"),
    email: yup
      .string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email non valide")
      .required("Le champ est obligatoire"),
    message: yup
      .string()
      .required("Le champ est obligatoire")
      .max(250, "Message trop long"),
  });

  const defaultValues = {
    firstname: "",
    surname: "",
    email: "",
    message: "",
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

  const onSubmit = async (values) => {
    try {
      const response = await sendMessage(values);
      if (response.ok) {
        setFeedback("Message envoyé avec succès");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.contact} mh-100`}>
      <div className={`${styles.contactBackground} `}>
        <div
          className={`${styles.contactContainer} container d-flex flex-row justify-content-around`}
        >
          <div className={`${styles.contentLeft} d-flex flex-column `}>
            {!showRedirection ? (
              <>
                <h3>Contactez-nous </h3>
                <form
                  className="d-flex flex-column"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="d-flex  flex-column">
                    <label htmlFor="firstname">Prénom : </label>
                    <input
                      placeholder="ex : Jean"
                      type="text"
                      {...register("firstname")}
                      id="firstname"
                    />
                    {errors.firstname && (
                      <p className={styles.textError}>
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                  <div className="d-flex  flex-column">
                    <label htmlFor="surname">Nom : </label>
                    <input
                      type="text"
                      {...register("surname")}
                      id="surname"
                      placeholder="ex : Morel"
                    />
                    {errors.surname && (
                      <p className={styles.textError}>
                        {errors.surname.message}
                      </p>
                    )}
                  </div>

                  <div className="d-flex flex-column">
                    <label htmlFor="email">Adresse-mail : </label>
                    <input
                      type="email"
                      {...register("email")}
                      id="email"
                      placeholder="contact@example.fr"
                    />
                    {errors.email && (
                      <p className={styles.textError}>{errors.email.message}</p>
                    )}
                  </div>
                  <div className="d-flex flex-column ">
                    <label htmlFor="message">Message:</label>
                    <textarea
                      placeholder="Ecrivez votre message ici (max: 250 caractères)"
                      {...register("message")}
                      id="message"
                    />
                    {errors.message && (
                      <p className={styles.textError}>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="d-flex justify-content-center">
                    <button className="mj-btn-primary">Envoyer</button>
                  </div>
                </form>
              </>
            ) : (
              <div className={styles.feedback}>
                <p>{feedback && <p>{feedback}</p>}</p>
              </div>
            )}
          </div>
          <div className={`${styles.contentRight} `}>
            <h3>A propos de nous</h3>
            <div>
              <p>
                Bienvenue sur <strong>FestConnect</strong>, la plateforme qui
                transforme vos idées d'événements en réalités mémorables.
              </p>
              <hr />
            </div>
            <div>
              <p>
                Nous sommes là pour <strong>vous accompagner</strong> à chaque
                étape de votre projet.{" "}
              </p>
              <hr />
            </div>
            <div>
              <p>
                N'hésitez pas à nous contacter pour{" "}
                <strong>discuter de vos idées, poser vos questions,</strong> ou
                simplement en savoir plus sur ce que nous pouvons faire pour
                vous.{" "}
              </p>
              <hr />
            </div>
            <div className={styles.LastP}>
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Ensemble, faisons de votre prochain événement un moment
                extraordinaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
