document.addEventListener('DOMContentLoaded', function () {
  const timerDuration = 180; // 5 minutes
  let timer = timerDuration;
  const timerElement = document.getElementById('timer');
  const questionSection = document.getElementById('question-section');
  const submitButton = document.getElementById('submit-button');

  const questions = [
    {
      type: 'multiple-choice',
      content: 'What is dynamic programming?',
      choices: [
        'A programming paradigm',
        'A programming language',
        'An algorithmic optimization technique',
        'A type of variable',
      ],
      correctAnswer: 'An algorithmic optimization technique',
    },
    {
      type: 'multiple-choice',
      content: 'What is memoization in dynamic programming?',
      choices: [
        'Storing and reusing previously computed results',
        'Recording audio during programming',
        'A programming library',
        'A type of debugging technique',
      ],
      correctAnswer: 'Storing and reusing previously computed results',
    },
    {
      type: 'multiple-choice',
      content: 'Which dynamic programming approach involves bottom-up computation?',
      choices: [
        'Memoization',
        'Tabulation',
        'Recursion',
        'Iteration',
      ],
      correctAnswer: 'Tabulation',
    },
    {
      type: 'multiple-choice',
      content: 'What is the time complexity of the Fibonacci sequence calculation using dynamic programming?',
      choices: [
        'O(n)',
        'O(2^n)',
        'O(log n)',
        'O(n^2)',
      ],
      correctAnswer: 'O(n)',
    },
    {
      type: 'multiple-choice',
      content: 'In dynamic programming, what is an optimal substructure?',
      choices: [
        'A programming language feature',
        'A subproblem that has an optimal solution',
        'A type of data structure',
        'An algorithmic complexity',
      ],
      correctAnswer: 'A subproblem that has an optimal solution',
    },
  ];

  let currentQuestionIndex = 0;

  function showCurrentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = createQuestionElement(currentQuestion, currentQuestionIndex);
    questionSection.innerHTML = ''; // Clear previous question
    questionSection.appendChild(questionElement);
  }

  function handleQuestionSubmission() {
    // Add your logic for handling the user's answer here
    // You can compare the user's answer with the correct answer and update the UI accordingly

    // Move to the next question or end the quiz if all questions are answered
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showCurrentQuestion();
    } else {
      clearInterval(intervalId);
      alert('Quiz completed! Submit your answers.');
      // Add code to handle quiz completion
    }
  }

  // Update timer every second
  const intervalId = setInterval(function () {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerElement.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;

    if (timer === 0) {
      clearInterval(intervalId);
      alert('Time is up! Submit your answers.');
      // Add code to handle when the timer reaches 0
    }

    timer--;
  }, 1000);

  // Example function to format time (add leading zeros)
  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  // Example event listener for the submit button
  submitButton.addEventListener('click', function () {
    handleQuestionSubmission();
  });

  // Initial display of the first question
  showCurrentQuestion();

  function createQuestionElement(question, index) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');

    const questionContent = document.createElement('p');
    questionContent.textContent = question.content;
    questionContainer.appendChild(questionContent);

    if (question.type === 'multiple-choice') {
      const choicesContainer = document.createElement('div');
      choicesContainer.classList.add('choices-container');

      question.choices.forEach((choice, choiceIndex) => {
        const choiceElement = document.createElement('input');
        choiceElement.type = 'radio';
        choiceElement.name = `question_${index}`;
        choiceElement.value = choice;
        choiceElement.id = `choice_${index}_${choiceIndex}`;

        const labelElement = document.createElement('label');
        labelElement.textContent = choice;
        labelElement.setAttribute('for', `choice_${index}_${choiceIndex}`);

        choicesContainer.appendChild(choiceElement);
        choicesContainer.appendChild(labelElement);
        choicesContainer.appendChild(document.createElement('br'));
      });

      questionContainer.appendChild(choicesContainer);
    } else if (question.type === 'true-false') {
      const trueFalseContainer = document.createElement('div');
      trueFalseContainer.classList.add('true-false-container');

      const trueInput = document.createElement('input');
      trueInput.type = 'radio';
      trueInput.name = `question_${index}`;
      trueInput.value = 'true';
      trueInput.id = `true_${index}`;

      const trueLabel = document.createElement('label');
      trueLabel.textContent = 'True';
      trueLabel.setAttribute('for', `true_${index}`);

      const falseInput = document.createElement('input');
      falseInput.type = 'radio';
      falseInput.name = `question_${index}`;
      falseInput.value = 'false';
      falseInput.id = `false_${index}`;

      const falseLabel = document.createElement('label');
      falseLabel.textContent = 'False';
      falseLabel.setAttribute('for', `false_${index}`);

      trueFalseContainer.appendChild(trueInput);
      trueFalseContainer.appendChild(trueLabel);
      trueFalseContainer.appendChild(falseInput);
      trueFalseContainer.appendChild(falseLabel);

      questionContainer.appendChild(trueFalseContainer);
    } else if (question.type === 'fill-in-the-blank') {
      const blankInput = document.createElement('input');
      blankInput.type = 'text';
      blankInput.placeholder = 'Your answer...';
      questionContainer.appendChild(blankInput);
    }

    return questionContainer;
  }
});
