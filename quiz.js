document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById('startQuiz');
    startButton.addEventListener("click", startQuiz);

    const instructionsPage = document.getElementById('instructions');
    const quizContainer = document.getElementById('quizContainer');
    const quizQuestions = document.getElementById('question');
    const quizOptions = document.getElementById('options');
    const timerElement = document.getElementById('timer');
    const resultElement = document.getElementById("result");

    let timerDuration = 180;
    let timeRemaining;
    let timerInterval;
    let quizFinished = false; // Variable to track quiz completion
    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        instructionsPage.style.display = "none";
        quizContainer.style.display = "block";

        timeRemaining = timerDuration;
        timerElement.textContent = `Time Remaining: ${formatTime(timeRemaining)}`;

        timerInterval = setInterval(function () {
            if (!quizFinished) {
                timeRemaining--;
                timerElement.textContent = `Time Remaining: ${formatTime(timeRemaining)}`;
            }

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                quizFinished = true;
                showResult();
            }
        }, 1000);

        loadQuestions();
    }

    function loadQuestions() {
        if (quizFinished) {
            showResult();
            return;
        }

        const loadedQuestion = Quiz[currentQuestionIndex];
        quizQuestions.textContent = loadedQuestion.question;
        quizOptions.innerHTML = "";

        loadedQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement("button");
            optionElement.textContent = option;
            optionElement.addEventListener("click", () => checkAnswer(index));
            quizOptions.appendChild(optionElement);
        });
    }

    function checkAnswer(selectedOption) {
        const currentQuestion = Quiz[currentQuestionIndex];
        if (selectedOption === currentQuestion.correct) {
            score++;
            showFeedback("Correct!", "green");
        } else {
            showFeedback("Incorrect!", "red");
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < Quiz.length) {
            loadQuestions();
        } else {
            quizFinished = true;
            showResult();
            clearInterval(timerInterval); // Stop the timer interval
            showRestartButton();
        }
    }

    function showResult() {
        quizQuestions.style.display = "none";
        quizOptions.style.display = "none";

        resultElement.textContent = `Quiz completed! Your score: ${score} out of ${Quiz.length}.`;
    }

    function showRestartButton() {
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.addEventListener("click", restartQuiz);
        resultElement.appendChild(restartButton);
    }

    function restartQuiz() {
        quizFinished = false;
        currentQuestionIndex = 0;
        score = 0;
        resultElement.innerHTML = ""; // Clear result message
        startQuiz(); // Restart the quiz
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s`;
    }

    function showFeedback(message, color) {
        const feedbackElement = document.createElement("div");
        feedbackElement.textContent = message;
        feedbackElement.style.color = color;
        feedbackElement.style.marginTop = "10px";
        quizContainer.appendChild(feedbackElement);

        // Remove feedback after 1.5 seconds
        setTimeout(() => {
            feedbackElement.remove();
        }, 300);
    }

    // quiz array
    const Quiz = [
        { question: "1. Which of the following is NOT a JavaScript data type? ", options: ["A. Boolean", "B. String", "C. Number", "D. Character"], correct: 3 },
        { question: "2. What is the output of the following code snippet? console.log(typeof null);", options: ["A. null", "B. undefined", "C. object", "D. number"], correct: 2 },
        { question: "3. Which of the following is not a JavaScript framework?", options: ["A. Angular", "B. Vue", "C. Laravel", "D. React"], correct: 2 },
        { question: "4. Which of the following is not a JavaScript loop?", options: ["A. for", "B. while", "C. do-while", "D. repeat-until"], correct: 3 },
        { question: "5. Which of the following is not a JavaScript operator?", options: ["A. typeof", "B. instanceof", "C. new", "D. delete"], correct: 1 },
        { question: "6. Which of the following is not a JavaScript event? ", options: ["A. click", "B. mouseover", "C. swipe", "D. keydown"], correct: 2 },
        { question: "7. The following are different ways to comment in JavaScript EXCEPT?", options: ["A. // Single-line comment", "B. /* Multi-line comment */", "C. <!-- Comment -->", "D. # Comment"], correct: 3 },
        { question: "8. How do you add an element to the end of an array in JavaScript?", options: ["A. array.push(element);", "B. array.unshift(element);", "C. array.pop(element);", "D. array.append(element);"], correct: 0 },
        { question: "9. How do you declare a variable in JavaScript?", options: ["A. var x;", "B. let x;", "C. const x;", "D. All of the above"], correct: 3 },
        { question: "10. How do you access the length of an array in JavaScript?", options: ["A. array.length()", "B. array.length", "C. array.size()", "D. array.size"], correct: 1 },
    ];
});
