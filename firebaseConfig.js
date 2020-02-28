import * as firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDA4vg-KrM-nA_tFx5DCGVZVlCp-F6YbN4",
    authDomain: "cross-platform-pkdx.firebaseapp.com",
    databaseURL: "https://cross-platform-pkdx.firebaseio.com",
    projectId: "cross-platform-pkdx",
    storageBucket: "cross-platform-pkdx.appspot.com",
    messagingSenderId: "407208827338",
    appId: "1:407208827338:web:0a4afdef0fdc251e915733",
    measurementId: "G-SWSMLM4ZCP"
};

// Initialize Firebase
export default (!firebase.apps.length)
    ? firebase.initializeApp(firebaseConfig)
    : firebase;
