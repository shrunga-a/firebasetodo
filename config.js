import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig ={
  //Add your firebase configuration keys here
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

}

export {firebase};
