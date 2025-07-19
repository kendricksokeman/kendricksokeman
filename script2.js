function resetMessage()
{
  f.field1.value = "";
}

const quiz = [
  {
    question: "Which of the following best describes Frutigo Aero design style?",
    answers: ["Harsh neon and glitchy textures", "Soft gradients, airy layout, and minimal icons", "Grainy textures and earthy tones", "Heavy black borders and retro fonts"],
    correct: 1,
    explanation: "Frutigo Aero emphasizes futuristic lightness with smooth, gentle curves and minimal UI."
  },
  {
    question: "What is a common color palette in Frutigo Eco aesthetics?",
    answers: ["Electric blue, chrome, silver", "Deep purple, hot pink, black", "Sage green, sand beige, soft browns", "Bright red, lime green, cobalt blue"],
    correct: 2,
    explanation: "Frutigo Eco uses natural, calming colors inspired by plants and earth tones."
  },
  {
    question: "Which pair of aesthetics shares a futuristic design approach?",
    answers: ["Frutigo Aero & Dark Aero", "Frutigo Eco & Funky Metro", "Abstract Tech & Frutigo Eco", "Funky Metro & Dark Aero"],
    correct: 0,
    explanation: "Both Frutigo Aero and Dark Aero focus on futuristic design, though with light and dark expressions."
  }
];

let currentQuestion = 0;
let correctCount = 0;
const userAnswers = [];

const quizDiv = document.getElementById('quiz');
const resultsDiv = document.getElementById('results');
const scoreP = document.getElementById('score');
const reviewDiv = document.getElementById('review');

function showQuestion() {
  quizDiv.style.display = 'block';
  resultsDiv.style.display = 'none';

  const q = quiz[currentQuestion];
  document.getElementById('question').textContent = q.question;
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';
  document.getElementById('result').textContent = '';
  document.getElementById('nextBtn').style.display = 'none';

  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = quiz[currentQuestion];
  const resultDiv = document.getElementById('result');
  userAnswers[currentQuestion] = selected;

  if (selected === q.correct) {
    resultDiv.textContent = 'Correct!';
    resultDiv.style.color = 'green';
    correctCount++;
  } else {
    resultDiv.textContent = 'Wrong!';
    resultDiv.style.color = 'red';
  }
  // Disable all answer buttons after selection
  Array.from(document.getElementById('answers').children).forEach(btn => btn.disabled = true);
  document.getElementById('nextBtn').style.display = 'inline-block';
}

document.getElementById('nextBtn').onclick = () => {
  currentQuestion++;
  if (currentQuestion >= quiz.length) {
    showResults();
  } else {
    showQuestion();
  }
};

function toggleDetails(id) {
  const details = document.getElementById(id);
  if (details.style.display === 'block') {
    details.style.display = 'none';
  } else {
    details.style.display = 'block';
  }
}

function showResults() {
  quizDiv.style.display = 'none';
  resultsDiv.style.display = 'block';
  scoreP.textContent = `You answered ${correctCount} out of ${quiz.length} questions correctly.`;
  reviewDiv.innerHTML = '';

  quiz.forEach((q, i) => {
    const userAnswerIndex = userAnswers[i];
    let userAnswerText = userAnswerIndex !== undefined ? q.answers[userAnswerIndex] : "No answer given";
    const isCorrect = userAnswerIndex === q.correct;

    const div = document.createElement('div');
    div.classList.add('review-question');

    div.innerHTML = `
      <strong>Q${i + 1}: ${q.question}</strong><br>
      Your answer: <span class="${isCorrect ? 'correct' : 'wrong'}">${userAnswerText}</span><br>
      <button class="toggle-btn" onclick="toggleDetails('details${i}')">Show/Hide Answer Details</button>
      <div class="answer-details" id="details${i}">
        Correct answer: <span class="correct">${q.answers[q.correct]}</span><br>
        <div class="explanation">${q.explanation}</div>
      </div>
    `;

    reviewDiv.appendChild(div);
  });
}

document.getElementById('restartBtn').onclick = () => {
  currentQuestion = 0;
  correctCount = 0;
  userAnswers.length = 0;
  showQuestion();
};

// Start quiz initially
showQuestion();
