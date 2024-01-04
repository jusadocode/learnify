import { getStudentProgress } from './firebasedb';
import { Chart } from 'chart.js/auto';
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
    canvas.classList.add('chart');
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Passed', 'Failed'],
        datasets: [{
          data: [passedCount, failedCount],
          backgroundColor: ['#4CAF50', '#FF5252'],
        }],
      },
      hoverOffset: 8
    });

    pieChart.resize(50, 50);
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

    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');

    chapterContainer.appendChild(chartContainer);

    renderPieChart(chartContainer, passedTests, failedTests);
    renderPieChart(chartContainer, passedTests, failedTests);
    progressContainer.appendChild(chapterContainer);
  }

  await renderStudentProgress(userData);
});
