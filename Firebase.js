import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyBh9LBZ1RSuB-mmLuwtNKfgDfasLEW1S4U',
  authDomain: 'bookcar-2c6fa.firebaseapp.com',
  databaseURL: 'https://bookcar-2c6fa-default-rtdb.firebaseio.com/',
  projectId: 'bookcar-2c6fa',
  storageBucket: 'bookcar-2c6fa.appspot.com',
  messagingSenderId: '149276268680',
  appId: '1:149276268680:web:6a3f38aff687a42d1ba73d',
  measurementId: 'G-PW5D78VS1V',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;
