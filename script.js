let score = 0;
let countdown = 5;
let timerInterval;

function generateRandomColor() {
  const colors = ['red', 'blue', 'yellow', 'purple', 'black', 'green'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomButtonInfo() {
  const colors = ['red', 'blue', 'yellow', 'purple', 'black', 'green'];
  const correctColor = generateRandomColor();
  const buttonTexts = colors.map(color => ({
    text: color,
    color: color === correctColor ? correctColor : generateRandomColor()
  }));
  return { buttonTexts, correctColor };
}

function updateButtons() {
  const buttonsContainer = document.getElementById('buttons');
  buttonsContainer.innerHTML = '';

  const { buttonTexts, correctColor } = generateRandomButtonInfo();

  buttonTexts.forEach(({ text, color }) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.color = color;
    button.dataset.color = color; // Salva il colore nel dataset del bottone
    button.addEventListener('click', () => checkAnswer(button));
    buttonsContainer.appendChild(button);
  });
}

function checkAnswer(clickedButton) {
  const clickedColor = clickedButton.dataset.color;
  if (countdown > 0) {
    if (clickedColor.toLowerCase() === clickedButton.textContent.toLowerCase()) {
      score++;
    } else {
      score = Math.max(0, score - 1);
    }
    updateScore();
    resetGame();
  }
}

function updateScore() {
  document.getElementById('score').textContent = 'Punteggio: ' + score;
}

function resetGame() {
  clearInterval(timerInterval);
  countdown = 5;
  updateTimer();
  updateButtons();
  startTimer();
}

function updateTimer() {
  document.getElementById('timer').textContent = 'Tempo: ' + countdown;
}

function startTimer() {
  timerInterval = setInterval(() => {
    countdown--;
    updateTimer();
    if (countdown === 0) {
      resetGame();
    }
  }, 1000);
}

// Inizializza il gioco
updateButtons();
startTimer();
