import { getStudentProgress } from './firebasedb';

import './student-progress.css';

document.addEventListener('DOMContentLoaded', async () => {
  const progressContainer = document.getElementById('progressContainer');

  // Fetch student progress data
  const userData = await getStudentProgress();

  async function renderStudentProgress(userData) {
    const topics = userData.topics || {};

    for (const topicKey in topics) {
      const topic = topics[topicKey];
      const chapters = topic.chapters;

      chapters.forEach((chapter) => {
        if (chapter && chapter.tests) {
          renderChapterTests(topicKey, chapter.tests);
        }
      });
    }
  }

  function renderPieChart(container, passedCount, failedCount) {
    const canvas = document.createElement('canvas');

    canvas.width = 150; // Set your desired width
    canvas.height = 150; // Set your desired height
    
    container.appendChild(canvas);



    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Passed', 'Failed'],
        datasets: [{
          data: [passedCount, failedCount],
          backgroundColor: ['#4CAF50', '#FF5252'],
        }],
      },
    });
  }

  function renderLineChart(container, chapterLabels, passedData, failedData) {
    const canvas = document.createElement('canvas');
    
    // Set your desired width and height for the line chart
    canvas.width = 500;
    canvas.height = 250;
  
    container.appendChild(canvas);
  
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chapterLabels,
        datasets: [{
          label: 'Passed',
          borderColor: '#4CAF50',
          data: passedData,
          fill: false,
        }, {
          label: 'Failed',
          borderColor: '#FF5252',
          data: failedData,
          fill: false,
        }],
      },
    });
  }
  function renderChapterTests(topic, tests) {
    const chapterContainer = document.createElement('div');
    chapterContainer.classList.add('testResult');

    let passedTests = 0;
    let failedTests = 0;

    for (const testKey in tests) {
      const test = tests[testKey];
      const testElement = document.createElement('div');
      testElement.textContent = `Date: ${test.date}, Duration: ${test.duration} seconds, Score: ${test.testScore}%`;

      if (test.passed) {
        testElement.classList.add('passed');
        passedTests++;
      } else {
        testElement.classList.add('failed');
        failedTests++;
      }

      chapterContainer.appendChild(testElement);
    }

    renderPieChart(chapterContainer, passedTests, failedTests);
    progressContainer.appendChild(chapterContainer);
  }

  await renderStudentProgress(userData);
});
