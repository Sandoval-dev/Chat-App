// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLpGx_9o0Ba1y6IW-HnZ6x7TLMLAWpWlA",
  authDomain: "chatapp-7ef3c.firebaseapp.com",
  projectId: "chatapp-7ef3c",
  storageBucket: "chatapp-7ef3c.appspot.com",
  messagingSenderId: "119906737340",
  appId: "1:119906737340:web:4b1781371298aa3fe784b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db=getFirestore(app)

export const usersRef= collection(db,'users')
export const roomRef=collection(db,'rooms')