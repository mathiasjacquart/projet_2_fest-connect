import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import styles from "./Profile.module.scss";
import * as yup from "yup";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HorizontalLinearStepper from "./Stepper";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { getAllCategories } from "../../../apis/categorie";
import { getAllLocations } from "../../../apis/profile";
import { createProfile } from "../../../apis/profile";

export default function Profile() {
  //useState stockage des données
  const [activeStep, setActiveStep] = useState(0);
  const [imgPreviews, setImgPreviews] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [imgLinks, setImgLinks] = useState([]);
  const [selectedBusinessname, setSelectedBusinessname] = useState(null);
  const [selectedBiography, setSelectedBiography] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedSurrounding, setSelectedSurrounding] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationValue, setLocationValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPostalCode, setSelectedPostalCode] = useState("");
  const surroundingDistance = [10, 25, 50, 150, 300];

  // Réinitialiser l'état à chaque rechargement de la page
  useEffect(() => {
    setImgFiles([]);
    setImgLinks([]);
    setImgProgress({});
    setImgPreviews([]);
  }, []);
  useEffect(() => {
    if (imgFiles.length > 0) {
      imgFiles.forEach((file, index) => {
        uploadFile(file, index);
      });
    }
  }, [imgFiles]);
  // useEffect fetch des localisations et des catégories
  useEffect(() => {
    if (locationValue.length > 2) {
      const fetchLocations = async () => {
        const locationsFromApi = await getAllLocations(locationValue);
        setLocations(locationsFromApi);
      };
      fetchLocations();
    } else {
      setLocations([]);
    }
  }, [locationValue]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesFromApi = await getAllCategories();
        setCategories(categoriesFromApi);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  // fonctions sélection des catégories et sous catégorie

  const handleCategoryChange = (e) => {
    const category = categories.find((cat) => cat._id === e.target.value);
    setSelectedCategory(category._id);
    setSubCategories(category.subCategories);
    setSelectedSubCategories(); // Réinitialise les sous-catégories sélectionnées
  };

  // Fonction pour gérer la sélection de sous-catégorie
  const handleSubCategoryChange = (e) => {
    const subcategory = subCategories.find((sub) => sub._id === e.target.value);
    setSelectedSubCategories(subcategory._id); // Définit l'ID de la sous-catégorie sélectionnée
  };
  // CSS du composant Sélection
  const customStyles = {
    clearIndicator: (baseStyles) => ({
      ...baseStyles,
      cursor: "pointer",
      color: "grey",
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,

      borderRadius: "10px", // Arrondir les coins
      borderColor: state.isFocused
        ? "var(--mj-tertiary)"
        : "var(--mj-tertiary)", // Bordure grise si focus
      boxShadow: state.isFocused ? "0 0 0 1px var(--mj-tertiary)" : "none", // Effet de focus personnalisé
      "&:hover": {
        borderColor: "var(--mj-tertiary)", // Bordure lors du hover
      },
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: "var(--mj-tertiary)", // Couleur du placeholder
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "var(--mj-secondary)", // Couleur du texte sélectionné
      fontFamily: '"Montserrat", sans-serif', // Police
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      borderRadius: "10px", // Arrondir les coins du menu
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      color: "var(--mj-secondary)", // Couleur du texte tapé
    }),
    option: (baseStyles, { isFocused, isSelected }) => ({
      ...baseStyles,
      backgroundColor: isSelected
        ? "var(--mj-tertiary)"
        : isFocused
        ? "rgba(0, 0, 0, 0.1)"
        : null,
      color: "var(--mj-secondary)",
      fontFamily: '"Montserrat", sans-serif',
      "&:active": {
        backgroundColor: "var(--mj-tertiary)",
      },
    }),
  };
  // const ClearIndicator = (props) => {
  //   const {
  //     children = "✕", // Default cross icon
  //     getStyles,
  //     innerProps: { ref, ...restInnerProps },
  //   } = props;
  //   return (
  //     <div
  //       {...restInnerProps}
  //       ref={ref}
  //       style={getStyles("clearIndicator", props)}
  //     >
  //       {children}
  //     </div>
  //   );
  // };

  // Upload des photos dans Firebase
  const uploadFile = (file, index) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgLinks((prev) => [...prev, downloadUrl]);
        });
      }
    );
  };
  // création d'un tableau et affichage des photos chargés
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter(
      (file) =>
        !imgFiles.some((existingFile) => existingFile.name === file.name)
    ); // Filtrer les doublons

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    setImgFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // schéma du formulaire
  const schema = yup.object({
    businessname: yup.string().required("Le nom du profil est obligatoire"),
    biography: yup.string().required("La biographie est obligatoire"),
    photo: yup
      .array()
      .of(yup.string())
      .required("Au moins une photo est requise"),
    service: yup.object({
      category: yup.string().required("La catégorie est obligatoire"),
      subcategories: yup.array(),
    }),
    description: yup.string().required("La description est obligatoire"),
    location: yup
      .object({
        region: yup.string().required("La région est obligatoire"),
        city: yup.string().required("La ville est obligatoire"),
        postalCode: yup.string().required("Le code postal est obligatoire"),
      })
      .required("La localisation est obligatoire"),
    surrounding: yup.number().required("La distance maximale est obligatoire"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleBusinessnameChange = (e) =>
    setSelectedBusinessname(e.target.value);
  const handleBiographyChange = (e) => setSelectedBiography(e.target.value);
  const handleDescriptionChange = (e) => setSelectedDescription(e.target.value);
  const handleSurroundingChange = (e) => setSelectedSurrounding(e.target.value);

  const handleSubmit = async (values) => {
    try {
      const submissionData = {
        ...values,
        imgLinks,
        selectedCategory,
        selectedSubCategories,
        selectedBusinessname,
        selectedBiography,
        selectedDescription,
        selectedSurrounding,
        selectedPostalCode,
        selectedCity,
        selectedRegion,
      };
      const response = await createProfile(submissionData);
      if (response.ok) {
        setFeedback("Profil mis à jour avec succès");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(imgLinks);
  console.log(selectedCategory);
  console.log(selectedSubCategories);
  console.log(selectedBusinessname);
  console.log(selectedBiography);
  console.log(selectedDescription);
  console.log(selectedSurrounding);
  console.log(selectedPostalCode);
  console.log(selectedCity);
  console.log(selectedRegion);

  // étapes du Stepper MUI
  const steps = [
    "Parles-nous de toi",
    "Choisis les services dans lesquels tu souhaites être répertorié",
    "Délimites un secteur dans lequel tu peux te déplacer",
    "C'est fini",
  ];

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
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div className="d-flex flex-column">
                <label htmlFor="photo">Photos / Vidéos *</label>
                <p>
                  Mettez en avant votre talent en partageant des photos ou
                  vidéos de votre profil.
                </p>
                <input
                  className={`${styles.inputFile}`}
                  multiple
                  type="file"
                  id="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
                <div className="d-flex flex-row flex-wrap">
                  {imgPreviews.map((link, index) => (
                    <div key={index} className={styles.ButtonFile}>
                      <img
                        src={link}
                        alt={`Aperçu ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                        }}
                      />
                      {/* {imgProgress[imgFiles[index]?.name] > 0 && (
                        <p>Téléchargement: {imgProgress[imgFiles[index]?.name]}%</p>
                      )} */}
                    </div>
                  ))}
                  <div className={styles.ButtonFile}>
                    <div className="d-flex flex-column center">
                      <label for="file" className="">
                        <i class="fa-solid fa-circle-plus"></i>
                      </label>
                      <p>Ajoutez ici</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="businessname"> Nom du profil * </label>
              <p>
                Choisissez quelque chose qui représente votre entreprise et qui
                se démarque auprès des organisateurs de fêtes !
              </p>
              <input
                placeholder="Ecrivez ici..."
                className={styles.inputBusinessname}
                type="text"
                {...register("businessname")}
                id="businessname"
                value={selectedBusinessname}
                onChange={handleBusinessnameChange}
              />
              {errors.businessname && (
                <p className="text-error">{errors.businessname.message}</p>
              )}
            </div>

            <div className="d-flex flex-column">
              <label>Biographie *</label>
              <p>
                Partagez avec les organisateurs d'évènements ce qui vous rend
                unique en tant que prestataire.
              </p>
              <textarea
                placeholder="Ecrivez ici..."
                className={styles.inputBiography}
                type="text"
                {...register("biography")}
                name="biography"
                value={selectedBiography}
                onChange={handleBiographyChange}
              />
              {errors.biography && (
                <p className="text-error">{errors.biography.message}</p>
              )}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="d-flex flex-column">
            <div className="d-flex flex-column">
              <label>Type de service *</label>
              <p>
                Choisissez le service global qui correspond à votre activité.
              </p>
              <select
                {...register("service.category")}
                onChange={handleCategoryChange}
              >
                <option style={{ color: `#8D99AE !important` }} value="">
                  --Sélectionnez un service--
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.nameCategory}
                  </option>
                ))}
              </select>
              {errors.service?.category && (
                <p className="text-error">{errors.service?.category.message}</p>
              )}
              {subCategories.length > 0 && (
                <>
                  <label>Catégories *</label>
                  <p>
                    Sélectionnez la/les catégories qui décrivent le mieux votre
                    prestation.{" "}
                  </p>
                  <select
                    {...register("service.subcategory")}
                    onChange={handleSubCategoryChange}
                  >
                    <option style={{ color: `#8D99AE !important` }} value="">
                      --Sélectionnez une catégorie--
                    </option>
                    {subCategories.map((subCategory) => (
                      <option key={subCategory._id} value={subCategory._id}>
                        {subCategory.nameSubCategory}
                      </option>
                    ))}
                  </select>
                  {errors.service?.subcategories && (
                    <p className="text-error">
                      {errors.service?.subcategories.message}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="d-flex flex-column">
              <label>Description *</label>
              <p>
                {" "}
                Mettez en avant vos compétences et votre expérience pour aider
                les organisateurs à faire le meilleur choix.
              </p>
              <textarea
                placeholder="Ecrivez ici..."
                className={styles.inputBiography}
                type="text"
                {...register("description")}
                id="description"
                name="description"
                value={selectedDescription}
                onChange={handleDescriptionChange}
              />
              {errors.description && (
                <p className="text-error">{errors.description.message}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="d-flex flex-column">
              <label>Secteur *</label>
              <p>Déterminez la ville dans laquelle vous souhaitez travaillez</p>
              <Select
                // isClearable
                //  components={{ ClearIndicator }}
                {...register("location")}
                // styles={customStyles}

                onInputChange={(value) => setLocationValue(value)}
                options={locations}
                // value={selectedLocation}
                onChange={(selectedOption) => {
                  setSelectedRegion(selectedOption.region);
                  setSelectedCity(selectedOption.value);
                  setSelectedPostalCode(selectedOption.postalCode);
                }}
                placeholder="Recherchez une ville..."
              />
              {errors.location && (
                <p className="text-error">{errors.location.message}</p>
              )}
            </div>
            <div className="d-flex flex-column my-30">
              <label>Distance maximum à parcourir * </label>
              <p>
                Déterminez le nombre de kilomètres que vous pouvez effectuer
                pour votre prestation
              </p>
              <select
                {...register("surrounding")}
                value={selectedSurrounding}
                id="surrounding"
                onChange={handleSurroundingChange}
              >
                <option value="">--Sélectionnez une distance max--</option>
                {surroundingDistance.map((d) => (
                  <option key={d.index} value={d}>
                    {d} km
                  </option>
                ))}
              </select>
              {errors.surrounding && (
                <p className="text-error">{errors.surrounding.message}</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="d-flex flex-column center">
            <p
              style={{
                fontWeight: "600",
                marginBottom: "100px",
                width: "700px",
                textAlign: "center",
              }}
            >
              Vérifiez que toutes vos informations sont correctes, appuyer sur
              "Créer son profil" pour finaliser la création de votre profil !
            </p>
          </div>
        );
    }
  };

  return (
    <div className={` ${styles.Profile}`}>
      <div
        className={`container ${styles.ProfileContainer} d-flex flex-column center`}
      >
        <div className={styles.Stepper}>
          <HorizontalLinearStepper activeStep={activeStep} />
        </div>
        <div className={styles.FormContainer}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderForm()}
            <button
              style={{ marginBottom: "100px" }}
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="mj-btn-primary"
            >
              Créer son profil
            </button>
          </form>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              className="mj-btn-primary"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Précedent
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              className="mj-btn-primary"
              onClick={
                activeStep === steps.length - 1 ? handleReset : handleNext
              }
            >
              {activeStep === steps.length - 1 ? "Reset" : "Suivant"}
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}
