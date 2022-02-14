import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBEDmaCaWPIFNiWNzuaJ_Ah2J2SV1cROUg",
    authDomain: "common-word-13bb3.firebaseapp.com",
    projectId: "common-word-13bb3",
    storageBucket: "common-word-13bb3.appspot.com",
    messagingSenderId: "33681943409",
    appId: "1:33681943409:web:02b3358e9d4f6205cb24d0"
  };

  export const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app)