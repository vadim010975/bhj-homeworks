let countClick = 0;
let oldTime = new Date().getTime();
const elClickerCounter = document.getElementById('clicker__counter');
elClickerCounter.insertAdjacentHTML('afterend', '<br> Скорость клика: <span id="clicker__speedometer">0</span>');

document.getElementById('cookie').onclick = function () {
    countClick++;
    elClickerCounter.textContent = countClick.toString();
    this.style.width != "220px" ? this.style.width = "220px" : this.style.width = "200px";
    const time = new Date().getTime();
    const speed = (1000 / (time - oldTime)).toFixed(2);
    document.getElementById('clicker__speedometer').textContent = speed;
    oldTime = time;
}