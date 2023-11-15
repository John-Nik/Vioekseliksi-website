const questionBlock = document.querySelectorAll('.question-container');

questionBlock.forEach(questionBlockClickable);

function questionBlockClickable(questionBlockButton) {
    questionBlockButton.addEventListener('click', toggleAnswerReveal);
}

function toggleAnswerReveal (questionClicked) {
    let questionToToggle = questionClicked.currentTarget.parentElement;

    questionToToggle.classList.toggle('answer-reveal');
}