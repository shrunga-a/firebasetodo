import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig ={
  apiKey: "AIzaSyC_nsBa2l-nM1kw650MZ7zU7gK3cLinWVE",
  authDomain: "todo-b2c56.firebaseapp.com",
  projectId: "todo-b2c56",
  storageBucket: "todo-b2c56.appspot.com",
  messagingSenderId: "63406682844",
  appId: "1:63406682844:web:5e3c7fbf337daabfdd3a19",
  measurementId: "G-89ZVFJXQF9"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

}

export {firebase};
