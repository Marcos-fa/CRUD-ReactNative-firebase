import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
// Your web app's Firebase configuration
var firebaseConfig = {

  apiKey: "AIzaSyAC38Y-Tjm0yHZ9MY0lwvHTqcEmRTwy8Rs",
  authDomain: "fb-crud-react-c2bc7.firebaseapp.com",
  projectId: "fb-crud-react-c2bc7",
  storageBucket: "fb-crud-react-c2bc7.appspot.com",
  messagingSenderId: "373273205542",
  appId: "1:373273205542:web:8cedadf7ec50fb488effe7"

  // apiKey: "AIzaSyDYF-RWtYVFQQuT5r8kt3_-FpCISrVad5w",
  // authDomain: "encuentralo-cecfb.firebaseapp.com",
  // projectId: "encuentralo-cecfb",
  // storageBucket: "encuentralo-cecfb.appspot.com",
  // messagingSenderId: "296007362910",
  // appId: "1:296007362910:web:b8ca5c4b36d87bf3d347cf"
};
// Initialize Firebase
const database = firebase.initializeApp(firebaseConfig);

export const dbStorage = database.storage(), dbFirestore = database.firestore();