// UI variables
let inputField = document.querySelector('#input'),
  submit = document.querySelector('.submit'),
  message = document.querySelector('.msg'),
  minNum = document.querySelector('.min'),
  maxNum = document.querySelector('.max'),
  guesses = document.querySelector('.guesses'),
  wrapper = document.querySelector('main');

// Game values
let min = 1,
  max = 10,
  winningNum = Math.floor(Math.random() * max + min),
  guessLeft = 3;
console.log(winningNum);

minNum.textContent = min;
maxNum.textContent = max;
guesses.textContent = guessLeft;

// play again logic
wrapper.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Game logic
submit.addEventListener('click', function () {
  let guess = parseInt(inputField.value);
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`⛔ Please enter between ${min} & ${max}`, 'red');
    inputField.style.borderColor = 'red';
  } else {
    // player wins
    if (guess === winningNum) {
      inputField.disabled = true;
      inputField.style.borderColor = 'green';
      inputField.style.transition = 'border-color 2s ease-out';
      setMessage(`😍 You Win! ${winningNum} is correct `, 'green');
      submit.value = 'Play-again';
      submit.className = 'play-again';
    } else {
      guessLeft -= 1;

      if (guessLeft === 0) {
        // game over
        inputField.disabled = true;
        inputField.style.borderColor = 'red';
        inputField.style.transition = 'border-color 2s ease-out';
        setMessage(`😔 Game over, The correct guess is ${winningNum} `, 'red');
        guesses.textContent = 0;
        submit.value = 'Play-again';
        submit.className = 'play-again';
      } else {
        // wrong guess
        guesses.textContent = guessLeft;
        inputField.value = '';
        setMessage(`😢 Wrong guess, Try again `, 'red');
        inputField.style.borderColor = 'red';
      }
    }
  }
});

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
