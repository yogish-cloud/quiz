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
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let CurrentQuestionIndex = 0;
let Score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


startButton.addEventListener("click",startQuiz)
restartButton.addEventListener("click",startQuiz)

function startQuiz(){
    CurrentQuestionIndex = 0;
    Score = 0;
    scoreSpan.textContent=Score;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    ShowQuestion();
}
function ShowQuestion(){
    answerDisabled=false;
    const currentQuestion = quizQuestions[CurrentQuestionIndex];
    currentQuestionSpan.textContent = CurrentQuestionIndex + 1;
    const progressPer = (CurrentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width = progressPer + "%"
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML="";

    currentQuestion.answers.forEach ((answer)=>{
        const button = document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct= answer.correct;

        button.addEventListener("click", SelectAnswer);

        answersContainer.appendChild(button);

    });
}

function SelectAnswer(){

    if(answerDisabled) return

    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct==="true";

    Array.from(answersContainer.children).forEach((button)=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        else if(button==selectedButton){
            button.classList.add("incorrect");
        }

    });
    if(isCorrect){
        Score++;
        scoreSpan.textContent=Score;
    }


    setTimeout(()=>{

        CurrentQuestionIndex++;

        if(CurrentQuestionIndex < quizQuestions.length){
            ShowQuestion();
        }else{
            ShowResults();
        }
    },1000);

}

function ShowResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent=Score;

    const percentage = (Score/quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } 
    else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } 
    else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } 
    else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}
    
function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}

