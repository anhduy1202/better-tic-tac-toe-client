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
    apiKey: "AIzaSyDLGHUTTcGB20yvsUvN-KQiy7o4_JyE-WU",
    authDomain:  "better-tic-tac-toe.firebaseapp.com",
    databaseURL: "https://better-tic-tac-toe-default-rtdb.firebaseio.com",
    projectId:  "better-tic-tac-toe",
    storageBucket:  "better-tic-tac-toe.appspot.com",
    messagingSenderId:  "650136148230",
    appId: "1:650136148230:web:87825349146e48e07da687",
    measurementId:  "G-QMB8CZN9DH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;
