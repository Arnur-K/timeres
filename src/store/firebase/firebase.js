import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyA9m-M4WJ7OWw9oUtHjz88hkkuNdGLCRMQ',
  authDomain: 'timeres-86dcf.firebaseapp.com',
  databaseURL: 'https://timeres-86dcf.firebaseio.com',
  projectId: 'timeres-86dcf',
  storageBucket: 'timeres-86dcf.appspot.com',
  messagingSenderId: '743079554885',
  appId: '1:743079554885:web:46019136264def3194582c',
  measurementId: 'G-HCZFQYNCB2',
};

export const firebaseInitApp = () => firebase.initializeApp(config);
export const database = () => firebase.database();
export const auth = () => firebase.auth();
