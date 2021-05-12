import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvS4NLIvEb0uU59RB0M3YGdEEZVaKvsSU",
  authDomain: "clone-55cfd.firebaseapp.com",
  projectId: "clone-55cfd",
  storageBucket: "clone-55cfd.appspot.com",
  messagingSenderId: "353690006450",
  appId: "1:353690006450:web:23ca57ed8518bef224eaab",
  measurementId: "G-L9V94E4L6D"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
