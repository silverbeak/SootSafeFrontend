import * as firebase from 'firebase';
require('firebase/firestore')

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAawhYEk0uXxh7Jvt9F9u-5HnAXqqGXN-E",
    authDomain: "sootsafe-app-test.firebaseapp.com",
    databaseURL: "https://sootsafe-app-test.firebaseio.com",
    projectId: "sootsafe-app-test",
    storageBucket: "sootsafe-app-test.appspot.com",
    messagingSenderId: "520157760403"
};

const firebaseApp = firebase.initializeApp(config)
const firebaseDatabase = firebase.firestore()

export const fbApp = firebaseApp
    // .database()
    // .ref();

export const db = firebaseDatabase
