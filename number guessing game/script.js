// Game variables
let targetNumber;
let attempts;
const maxNumber = 100;
const minNumber = 1;

// DOM elements
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const resetButton = document.getElementById('reset-button');
const messageElement = document.getElementById('message');
const attemptsElement = document.getElementById('attempts');

// Initialize the game
function initGame() {
    targetNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    attempts = 0;
    updateAttempts();
    messageElement.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
}

// Update attempts display
function updateAttempts() {
    attemptsElement.textContent = `Attempts: ${attempts}`;
}

// Check the guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // Validate input
    if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
        messageElement.textContent = `Please enter a valid number between ${minNumber} and ${maxNumber}`;
        messageElement.style.color = 'red';
        return;
    }

    attempts++;
    updateAttempts();

    if (userGuess === targetNumber) {
        messageElement.textContent = `Congratulations! You guessed the number in ${attempts} attempts!`;
        messageElement.style.color = 'green';
        guessInput.disabled = true;
        guessButton.disabled = true;
    } else if (userGuess < targetNumber) {
        messageElement.textContent = 'Too low! Try a higher number.';
        messageElement.style.color = 'blue';
    } else {
        messageElement.textContent = 'Too high! Try a lower number.';
        messageElement.style.color = 'blue';
    }

    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
guessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', initGame);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Start the game
initGame(); 