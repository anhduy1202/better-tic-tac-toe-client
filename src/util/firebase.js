import firebase from "firebase";


const firebaseConfig = {
    apiKey:  process.env.REACT_APP_API_KEY,
    authDomain:  process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: "https://better-tic-tac-toe-default-rtdb.firebaseio.com",
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_MESS_ID,
    appId:  process.env.REACT_APP_APP_ID,
    measurementId:  process.env.REACT_APP_MEASUREMENT_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;
