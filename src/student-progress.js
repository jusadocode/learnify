import { getStudentProgress } from './firebasedb';
import { Chart } from 'chart.js/auto';
import './student-progress.css';

// Visualize chapter open count and add headers for which chapter it is
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
          renderChapterTests(topicKey, chapter);
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

    // pieChart.resize(50, 50);
  }

  function renderChapterTestScoreLineChart(chartContainer, topic, tests) {
    // Convert timestamps to a list of unique days
    const uniqueTestDays = [...new Set(Object.values(tests).map(test => new Date(test.date).toLocaleDateString()))];
  
    // Calculate the average score for each day
    const averageScoresByDay = uniqueTestDays.map(day => {
      const testsOnDay = Object.values(tests).filter(test => new Date(test.date).toLocaleDateString() === day);
      const totalScore = testsOnDay.reduce((sum, test) => sum + test.testScore, 0);
      return testsOnDay.length > 0 ? totalScore / testsOnDay.length : 0;
    });
  
    const canvas = document.createElement('canvas');
    canvas.classList.add('chart');
    chartContainer.appendChild(canvas);
  
    const ctx = canvas.getContext('2d');
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: uniqueTestDays,
        datasets: [{
          label: 'Average Test Score',
          data: averageScoresByDay,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        }],
      },
      options: {
        scales: {
          x: {
            type: 'category', // Use 'category' scale type for dates
            labels: uniqueTestDays,
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Average Test Score',
            },
          },
        },
      },
    });
  }
  
  

  function createTestCard(test) {
    const card = document.createElement('div');
    card.classList.add('test-card');
  
    const header = document.createElement('div');
    header.classList.add('test-header');
    header.textContent = `Date: ${test.date}`;
    card.appendChild(header);
  
    const details = document.createElement('div');
    details.classList.add('test-details');
  
    const result = document.createElement('div');
    result.classList.add('test-result');
    result.textContent = test.passed ? 'Passed' : 'Failed';
    result.classList.add(test.passed ? 'passed' : 'failed');

    const duration = document.createElement('div');
    duration.classList.add('test-result');
    duration.textContent = `Duration: ${test.duration}s`;

    const score = document.createElement('div');
    score.classList.add('test-result');
    score.textContent = `Score: ${test.testScore}%`;
    
    details.appendChild(result);
    details.appendChild(duration);
    details.appendChild(score);
  
    // Add additional details as needed
    // Example: const additionalDetail = document.createElement('div');
    // additionalDetail.textContent = `Some additional information: ${test.additionalInfo}`;
    // details.appendChild(additionalDetail);
  
    card.appendChild(details);
  
    return card;
  }

  function renderChapterTests(topic, chapter) {
    const chapterContainer = document.createElement('div');
    chapterContainer.classList.add('testResult');

    const chapterDropdown = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = `Chapter: ${topic}`;
    chapterDropdown.appendChild(summary);

    let passedTests = 0;
    let failedTests = 0;

    for (const testKey in chapter.tests) {
      const test = chapter.tests[testKey];

      const testCard = createTestCard(test);

      if (test.passed) {
        passedTests++;
      } else {
        failedTests++;
      }

      chapterDropdown.appendChild(testCard);
    }

    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');

    chapterContainer.appendChild(chapterDropdown);
    chapterContainer.appendChild(chartContainer);

    renderPieChart(chartContainer, passedTests, failedTests);
    renderChapterTestScoreLineChart(chartContainer, topic, chapter.tests);
    
    progressContainer.appendChild(chapterContainer);
  }

  await renderStudentProgress(userData);
});
