// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, update, ref } from 'firebase/database';
import { firebaseConfig } from './config.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase();

// export function setUserOffline (uid) {
//   const dbRef = ref(database, `players/${uid}`);
//   update(dbRef, { online: false });
// }