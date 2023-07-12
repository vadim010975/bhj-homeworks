const wordElement = document.querySelector('.word');
let currentSymbol;
let countSucces = 0;
let countFail = 0;
let timeoutId = null;
const words = [
  'bob это имя',
  'я люблю kitkat',
  'мне нравится netology',
  'hello Вася',
  'кошка по имени kitty',
  'rock навсегда',
  'youtube',
  'popcorn купили',
  'cinema тограф',
  'love это любовь',
  'javascript это круто'
];

const setWord = () => {
  const word = words[Math.floor(Math.random() * words.length)];
  let html = '';
  [...word].forEach((symbol, i) => {
    html += `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${symbol}</span>`;
  });
  wordElement.innerHTML = html;
  runTimer(word.length);
}

const success = (currentSymbol) => {
  currentSymbol.classList.remove('symbol_current');
  currentSymbol.classList.add('symbol_correct');
  if (currentSymbol.nextElementSibling) {
    currentSymbol.nextElementSibling.classList.add('symbol_current');
    return;
  }
  document.querySelector('.status__wins').textContent = ++countSucces;
  if (countSucces === 10) {
    stopTimer();
    alert('Вы победили!');
    clearCounts();
    setWord();
  }
  setWord();
}

const fail = () => {
  stopTimer();
  document.querySelector('.status__loss').textContent = ++countFail;
  if (countFail === 5) {
    alert('Вы проиграли!');
    clearCounts();
    setWord();
  }
  setWord();
}

const clearCounts = () => {
  countSucces = 0;
  countFail = 0;
  document.querySelector('.status__wins').textContent = countSucces;
  document.querySelector('.status__loss').textContent = countFail;
}

const runTimer = (sec) => {
  const sumTimes = new Date().getTime() + (sec + 0.99) * 1000;
  const run = () => {
    const timer = ((sumTimes - new Date().getTime()) / 1000).toFixed(0);
    document.querySelector('.status__timer').textContent = timer;
    if (timer <= 0) {
      clearTimeout(timeoutId);
      timeoutId = null;
      fail();
      return;
    }
    clearTimeout(timeoutId);
    timeoutId = null;
    timeoutId = setTimeout(run, 50);
  }
  run();
}

const stopTimer = () => {
  clearTimeout(timeoutId);
  timeoutId = null;
}



setWord();

document.addEventListener('keydown', (event) => {
  const currentSymbol = wordElement.querySelector('.symbol_current');
  if (event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt') {
    if (event.key.toUpperCase() === currentSymbol.textContent.toUpperCase()) {
      success(currentSymbol);
    } else {
      fail();
    }
  }
});


