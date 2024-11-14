import React, { useState, useContext, useEffect } from 'react';
import styles from "./Account.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from '../../context/UserContext';

export default function Account() {
  const { user, setConnectedUser } = useContext(UserContext);
  const [editField, setEditField] = useState(null);
  const [currentValues, setCurrentValues] = useState({});

  useEffect(() => {
    if (user) {
      setCurrentValues(user);
    }
  }, [user]);

  const schemas = {
    firstname: yup.object({
      firstname: yup.string().required("Le prénom est requis"),
    }),
    surname: yup.object({
      surname: yup.string().required("Le nom est requis"),
    }),
    username: yup.object({
      username: yup.string().required("Le pseudo est requis"),
    }),
    email: yup.object({
      email: yup
        .string()
        .required("L'adresse email est requise")
        .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email non valide"),
    }),
    role: yup.object({
      role: yup
        .string()
        .oneOf(["Client", "Prestataire"], "Le rôle doit être soit 'Client' soit 'Prestataire'")
        .required("Le rôle est requis"),
    }),
    password: yup.object({
      password: yup.string().min(9, "Mot de passe trop court").required("Mot de passe requis"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("Confirmation requise"),
    }),
  };

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleCancel = () => {
    setEditField(null);
  };

  function updateUserInLocalStorage(updatedUser) {
    const userStorage = JSON.parse(localStorage.getItem("user"));

    if (userStorage) {
      const updatedStorage = {
        ...userStorage,
        user: updatedUser,
      };

      localStorage.setItem("user", JSON.stringify(updatedStorage));
    }
  }

  const onSubmit = async (data, field) => {
    try {
      const updatedValues = {
        ...currentValues,
        [field]: data[field],
      };

      const response = await fetch(`https://fest-connect.onrender.com/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser);
        setConnectedUser(updatedUser);
        updateUserInLocalStorage(updatedUser);
        setCurrentValues(updatedUser);
        setEditField(null);

        console.log('User updated successfully', updatedUser);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderPersonalForm = (field, label) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: { [field]: currentValues[field] },
      resolver: yupResolver(schemas[field]),
      mode: "onChange",
    });

    return (
      <form
        className="d-flex align-items-center jc-between mb-20"
        onSubmit={handleSubmit((data) => onSubmit(data, field))}
      >
        <label htmlFor={field} className="mr-10">
          {label} :
        </label>
        {editField === field ? (
          <>
            <input
              type="text"
              id={field}
              {...register(field)}
              className="mr-10"
            />
            <div>
              <button className="mj-btn-primary m-10" type="submit">
                Valider
              </button>
              <button
                className="mj-btn-primary m-10"
                type="button"
                onClick={() => {
                  reset({ [field]: currentValues[field] });
                  handleCancel();
                }}
              >
                Annuler
              </button>
            </div>
            {errors[field] && (
              <p className="text-error">{errors[field]?.message}</p>
            )}
          </>
        ) : (
          <>
            <p className="mr-10">{currentValues[field]}</p>
            <button
              type="button"
              className="mj-btn-primary m-10"
              onClick={() => handleEdit(field)}
            >
              Modifier
            </button>
          </>
        )}
      </form>
    );
  };

  const renderRoleForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: { role: currentValues.role },
      resolver: yupResolver(schemas.role),
      mode: "onChange",
    });

    return (
      <form
        className="d-flex align-items-center jc-between mb-20"
        onSubmit={handleSubmit((data) => onSubmit(data, 'role'))}
      >
        <label >Rôle :</label>
        {editField === 'role' ? (
          <>
            <div >
              <label className={styles.labelRadio}>
                <input
                  type="radio"
                  value="Client"
                  {...register("role")}
                />
                Client
              </label>
              <label className={styles.labelRadio}>
                <input
                  type="radio"
                  value="Prestataire"
                  {...register("role")}
                />
                Prestataire
              </label>
            </div>
            <div>
              <button className="mj-btn-primary m-10" type="submit">
                Valider
              </button>
              <button
                className="mj-btn-primary m-10"
                type="button"
                onClick={() => {
                  reset({ role: currentValues.role });
                  handleCancel();
                }}
              >
                Annuler
              </button>
            </div>
            {errors.role && <p className="text-error">{errors.role?.message}</p>}
          </>
        ) : (
          <>
            <p className="mr-10">{currentValues.role}</p>
            <button
              type="button"
              className="mj-btn-primary m-10"
              onClick={() => handleEdit('role')}
            >
              Modifier
            </button>
          </>
        )}
      </form>
    );
  };

  const renderPasswordForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schemas.password),
      mode: "onChange",
    });

    return (
      <form
        className="d-flex align-items-center jc-between mb-20"
        onSubmit={handleSubmit((data) => onSubmit(data, 'password'))}
      >
        <label htmlFor="password" className="mr-10">
          Mot de passe :
        </label>
        {editField === 'password' ? (
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
            <div>
              <button className="mj-btn-primary m-10" type="submit">
                Valider
              </button>
              <button
                className="mj-btn-primary m-10"
                type="button"
                onClick={() => {
                  reset();
                  handleCancel();
                }}
              >
                Annuler
              </button>
            </div>
            {errors.password && (
              <p className="text-error">{errors.password?.message}</p>
            )}
            {errors.confirmPassword && (
              <p className="text-error">{errors.confirmPassword?.message}</p>
            )}
          </>
        ) : (
          <>
            <p className="mr-10">********</p>
            <button
              type="button"
              className="mj-btn-primary m-10"
              onClick={() => handleEdit('password')}
            >
              Modifier
            </button>
          </>
        )}
      </form>
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`mh-100 ${styles.Account}`}>
      <h3>Informations personnelles</h3>
      <div className={`container ${styles.AccountContainer}`}>
        <div className={styles.avatar}>
        </div>
        <div className={styles.formUpdate}>
          {renderPersonalForm("firstname", "Prénom")}
          {renderPersonalForm("surname", "Nom")}
          {renderPersonalForm("username", "Pseudo")}
          {renderPersonalForm("email", "Adresse-mail")}
          {renderRoleForm()} 
          {renderPasswordForm()}
        </div>
      </div>
    </div>
  );
}
