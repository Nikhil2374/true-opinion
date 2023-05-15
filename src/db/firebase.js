import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBPlZ7TdBNiFaYqcWm4RD4t8Pyhg6CsUzk",
    authDomain: "trueopinion-b5630.firebaseapp.com",
    projectId: "trueopinion-b5630",
    storageBucket: "trueopinion-b5630.appspot.com",
    messagingSenderId: "215684477575",
    appId: "1:215684477575:web:67908bb2f6ff63575ffe22"
  }

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()