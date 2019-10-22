  
// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";
import Firebase from 'firebase/app'

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/database"
import firebaseConfig from '../../firebase.conf'

// Your web app's Firebase configuration

// Initialize Firebase
export default ({ Vue }) => {
    // Initialize Firebase from settings
    Firebase.initializeApp(firebaseConfig);
  
    // Configure Firestore
    // Firebase.firestore().settings({ timestampsInSnapshots: true });
  
    Vue.prototype.$firebase = Firebase;
  };