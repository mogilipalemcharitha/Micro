const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy-btn');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listen
generateBtn.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    passwordEl.value = generatePassword(length, hasUpper, hasNumber, hasSymbol);
});

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = passwordEl.value;

    if (!password) return;

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});

function generatePassword(length, upper, number, symbol) {
    let generatedPassword = '';
    const typesCount = upper + number + symbol + 1; // +1 for lowercase
    const typesArr = [
        { upper },
        { number },
        { symbol }
    ].filter(item => Object.values(item)[0]);

    // Create a password with at least one of each selected type
    for (let i = 0; i < typesArr.length; i++) {
        const funcName = Object.keys(typesArr[i])[0];
        generatedPassword += randomFunc[funcName]();
    }

    // Fill the rest of the password
    for (let i = generatedPassword.length; i < length; i++) {
        generatedPassword += getRandomLower();
    }

    // Shuffle the password
    return shufflePassword(generatedPassword);
}

function shufflePassword(password) {
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Generate a password on load
generateBtn.click();

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if (checkWin()) {
        gameActive = false;
        status.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        status.textContent = "Game ended in a draw!";
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame); 