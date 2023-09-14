function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.setAttribute('disabled', 'true');
let timerId = null;

const colorSwitcher = () => {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    const newColor = getRandomHexColor();
    body.style.backgroundColor = newColor;
  }, 1000);
};

const colorStop = () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'true');
};

startBtn.addEventListener('click', colorSwitcher);
stopBtn.addEventListener('click', colorStop);
