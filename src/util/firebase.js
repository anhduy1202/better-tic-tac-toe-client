import firebase from "firebase";
require('dotenv').config();
const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const dbUrl = process.env.REACT_APP_DB_URL;
const projectId = process.env.REACT_APP_PROJECT_ID;
const sb = process.env.REACT_APP_SB;
const messID = process.env.REACT_APP_MESS_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;
const firebaseConfig = {
 apiKey:  process.env.REACT_APP_API_KEY,
    authDomain:  process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_MESS_ID,
    appId:  process.env.REACT_APP_APP_ID,
    measurementId:  process.env.REACT_APP_MEASUREMENT_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;
