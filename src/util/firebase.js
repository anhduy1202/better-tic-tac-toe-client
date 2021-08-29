import firebase from "firebase";

const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const dbUrl = process.env.REACT_APP_DB_URL;
const projectId = process.env.REACT_APP_PROJECT_ID;
const sb = process.env.REACT_APP_SB;
const messID = process.env.REACT_APP_MESS_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: dbUrl,
    projectId: projectId,
    storageBucket: sb,
    messagingSenderId: messID,
    appId: appId,
    measurementId: measurementId
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;