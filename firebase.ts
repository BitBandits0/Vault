import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "vault-c6230.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: "vault-c6230.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

// Initialize Firebase
//* If Next has previously rendered the app on its own, then it will just get the app by using "getApp()"
//* Otherwise new firebase app will be initialized
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
