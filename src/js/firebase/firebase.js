import * as firebase from 'firebase';
require('firebase/firestore')

// Initialize Firebase
var config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

const firebaseApp = firebase.initializeApp(config)
const firebaseDatabase = firebase.firestore()
const firebaseStorage = firebase.storage()

export const fbApp = firebaseApp

export const db = firebaseDatabase

export const storage = firebaseStorage