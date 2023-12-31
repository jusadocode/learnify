import './index.css';
import { database, _ref, _set } from './firebasedb';
const fillButton = document.querySelector('.myButton');
let fillAmount = 0;
let fillIncrement;
let complete = false;
const initalFillIncrement = 2;
const fastFillIncrement = 8; // Adjust the increment value as needed
const fillThreshold = 100;

const chapterName = document.querySelector('header > h1').textContent;

console.log(chapterName);

console.log(database);

function writeUserData() {
  console.log('dbbbbbb');
  const userId = prompt('user id');
  const name = prompt('username');
  const email = prompt('email');
  _set(_ref(database, 'users/' + userId), {
    username: name,
    email: email
  });
}

writeUserData();

let fillTimeout;
function fillButtonColor() {

  if(fillAmount >= (fillThreshold / 3))
    fillIncrement = fastFillIncrement;

  fillAmount += fillIncrement;
  fillButton.style.background = `linear-gradient(to right, #00FF32 ${fillAmount}%, transparent ${fillAmount}%)`;

  if (fillAmount >= fillThreshold) {
    // Reset fillAmount when it reaches 100%
    completeSection();
    resetFill();
  } else {
    // Continue filling as long as the button is held
    fillTimeout = setTimeout(fillButtonColor, 50);
  }
}

function resetFill() {
  // Reset fillAmount and background when the button is released
  fillAmount = 0;
  fillButton.style.background = '';
  clearTimeout(fillTimeout);
  fillIncrement = initalFillIncrement;
}

function completeSection() {
  if(complete)
    return;
  // Code to save the chapter/section to the database
  const icon = document.createElement('span');
  icon.classList.add('material-symbols-outlined');
  icon.innerText = 'done';
  fillButton.appendChild(icon);
  complete = true;
  moveToNextPage();
  
}

function moveToNextPage() {

  let matches = window.location.href.match(/dppage(\d+)/);
  console.log(matches);
  let chapterNum = matches[1];

  let matchesTopic = window.location.href.match(/\/([^\/\d?]+)\d*\.html/);
  let topicName = matchesTopic[1];

  let testPage = `../dist/test.html?topic=${topicName}&chapter=${chapterNum}&chapterName=${chapterName}`;
  window.location.href = testPage;
}

fillButton.addEventListener('mousedown', () => {

  fillButtonColor();
});

fillButton.addEventListener('mouseup', () => {
  // Reset fillAmount when the button is released
  resetFill();
});

document.addEventListener('DOMContentLoaded', () => {
  
});
  
