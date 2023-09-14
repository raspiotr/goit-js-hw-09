import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const dateTimePicker = document.getElementById('datetime-picker');
flatpickr(dateTimePicker, options);

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', 'true');
