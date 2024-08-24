import React, { useState } from 'react';
import { useLoaderData, useParams } from "react-router-dom";
import styles from "./Profile.module.scss";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HorizontalLinearStepper from './Stepper'; // Assurez-vous que ce composant est déjà configuré
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Profile() {
  const params = useParams();
  const user = useLoaderData();
  const [activeStep, setActiveStep] = useState(0);

  const schema = yup.object({
    businessname: yup.string().required("Le champ est obligatoire"),
    biography: yup.string().required("Le champ est obligatoire"),
    photo: yup.string().required("Le champ est obligatoire"),
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

  const steps = ['Parles-nous de toi', 'Choisis les services dans lesquels tu souhaites être répertorié', 'Délimites un secteur dans lequel tu peux te déplacer', "C'est fini"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Fonction pour rendre le formulaire correspondant à chaque étape
  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <div>    
          
            <div>
            <label htmlFor="businessname"> Comment s'intitules ton entreprise, ton entité,  </label>
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
              <label>Email:</label>
              <input type="email" name="email" />
            </div>
          
          </div>

        );
      case 1:
        return (
         
            <div>
              <label>Choisir des services:</label>
              <select multiple>
                <option value="service1">Service 1</option>
                <option value="service2">Service 2</option>
                <option value="service3">Service 3</option>
              </select>
            </div>
         
        );
      case 2:
        return (
          
            <div>
              <label>Secteur:</label>
              <input type="text" name="sector" />
            </div>
          
        );
      case 3:
        return (
          <div>
            <p>Merci d'avoir complété les étapes!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`mh-100 ${styles.Profile}`}>
      <div className={`container ${styles.ProfileContainer} d-flex flex-column center`}>
        <div className={styles.Stepper}>
          <HorizontalLinearStepper activeStep={activeStep} />
        </div>
        <div className={styles.FormContainer}>
        <form >
          {renderForm()}
        </form>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button 
          className='mj-btn-primary'
            s
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button  className='mj-btn-primary'onClick={activeStep === steps.length - 1 ? handleReset : handleNext}>
            {activeStep === steps.length - 1 ? 'Reset' : 'Next'}
          </Button>
        </Box>
        </div>
        
      </div>
    </div>
  );
}
