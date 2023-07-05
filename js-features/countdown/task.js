const url = 'doc.txt';
const elementTimer = document.getElementById('timer');
const sumTimes = new Date().getTime() + (parseInt(elementTimer.textContent) + 0.99) * 1000;
document.querySelector('.card').style.width = '401px';

const loadFile = () => location.assign(url);

const run = () => {
  const timer = sumTimes - new Date().getTime();
  const seconds = Math.floor((timer / 1000) % 60);
  const minutes = Math.floor((timer / 1000 / 60) % 60);
  const hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
  elementTimer.textContent = `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
  if (hours <= 0 && minutes <= 0 && seconds <= 0) {
    setTimeout(() => {
      alert('Вы победили в конкурсе');
      loadFile();
    }, 0);
    clearTimeout(timeoutId);
    timeoutId = null;
    return;
  }
  timeoutId = setTimeout(run, 50);
}

run();
