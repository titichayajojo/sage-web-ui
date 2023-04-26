
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDYrm79HayKAs2UHw5aoxwMOKeXN3EiygY",
    authDomain: "healthcarefirebase-75e6b.firebaseapp.com",
    databaseURL: "https://healthcarefirebase-75e6b-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "healthcarefirebase-75e6b",
    storageBucket: "healthcarefirebase-75e6b.appspot.com",
    messagingSenderId: "965936029543",
    appId: "1:965936029543:web:5476e562c5ac4fb388d9c2",
    measurementId: "G-8HB2MEP9H9"
  };



const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export { auth, firebase };
