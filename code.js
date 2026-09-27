// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "oh wi wi wi, it is Paris, merci", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "what does the cow say?",
    answers: [
      { text: "mew :3", correct: false },
      { text: "oh moo moo moo, i speak that too! All day", correct: true },
      { text: "yo gng who up for some McDonalds?", correct: false },
      { text: "Tylko jedno w głowie mamKoksu pięć gramOdlecieć samW krainę zapomnieniaW głowie myśli mamKiedy skończy się ten stanGdy już nie będę samBo wjedzie biały węgorz", correct: false },
    ],
  },
  {
    question: "Which one of these did Donald J. Trump say (in public)?",
    answers: [
      { text: "i don't like yaoi", correct: false },
      { text: "Sometimes you need a dictator.", correct: true },
      { text: "QUITE FRANKLY, musky is very HOT! People keep saying yaoi, yaoi! i don't know what that means but it sounds tremendous, like myself quite frankly", correct: false },
      { text: "I'm going to be daiting you in 10 years.", correct: true },
    ],
  },
  {
    question: "can gregs give you cancer?",
    answers: [
      { text: "FUCK NO I LIVE FOR GREGS!!! GREGSS 4 EVVAAAAAA", correct: false },
      { text: "gregs give you depression, ball cancer, makes your socks soggy and makes you pillow warm", correct: false },
      { text: "idk tbh", correct: true },
      { text: "i blame the brexit", correct: false },
    ],
  },
  {
    question: "How old is Markiplyier?",
    answers: [
      { text: "like 32?", correct: false },
      { text: "a wee lil lad", correct: true },
      { text: "no way he's 37", correct: true },
      { text: "WHAT YEAR IS IT", correct: false },
    ],
  },
  {
    question: "What is the most socially acceptable thing to say?",
    answers: [
      { text: "KILL JOHN LENON", correct: true },
      { text: "Союз нерушимый республик свободных Сплотила навеки Великая Русь Да здравствует созданный волей народов Единый, могучий Советский Союз! Славься, Отечество наше свободное Дружбы народов надёжный оплот! Партия Ленина - сила народная Нас к торжеству коммунизма ведёт!", correct: true },
      { text: "NIRVANA IS SO PREPPYYYYYY", correct: false },
      { text: "67", correct: false },
    ],
  },
  {
    question: "is linux bettere than windows?",
    answers: [
      { text: "NO, FORTNIGHT FORREVVAAAAAA", correct: false },
      { text: "sudo dnf uninstall windows", correct: true },
      { text: "i need to edge", correct: false },
      { text: "you can choose wichever OS suits your needs", correct: false },
    ],
  },

]

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let AnswerDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  
  showQuestion();

}

function showQuestion() {
  // answer state
  AnswerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    
    // what is dataset? store custum data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  //optimazion check
 if (AnswerDisabled) return;

 AnswerDisabled = true;

 const selectButton = event.target;
 const isCorrect = selectButton.dataset.correct === "true";

 // Here Array.from() is used to convert the Nodelist returned by 
 // answer.container.children into an array, this is because Nodelist is not 
 // an array and we need the .foreach method

 Array.from(answersContainer.children).forEach((button) => {
  if (button.dataset.correct ==="true"){
    button.classList.add("correct");
  } else if(button === selectButton) {
    button.classList.add("incorrect");
  }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
     showQuestion();
    } else {
      showResults();
    }
  },1000);
}

function showResults () {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score/quizQuestions.length) * 100;

  if(percentage === 100) {
    resultMessage.textContent = "damn.... u smart";
   
    // Basic JS redirect example
  const redirectUser = (newUrl) => {
  window.location.href = newUrl
  }

  redirectUser('https://youtu.be/hNKYi_n18nU?si=lN3tAzN7YAvXVCeG')

  } else if (percentage >= 80) {
    resultMessage.textContent = "Good job nephew!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "not quite my tempo";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Get gud";
  } else {
    resultMessage.textContent = "I didn't code 5h+ for you to be THIS bad. Now do it again";
    const redirectUser = (newUrl) => {
  window.location.href = newUrl
  }
    redirectUser('https://youtu.be/vR7KLmVThLk?si=WYIS7mW1KfJEbwRz')
  }
}


function restartQuiz(){
  console.log("quiz re-started");
  resultScreen.classList.remove("active");

  startQuiz();
}