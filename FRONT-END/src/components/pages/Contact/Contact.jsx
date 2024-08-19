
import styles from "./Contact.module.scss"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react"
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

  async function submit(values) {
    console.log(values);
    try {
      const response = await sendMessage(values);
      console.log(response);
      setFeedback(response.message);
      setShowRedirection(true);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={`${styles.contact} mh-100`}>
      <div className={`${styles.contactBackground} `}>
         <div className={` container d-flex flex-row justify-content-around`}>
            <div className={`${styles.contentLeft} d-flex flex-column `} >
          {!showRedirection ? (
            <>
                      <h3>Contactez-nous </h3>
                      <form className="d-flex flex-column" onSubmit={handleSubmit(submit)} >

                          <div className={`${styles.surnameForm} d-flex flex-row `}>
                            <div className="d-flex  align-items-center">
                            <label htmlFor="firstname">Prénom : </label>
                            <input
                              type="text"
                              {...register("firstname")}
                              id="firstname"
                            />
                            {errors.firstname && (
                              <p className="text-error">{errors.firstname.message}</p>
                            )}
                            </div>
                            <div>
                            <label htmlFor="surname">Nom : </label>
                            <input type="text" {...register("surname")} id="surname" />
                            {errors.surname && (
                              <p className="text-error">{errors.surname.message}</p>
                            )}
                            </div>
     
                          </div>
                          <div className="d-flex flex-column">
                            <label htmlFor="email">Adresse-mail : </label>
                            <input type="email" {...register("email")} id="email" />
                            {errors.email && (
                              <p className="text-error">{errors.email.message}</p>
                            )}
                          </div>
                          <div className="d-flex flex-column ">
                            <label htmlFor="message">Message:</label>
                            <textarea
                      
                              {...register("message")}
                              id="message"
                            />
                            {errors.message && (
                              <p className="text-error">{errors.message.message}</p>
                            )}
            
                          </div>
            
                   
                        <div className="d-flex justify-content-center">
                          <button className="mj-btn-primary">Envoyer</button>
                        </div>
                      </form></>

          ) : (
              <>
              <p>{feedback && <p>{feedback}</p>}</p>
              </>
          )}



            </div>
            <div className={`${styles.contentRight} `}>

</div>
        </div>
      </div>
    </div>
  )
}
