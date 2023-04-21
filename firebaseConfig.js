import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCMmxd0-m9z5sv98ZdOWmH8yi-2dF4tHZ8",
    authDomain: "prueba-firebase-dd6f2.firebaseapp.com",
    projectId: "prueba-firebase-dd6f2",
    storageBucket: "prueba-firebase-dd6f2.appspot.com",
    messagingSenderId: "1020359810158",
    appId: "1:1020359810158:web:9d3db1d3ccfd0d82af1a7f"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };