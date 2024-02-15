// Quiz questions array
const questions = [
    {
        question: "What is the capital of Nigeria?",
        answers: [
            { text: "Abuja", correct: true },
            { text: "Kano", correct: false },
            { text: "Ibadan", correct: false },
            { text: "Calabar", correct: false },
        ]
    },
    {
        question: "What is the capital of Ghana?",
        answers: [
            { text: "Cape Coast", correct: false },
            { text: "Ho", correct: false },
            { text: "Accra", correct: true },
            { text: "Kumasi", correct: false },
        ]
    },
    {
        question: "What is the capital of Egypt?",
        answers: [
            { text: "Cairo", correct: true },
            { text: "Cape-Town", correct: false },
            { text: "Beijing", correct: false },
            { text: "New-york", correct: false },
        ]
    },
    {
        question: "What is the capital of USA?",
        answers: [
            { text: "Abuja", correct: false },
            { text: "Toronto", correct: false },
            { text: "Washington DC", correct: true },
            { text: "Doha", correct: false },
        ]
    }
    
];

// DOM elements
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButtonElement = document.getElementById("next-btn");

// Global variables
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButtonElement.textContent = "Next";
    showQuestion();
}

// Function to display a question
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // Create answer buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

// Function to reset the quiz state
function resetState() {
    nextButtonElement.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(answer) {
    const correct = answer.correct;

    // Update score for correct answers
    if (correct) {
        score++;
    }

    // Highlight correct and incorrect answers
    highlightAnswers(correct);

    // Disable answer buttons after selection
    disableAnswerButtons();

    // Show the next button
    nextButtonElement.style.display = "block";
}

// Function to highlight correct and incorrect answers
function highlightAnswers(correct) {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        if (button.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
            button.classList.add("correct");
        } else if (button.classList.contains("selected") && !correct) {
            button.classList.add("incorrect");
        }
    });
}

// Function to disable answer buttons after selection
function disableAnswerButtons() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;

    // Check if there are more questions or end the quiz
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz and display the score
function endQuiz() {
    resetState();
    alert(`Quiz completed! Your score: ${score}`);
}

// Start the quiz
startQuiz();
