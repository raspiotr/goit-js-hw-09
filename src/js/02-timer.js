import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const labels = document.querySelectorAll('.label');
labels.forEach(item => {
  item.style.textTransform = 'uppercase';
  item.style.fontSize = '12px';
});

const values = document.querySelectorAll('.value');
values.forEach(item => {
  item.style.fontSize = '30px';
  item.style.lineHeight = '30px';
});

const fields = document.querySelectorAll('.field');
fields.forEach(item => {
  item.style.display = 'flex';
  item.style.flexDirection = 'column';
  item.style.alignItems = 'center';
});

const timer = document.querySelector('.timer');
timer.style.display = 'flex';
timer.style.gap = '18px';
timer.style.marginTop = '20px';

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 3000,
      });
      startBtn.setAttribute('disabled', 'true');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};
const dateTimeElement = document.getElementById('datetime-picker');
const dateTimePicker = flatpickr(dateTimeElement, options);

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

const countdownStart = () => {
  const countdownInterval = setInterval(() => {
    const selectedDate = dateTimePicker.selectedDates[0];
    const actualDate = new Date();
    const timeDifference = selectedDate - actualDate;
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
    } else {
      updateTimer(timeDifference);
    }
  }, 1000);
};

startBtn.addEventListener('click', countdownStart);
