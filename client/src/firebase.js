// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIRBASE_API_KEY,
    authDomain: "mern-blog-edd9f.firebaseapp.com",
    projectId: "mern-blog-edd9f",
    storageBucket: "mern-blog-edd9f.appspot.com",
    messagingSenderId: "478926376198",
    appId: "1:478926376198:web:e081c6fa1ff2d46b2d2287"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);