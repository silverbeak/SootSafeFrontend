import * as FireBase from 'firebase';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAawhYEk0uXxh7Jvt9F9u-5HnAXqqGXN-E",
    authDomain: "sootsafe-app-test.firebaseapp.com",
    databaseURL: "https://sootsafe-app-test.firebaseio.com",
    projectId: "sootsafe-app-test",
    storageBucket: "sootsafe-app-test.appspot.com",
    messagingSenderId: "520157760403"
};

const firebase = FireBase
    .initializeApp(config)
    // .database()
    // .ref();

export default firebase;