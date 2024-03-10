const questions = [
    {
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      answer: "Delhi"
    },
    {
      question: "Which river is known as the lifeline of India?",
      options: ["Godaveri", "Yamuna", "Ganges", "Indus"],
      answer: "Ganges"
    },
    {
      question: "Which is the largest state in India by area?",
      options: ["Bihar", "Madhya Pradesh", "Maharashtra", "Rajasthan"],
      answer: "Rajasthan"
    },
    {
      question: "What is the national flower of India?",
      options: ["Lily", "Lotus", "Sunflower", "Jasmine"],
      answer: "Lotus"
    },
    {
      question: "When is India's Independence Day celebrated?",
      options: ["15th August", "26th January", "2nd October", "5th September"],
      answer: "15th August"
    }
  ];
  
  let currentQuestion = 0;
  let selectedAnswers = [];
  let timerInterval;
  
  function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      document.getElementById('timer').innerText = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 1000);
  }
  
  function renderQuestion() {
    const questionContainer = document.getElementById('question-container');
    const currentQuestionData = questions[currentQuestion];
    questionContainer.innerHTML = `
      <p class="question">${currentQuestionData.question}</p>
      <div class="options">
        ${currentQuestionData.options.map((option, index) => `
          <div class="option" onclick="selectAnswer(${index})">${option}</div>
        `).join('')}
      </div>
    `;
  }
  
  function selectAnswer(index) {
    selectedAnswers[currentQuestion] = questions[currentQuestion].options[index];
    currentQuestion++; // Move to the next question
    if (currentQuestion < questions.length) {
      renderQuestion(); // Render the next question
    } else {
      submitQuiz(); // If all questions are answered, submit the quiz
    }
  }
  
  function submitQuiz() {
    clearInterval(timerInterval);
    document.getElementById('result').innerText = `You have completed the quiz in ${document.getElementById('timer').innerText}`;
    document.getElementById('result-container').style.display = 'block';
  }
  
  function showResult() {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctAnswers++;
      }
    });
    const percentage = (correctAnswers / questions.length) * 100;
    let resultText = `You scored ${percentage.toFixed(2)}% (${correctAnswers}/${questions.length})`;
    if (percentage === 100) {
      resultText += " 🎉";
    } else if (percentage >= 70) {
      resultText += " 🙂";
    } else {
      resultText += " 😔";
    }
    document.getElementById('result').innerText = resultText;
  }
  
  function resetQuiz() {
    currentQuestion = 0;
    selectedAnswers = [];
    renderQuestion();
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('timer').innerText = '00:00';
    startTimer();
  }
  
  window.onload = () => {
    renderQuestion();
    startTimer();
  };
  