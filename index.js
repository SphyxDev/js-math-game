const questionText = document.getElementById("questionText");
const answerText = document.getElementById("answerText");
const inputField = document.getElementById("inputField");
const submitBtn = document.getElementById("submitBtn");

let correctAnswer;
let tryAgainTimeout;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function generateQuestion() {
    let num1 = randomNumber(1, 200);
    let num2 = 0;
    while (num2 == 0) {
        num2 = randomNumber(-100, 200);
    }

    if (num2 >= 0) {
        questionText.textContent = `${num1} + ${num2} = ?`;
    }
    else {
        questionText.textContent = `${num1} - ${-num2} = ?`;
    }

    correctAnswer = num1 + num2;
}
function evaluateAnswer() {
    clearTimeout(tryAgainTimeout);

    let response = inputField.value;
    if (response.length === 0) {
        answerText.textContent = "Please enter a valid answer.";
        tryAgainTimeout = setTimeout(() => answerText.textContent = " ", 2000);
    }
    else {
        response = Number(response);

        if (response == correctAnswer) {
            answerText.textContent = "Correct!";
            setTimeout(() => location.reload(), 500);
        }
        else {
            answerText.textContent = `${correctAnswer} was the correct answer.`;
            setTimeout(() => location.reload(), 1000);
        }

        submitBtn.disabled = true;
        inputField.disabled = true;
    }
}

generateQuestion();
submitBtn.onclick = evaluateAnswer;

inputField.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        submitBtn.click();
    }
});