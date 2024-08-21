import React, { useState } from 'react';
import styles from "./Account.module.scss";
import { useLoaderData, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Account() {
  const params = useParams();
  const user = useLoaderData();
  const [editField, setEditField] = useState(null);
  const [currentValues, setCurrentValues] = useState(user.user);
  const [backupValues, setBackupValues] = useState({});

  const schema = yup.object({
    firstname: yup.string().required("Le prénom est requis"),
    surname: yup.string().required("Le nom est requis"),
    username: yup.string().required("Le pseudo est requis"),
    email: yup
      .string()
      .required("L'adresse email est requise")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email non valide"),
    password: yup.string().min(9, "Mot de passe trop court").nullable(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ], "Les mots ne correspondent pas"),
    role: yup.string().required("Le rôle est requis"),
    avatar: yup.string(),
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: currentValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleEdit = (field) => {
    setBackupValues(currentValues); // Sauvegarder les valeurs actuelles
    setEditField(field);
  };

  const handleCancel = () => {
    // Revenir à la valeur précédente si l'édition est annulée
    setCurrentValues(backupValues);
    setEditField(null);
  };

  const onSubmit = async (data) => {
    try {
      // Mettre à jour les valeurs actuelles dans l'état
      const updatedValues = {
        ...currentValues,
        [editField]: data[editField] || currentValues[editField], // Met à jour uniquement le champ modifié
      };
      
      setCurrentValues(updatedValues);
      setEditField(null); // Quitter le mode édition après la mise à jour

      // Préparer les données à envoyer au serveur
      const response = await fetch(`http://localhost:4560/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('User updated successfully', updatedUser);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={`mh-100 ${styles.Account}`}>
      <h3>Informations personnelles</h3>
      <div className={` container ${styles.AccountContainer}`}>
        <div className={styles.avatar}>
          {/* Placeholder for avatar */}
        </div>
        <div className={styles.formUpdate}>
          <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
            {["firstname", "surname", "username", "email"].map((field) => (
              <div key={field} className="d-flex align-items-center jc-between mb-20">
                <label htmlFor={field} className="mr-10">
                  {field === "firstname" && "Prénom :"}
                  {field === "surname" && "Nom :"}
                  {field === "username" && "Pseudo :"}
                  {field === "email" && "Adresse-mail :"}
                </label>
                {editField === field ? (
                  <>
                    <input
                      type="text"
                      id={field}
                      {...register(field)}
                      defaultValue={currentValues[field]}
                      className="mr-10"
                    />
                    <div>
                      <button className='mj-btn-primary m-10' type="submit">Valider</button>
                      <button  className='mj-btn-primary m-10'type="button" onClick={handleCancel}>Annuler</button>
                    </div>
                    {errors[field] && <p className="text-error">{errors[field]?.message}</p>}
                  </>
                ) : (
                  <>
                  < div className='d-flex flex-row '>
                    <p className="mr-10">{currentValues[field]}</p>
                    
                  </div >
                  <div>
                    <button type="button" className='mj-btn-primary m-10' onClick={() => handleEdit(field)}>Modifier</button>
                  </div>
                  </>
                )}
              </div>
            ))}
            <div className="d-flex align-items-center jc-between mb-20">
              <label className="mr-10">Rôle :</label>
              {editField === "role" ? (
                <>
                  <div className="mr-10">
                    <input
                      type="radio"
                      id="client"
                      value="client"
                      {...register("role")}
                      defaultChecked={currentValues.role === "client"}
                    />
                    <label htmlFor="client" className="mr-20">Client</label>
                    <input
                      type="radio"
                      id="prestataire"
                      value="prestataire"
                      {...register("role")}
                      defaultChecked={currentValues.role === "prestataire"}
                    />
                    <label htmlFor="prestataire">Prestataire</label>
                  </div>
                  <div>
                    <button type="submit"   className='mj-btn-primary m-10'>Valider</button>
                    <button type="button"  className='mj-btn-primary m-10' onClick={handleCancel}>Annuler</button>
                  </div>
                  {errors.role && <p className="text-error">{errors.role?.message}</p>}
                </>
              ) : (
                <>
                  <span className="mr-10">{currentValues.role}</span>
                  <button type="button" className='mj-btn-primary m-10' onClick={() => handleEdit("role")}>Modifier</button>
                </>
              )}
            </div>
            <div className="d-flex align-items-center jc-between mb-20">
              <label className="mr-10">Mot de passe :</label>
              {editField === "password" ? (
                <>
                  <input
                    type="password"
                    id="password"
                    placeholder="Nouveau mot de passe"
                    {...register("password")}
                    className="mr-10"
                  />
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    {...register("confirmPassword")}
                    className="mr-10"
                  />
                  <div className='d-flex flex-row'>
                    <button type="submit" className='mj-btn-primary m-10'>Valider</button>
                    <button type="button"  className='mj-btn-primary m-10' onClick={handleCancel}>Annuler</button>
                  </div>
                  {errors.password && <p className="text-error">{errors.password?.message}</p>}
                  {errors.confirmPassword && <p className="text-error">{errors.confirmPassword?.message}</p>}
                </>
              ) : (
                <>
                  <span className="mr-10">•••••••••</span>
                  <button type="button"  className='mj-btn-primary m-10'onClick={() => handleEdit("password")}>Modifier</button>
                </>
              )}
            </div>
            <div className="d-flex justify-content-center mb-20">
              <button type="submit" className="mj-btn-primary">Enregistrer mes modifications</button>
            // </div>
          </form>
        </div>
      </div>
    </div>
  );
}
