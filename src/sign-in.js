import {initializeApp} from 'firebase/app';
import firebaseConfig from '../configs/firebase.json';
import { getAuth,onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import './sign-in.css';


import { 
  hideLoginError, 
  showLoginState, 
  showLoginForm, 
  showApp, 
  showLoginError, 
  btnLogin,
  btnSignup,
  btnLogout,
} from './ui.js';


const homePage = './index.html';
// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log(app);

// maybe this isnt the proper way
const auth = getAuth(app);
console.log(auth);

// Login using email/password
const loginEmailPassword = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;
  
  
  // step 1: try doing this w/o error handling, and then add try/catch
  // await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  
  // step 2: add error handling
  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

  }
  catch(error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  }
};

// Create new account using email/password
const createAccount = async () => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    
  }
  catch(error) {
    console.log(`There was an error: ${error}`);
    showLoginError(error);
  } 
};


// Monitor auth state
const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
      showApp();
      showLoginState(user);
      window.location.href = homePage;
  
      hideLoginError();
      // hideLinkError();
    }
    else {
      showLoginForm();
      lblAuthState.innerHTML = 'You\'re not logged in.';
    }
  });
};

// Log out
const logout = async () => {
  await signOut(auth);
};
  
btnLogin.addEventListener('click', loginEmailPassword); 
btnSignup.addEventListener('click', createAccount);
btnLogout.addEventListener('click', logout);
  

monitorAuthState();
