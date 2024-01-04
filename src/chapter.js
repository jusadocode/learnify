import './index.css';
import { writeChapterOpenCount } from './firebasedb';

const fillButton = document.querySelector('.myButton');


let fillAmount = 0;
let fillIncrement;
let complete = false;
const initalFillIncrement = 2;
const fastFillIncrement = 8; // Adjust the increment value as needed
const fillThreshold = 100;


const chapterName = document.querySelector('header > h1').textContent;
let chapterNum;
let topicName;
console.log(chapterName);


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

function initializePageInfo() {
  let matches = window.location.href.match(/dppage(\d+)/);
  console.log(matches);
  chapterNum = matches[1];

  let matchesTopic = window.location.href.match(/\/([^\/\d?]+)\d*\.html/);
  topicName = matchesTopic[1];
}

function moveToNextPage() {

  let testPage = `test.html?topic=${topicName}&chapter=${chapterNum}&chapterName=${chapterName}`;
  window.location.href = testPage;
}

fillButton.addEventListener('mousedown', () => {

  fillButtonColor();
});

fillButton.addEventListener('mouseup', () => {
  // Reset fillAmount when the button is released
  resetFill();
});
initializePageInfo();
document.addEventListener('DOMContentLoaded', await writeChapterOpenCount(topicName, chapterNum));


