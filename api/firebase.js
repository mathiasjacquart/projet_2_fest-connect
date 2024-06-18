import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyCXw9x24-x0OEb328a29Yo3kNKFD1eVHuQ",
  authDomain: "fest-connect-storage.firebaseapp.com",
  projectId: "fest-connect-storage",
  storageBucket: "fest-connect-storage.appspot.com",
  messagingSenderId: "76051385499",
  appId: "1:76051385499:web:7ce8370468f57d9bfdca3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const listFiles = async (path) => {
  const storageRef = ref(storage, path);
  const res = await listAll(storageRef);
  const urls = await Promise.all(res.items.map(async (itemRef) => {
    const url = await getDownloadURL(itemRef);
    return { url, title: itemRef.name };
  }));
  return urls;
};

const saveImageUrls = async (urls) => {
  await axios.post('/api/storages/SaveURL', { urls });
};

const fetchAndSaveImages = async () => {
  const folders = ['images/Homepage', 'images/Error404', 'images/Register', 'images/Privacy-Policy'];
  for (const folder of folders) {
    const urls = await listFiles(folder);
    await saveImageUrls(urls);
  }
};

fetchAndSaveImages();
