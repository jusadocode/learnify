import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import firebaseConfig from '../configs/firebase.json';


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// console.log(database);

export { app, database, ref as _ref, set as _set};