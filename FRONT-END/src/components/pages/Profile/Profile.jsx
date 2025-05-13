import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import styles from "./Profile.module.scss";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import { getAllCategories } from "../../../apis/categorie";
import { getAllLocations, createProfile } from "../../../apis/profile";
import { UserContext } from "../../context/UserContext";

export default function Profile() {
  const { user, setConnectedUser, updateUser } = useContext(UserContext);

  const [imgPreviews, setImgPreviews] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [imgLinks, setImgLinks] = useState([]);
  const [businessname, setBusinessname] = useState("");
  const [biography, setBiography] = useState("");
  const [description, setDescription] = useState("");
  const [surrounding, setSurrounding] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationValue, setLocationValue] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [feedback, setFeedback] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isProfileExist, setIsProfileExist] = useState(false);
  const surroundingDistance = [10, 25, 50, 150, 300];

  // VERIFICATION SI LE USER A UN PROFIL PRESTATAIRE
  async function getPrestataireById(prestataireId) {
    try {
      const response = await fetch(
        `https://fest-connect.onrender.com/api/providers/${prestataireId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const prestataireData = await response.json();
      return prestataireData;
    } catch (error) {
      console.error("Failed to fetch prestataire data", error);
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      if (user?.prestataireId) {
        try {
          const prestataire = await getPrestataireById(user.prestataireId);

          if (prestataire) {
            setIsProfileExist(true);
            setBusinessname(prestataire.businessname);
            setBiography(prestataire.biography);
            setDescription(prestataire.description);
            setSelectedCategory(prestataire.service.category);
            setSelectedSubCategory(prestataire.service.subCategories);
            setImgPreviews(prestataire.photo);
            setRegion(prestataire.location.region);
            setCity(prestataire.location.city);
            setPostalCode(prestataire.location.postalCode);
            setSurrounding(prestataire.surrounding);
          }
        } catch (error) {
          console.error("Error fetching prestataire profile", error);
        }
      }
    }

    fetchProfile();
  }, [user]);

  // FONCTION UPDATE DES DONNEES DANS LA BDD
  async function updateProfile(submissionData) {
    try {
      const response = await fetch(
        `https://fest-connect.onrender.com/api/providers/${user.prestataireId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    } catch (error) {
      console.error("Error updating profile", error);
      return { ok: false, message: error.message };
    }
  }

  //AUTOCOMPLETION ET CHARGEMENT DES LOCATIONS DANS L'INPUT
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

  // FETCH DES CATEGORIES ET SOUS CATEGORIE DE LA BDD
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

  //ONCHANGE DU SELECT CATEGORIE (récupération de l'id category)
  const handleCategoryChange = (selectedOption) => {
    const category = categories.find((cat) => cat._id === selectedOption.value);
    setSelectedCategory(category._id);
    setSubCategories(category.subCategories);
    setSelectedSubCategory([]);
  };

  //ONCHANGE DU SELECT SOUSCATEGORIE (récupération des indexs du tableau)
  const handleSubCategoryChange = (selectedOptions) => {
    const selectedIndices = selectedOptions.map((option) => {
      return subCategories.findIndex((sub) => sub._id === option.value);
    });

    // Stocke les indices dans l'état
    setSelectedSubCategory(selectedIndices);
  };

  // AFFICHAGE DES DISTANCES DANS LE SELECT (react-select)
  const distanceOptions = surroundingDistance.map((distance) => ({
    value: distance,
    label: `${distance} km`,
  }));
  // ONCHANGE DES DISTANCES
  const handleDistanceChange = (selectedOption) => {
    setSurrounding(selectedOption ? selectedOption.value : "");
  };

  //UPLOAD DES PHOTOS SUR FIREBASE
  // const uploadFile = (file) => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, "images/" + fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {},
  //     (error) => {
  //       console.error(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
  //         setImgLinks((prev) => [...prev, downloadUrl]);
  //       });
  //     }
  //   );
  // };
  // FEUILLE DE STYLE DES SELECT DE REACT SELECT
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
      fontFamily: '"Montserrat", sans-serif', // Police
      fontSize: "14px",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "var(--mj-secondary)", // Couleur du texte sélectionné
      fontFamily: '"Montserrat", sans-serif', // Police
      fontSize: "14px",
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
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
      color: "grey", // Couleur de la croix
      ":hover": {
        backgroundColor: "#8D99AE", // Couleur de fond de la croix au survol
        color: "white", // Couleur de la croix au survol
      },
    }),
  };

  useEffect(() => {
    if (imgFiles.length > 0) {
      imgFiles.forEach((file) => uploadFile(file));
    }
  }, [imgFiles]);
  // ONCHANGE DES IMAGES
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImgFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImgPreviews(previews);
  };

  const uploadFile = (file) => {
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
          setImgLinks((prev) => {
            // Vérifier si l'image a déjà été ajoutée
            if (!prev.includes(downloadUrl)) {
              return [...prev, downloadUrl];
            }
            return prev;
          });
        });
      }
    );
  };
  console.log(imgFiles);
  console.log(imgPreviews);
  console.log(imgLinks);

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
  // SOUMISSION DU FORMULAIRE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("no user identifié");
      return;
    }

    const submissionData = {
      userId: user.id,
      businessname,
      biography,
      description,
      service: {
        category: selectedCategory,
        subCategories: selectedSubCategory,
      },
      photo: imgLinks,
      location: {
        region,
        city,
        postalCode,
      },
      surrounding,
    };

    try {
      let response;

      if (isProfileExist) {
        response = await updateProfile(submissionData);

        setFeedback(response.message);
      } else {
        response = await createProfile(submissionData);

        setFeedback(response.message);
      }

      const updatedUser = {
        ...user,
        prestataireId: response.prestataireId,
      };
      updateUser(updatedUser);
      updateUserInLocalStorage(updatedUser);

      setIsProfileExist(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={` ${styles.Profile}`}>
      <div
        className={`container ${styles.ProfileContainer} d-flex flex-column center`}
      >
        <h3>
          {isProfileExist ? "Modification du profil" : "Création du profil"}
        </h3>
        <div className={styles.FormContainer}>
          <form onSubmit={handleSubmit}>
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
                    onChange={handleImageChange}
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
                            objectFit: "cover",
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
                  Choisissez quelque chose qui représente votre entreprise et
                  qui se démarque auprès des organisateurs de fêtes !
                </p>
                <input
                  placeholder="Ecrivez ici..."
                  className={styles.inputBusinessname}
                  type="text"
                  id="businessname"
                  value={businessname}
                  onChange={(e) => setBusinessname(e.target.value)}
                />
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
                  name="biography"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                />
              </div>
            </div>

            <div className="d-flex flex-column">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <label>Type de service *</label>
                  <p>
                    Choisissez le service global qui correspond à votre
                    activité.
                  </p>
                  <Select
                    styles={customStyles}
                    options={categories.map((category) => ({
                      value: category._id,
                      label: category.nameCategory,
                    }))}
                    onChange={handleCategoryChange}
                    placeholder="Sélectionnez un service"
                  />

                  {subCategories.length > 0 && (
                    <>
                      <label>Catégories *</label>
                      <p>
                        Sélectionnez la/les catégories qui décrivent le mieux
                        votre prestation.
                      </p>
                      <Select
                        isMulti
                        options={subCategories.map((subCategory) => ({
                          value: subCategory._id, // Valeur de l'option
                          label: subCategory.nameSubCategory, // Texte affiché dans la liste
                        }))}
                        onChange={handleSubCategoryChange} // Fonction pour gérer les changements
                        placeholder="Sélectionnez une ou plusieurs catégories"
                        styles={customStyles}
                      />
                    </>
                  )}
                </div>
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
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="d-flex flex-column">
                <label>Secteur *</label>
                <p>
                  Déterminez la ville dans laquelle vous souhaitez travaillez
                </p>
                <Select
                  isClearable
                  styles={customStyles}
                  onInputChange={(value) => setLocationValue(value)}
                  options={locations}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      setRegion(selectedOption.region);
                      setCity(selectedOption.value);
                      setPostalCode(selectedOption.postalCode);
                    } else {
                      setRegion("");
                      setCity("");
                      setPostalCode("");
                    }
                  }}
                  placeholder="Recherchez une ville..."
                />
              </div>

              <div className="d-flex flex-column my-30">
                <label>Distance maximum à parcourir * </label>
                <p>
                  Déterminez le nombre de kilomètres que vous pouvez effectuer
                  pour votre prestation
                </p>
                <Select
                  value={distanceOptions.find(
                    (option) => option.value === surrounding
                  )} // Valeur sélectionnée
                  onChange={handleDistanceChange} // Fonction appelée lors de la sélection
                  options={distanceOptions} // Liste des options
                  placeholder="Sélectionnez une distance max"
                  styles={customStyles}
                />
              </div>
            </div>
            <div className="d-flex center">
              <button type="submit" className="mj-btn-primary">
                {isProfileExist ? "Modifier le profil" : "Créer son profil"}
              </button>
            </div>
          </form>
        </div>
        <div className="d-flex center">{feedback && <p>{feedback}</p>}</div>
      </div>
    </div>
  );
}
