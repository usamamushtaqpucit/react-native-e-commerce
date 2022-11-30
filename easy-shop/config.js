import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBT5OJro3N4ausi8GHLCOavmTdXDn5FMjs",
  authDomain: "e-shop-e45b8.firebaseapp.com",
  projectId: "e-shop-e45b8",
  storageBucket: "e-shop-e45b8.appspot.com",
  messagingSenderId: "1080412948937",
  appId: "1:1080412948937:web:24acb01603fd5b2f844018",
  measurementId: "G-J17W5ZVZRC",
};
if (!firebase.apps.legth) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
