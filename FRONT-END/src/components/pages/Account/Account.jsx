import React, { useState } from 'react'
import styles from "./Account.module.scss"
import { useLoaderData, useParams } from "react-router-dom"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Account() {
  const params = useParams();
  const user = useLoaderData();
  console.log(user.user.avatar);
  console.log(params);
  // console.log(user.avatar);
  const [editField, setEditField] = useState(null);

  const schema = yup.object({
    firstname: yup.string(),
    surname: yup.string(),
    username: yup.string(),
    email: yup
      .string()
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email non valide"),
    password: yup
      .string()
      .min(9, "Mot de passe trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("password"), ""], "Les mots ne correspondent pas"),
    role: yup.string(),
    avatar: yup
    .string()
  });

  const defaultValues = {
    firstname: user.user.firstname,
    surname: user.user.surname,
    username: user.user.username,
    email: user.user.email,
    password: user.user.password,
    confirmPassword: "",
    role: user.user.role,
    avatar:user.user.avatar,
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

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:4560/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        console.log('User updated successfully', updatedUser);
        setEditField(null); // Sortir du mode édition après la mise à jour réussie
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleCancel = () => {
    setEditField(null);
  };


  return (
    <div className={`mh-100 ${styles.Account}`}>
      <h3>Informations personnelles</h3>
      <div className={`mh-100  container ${styles.AccountContainer}`}>
        <div className={styles.avatar}>
            
        </div >
        <div className={styles.formUpdate}>
        <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex">
              <div className="d-flex flex-column mr-30">
                <label htmlFor="firstname">Prénom : </label>
                {editField === 'firstname' ? (
                <>
                  <input
                    type="text"
                    id="firstname"
                    {...register('firstname')}
                  />
                  <p>{errors.firstname?.message}</p>
                  <button type="submit">Valider</button>
                  <button type="button" onClick={handleCancel}>Annuler</button>
                </>
              ) : (
                <>
                  <span>{user.firstname}</span>
                  <button type="button" onClick={() => handleEdit('firstname')}>Modifier</button>
                </>
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
                  <p className="text-error">{errors.confirmPassword.message}</p>
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
                  Je propose mes services pour un évènement 
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

            <div className="d-flex justify-content-center mb-20">
              <button className="mj-btn-primary">Enregister mes modifications</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
