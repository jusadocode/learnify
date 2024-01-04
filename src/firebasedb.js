import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, get } from 'firebase/database';
import firebaseConfig from '../configs/firebase.json';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Wont be using custom '123' userd id for simpler connection to the auth provided by firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
    
const auth = getAuth();
let userId;

const obtainUserId = new Promise((resolve) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId = user.uid;
      console.log(user);
    } else {
      userId = null;
    }
    resolve(userId);
  });
});

obtainUserId.then(() => {
  console.log('USER ID AVAILABLE');
});

// this should be used for pictures, profile info etc.
function writeUserData(name, email) {

  if(!userId || !name || !email) {
    console.log('NULL Value, no save');
    return;
  }

  set(ref(database, 'users/' + userId), {
    username: name,
    email: email
  });
}

function writeTestResult(topic, chapterNum, testScore, durationSeconds) {

  
  try {
    const testRef = ref(database, `users/${userId}/topics/${topic}/chapters/${chapterNum}/tests`);
    const newTestRef = push(testRef); // Generate a unique key for the new test
  
    set(newTestRef, {
      passed: testScore >= 80 ? true : false,
      testScore: testScore,
      date: formatCurrentDate(),
      duration: durationSeconds
    });
  
    console.log('SAVED SCORE TO DB');
    console.log(topic, chapterNum, testScore, durationSeconds);
  } catch (error) {
    console.log('Saving to db error ' + error);
  }
}

async function getStudentProgress() {
  try {
    await obtainUserId; // Wait for the userId to be defined


    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      if (userData) {
        console.log(userData);
        return userData;
      } else {
        console.log('No topics data for the user.');
      }
    } else {
      console.log('User data does not exist.');
    }
  } catch (error) {
    console.error('Error fetching student progress:', error);
  }
}

function formatCurrentDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();

  return(`${year}-${month}-${day} ${hour}:${minute}:${second}`);
}


export { app, database, writeUserData, writeTestResult, getStudentProgress };