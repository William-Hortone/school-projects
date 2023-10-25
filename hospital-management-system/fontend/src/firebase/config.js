import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBOyMrkeVkeAEVimFd-oZ520GOGKjxc9Sk",
  authDomain: "lbvhospital.firebaseapp.com",
  projectId: "lbvhospital",
  storageBucket: "lbvhospital.appspot.com",
  messagingSenderId: "922384302295",
  appId: "1:922384302295:web:56a97f77171299df723092",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
