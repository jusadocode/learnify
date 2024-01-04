import './index.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut,} from 'firebase/auth';
import firebaseConfig from '../configs/firebase.json';

// cant import logout from sign-in.js because it break from some label
// Mask the damn css not loading first second into page
const logoutButton = document.querySelector('.logOutButton');
const statsButton = document.querySelector('.statsButton');



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

logoutButton.addEventListener('click', async () => {
  
  signOut(auth);
  location.href = './sign-in.html';
  console.log('CLICK');
});

statsButton.addEventListener('click', async () => {
  location.href = './student-progress.html';
});
  
