import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCpECafHq7tH1JfmrWYSvSwDfItFd8tuAs",
    authDomain: "xts-main-site.firebaseapp.com",
    projectId: "xts-main-site",
    storageBucket: "xts-main-site.appspot.com",
    messagingSenderId: "759007517065",
    appId: "1:759007517065:web:1e733c82faf83b671ce958",
    measurementId: "G-2BB7N94GPC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};