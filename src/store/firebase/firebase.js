import firebase from "firebase";
import firebaseConfig from "./config";

export const firebaseInitApp = () => firebase.initializeApp(firebaseConfig);
export const database = () => firebase.database();
export const _auth = () => firebase.auth();
