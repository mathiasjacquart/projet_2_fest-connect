import React, { useState, useEffect } from 'react';
import { Create, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from 'react-admin';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../../firebase";
import styles from "./Category.module.scss";

const CategoryCreate = (props) => {
  const [imgCategory, setImgCategory] = useState(null);
  const [imgSubCategory, setImgSubCategory] = useState(null);
  const [imgCategoryLink, setImgCategoryLink] = useState("");
  const [imgSubCategoryLink, setImgSubCategoryLink] = useState("");
  const [imgProgress, setImgProgress] = useState({ category: 0, subCategory: 0 });

  useEffect(() => {
    if (imgCategory) {
      uploadFile(imgCategory, 'category');
    }
  }, [imgCategory]);

  useEffect(() => {
    if (imgSubCategory) {
      uploadFile(imgSubCategory, 'subCategory');
    }
  }, [imgSubCategory]);

  const uploadFile = (file, type) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgProgress((prev) => ({ ...prev, [type]: Math.round(progress) }));
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          if (type === 'category') {
            setImgCategoryLink(downloadUrl.toString());
          } else {
            setImgSubCategoryLink(downloadUrl.toString());
          }
        });
      }
    );
  };

  const handleSubmit = async (data) => {
    data.urlCategory = imgCategoryLink;
    data.subCategories = data.subCategories.map(subCategory => ({
      ...subCategory,
      urlSubCategory: imgSubCategoryLink
    }));
    
    try {
      const response = await fetch("http://localhost:4560/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newCategory = await response.json();
        console.log('Category created successfully:', newCategory);
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <Create {...props} redirect="list">
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="nameCategory" label="Catégories" />
        <input  
          className={`${styles.categoriesAdmin}`}
          type="file"
          id="imgCategory"
          accept="image/*"
          onChange={(e) => setImgCategory(e.target.files[0])}
        />
        {imgProgress.category > 0 && <p>Uploading: {imgProgress.category}%</p>}
        <ArrayInput source="subCategories" label="Sous Catégories">
          <SimpleFormIterator>
            <TextInput source="nameSubCategory" label="Sous Catégories" />
            <input  
              className={`${styles.categoriesAdmin}`}
              type="file"
              id="imgSubCategory"
              accept="image/*"
              onChange={(e) => setImgSubCategory(e.target.files[0])}
            />
            {imgProgress.subCategory > 0 && <p>Uploading: {imgProgress.subCategory}%</p>}
            <ArrayInput source="keywords" label="Mots Clés">
              <SimpleFormIterator>
                <TextInput label="Mot clé" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default CategoryCreate;
