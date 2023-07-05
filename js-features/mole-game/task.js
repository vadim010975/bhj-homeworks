let deadCounter = 0;
let lostCounter = 0;

const checkStatus = () => {
  if (deadCounter === 10) {
    alert('Победа!');
  } else if (lostCounter === 5) {
    alert('Поражение!');
  } else {
    return;
  }
  deadCounter = 0;
  lostCounter = 0;
  setResults();
}

const setResults = () => {
  document.getElementById('dead').textContent = deadCounter;
  document.getElementById('lost').textContent = lostCounter;
}

for (let i = 1; i <= 9; i++) {
  document.getElementById(`hole${i}`).onclick = function () {
    if (this.classList.contains('hole_has-mole')) {
      deadCounter++;
    } else {
      lostCounter++;
    }
    setResults();
    setTimeout(checkStatus, 0);
  }
}
