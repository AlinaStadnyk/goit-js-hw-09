import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const picker = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');
const today = new Date();
start.disabled = true;
const dateChoice = flatpickr(picker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedId = selectedDates[0].getTime();
    if (today.getTime() >= selectedId) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      start.disabled = false;

      start.addEventListener('click', () => {
        const timerId = setInterval(() => {
          const ms = selectedId - new Date().getTime();

          if (ms < 0) {
            clearInterval(timerId);
            return;
          }

          const leftTime = convertMs(ms);

          function convertMs(ms) {
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;
            const days = addLeadingZero(Math.floor(ms / day));

            const hours = addLeadingZero(Math.floor((ms % day) / hour));
            const minutes = addLeadingZero(
              Math.floor(((ms % day) % hour) / minute)
            );
            const seconds = addLeadingZero(
              Math.floor((((ms % day) % hour) % minute) / second)
            );

            timerDays.textContent = days;
            timerHours.textContent = hours;
            timerMinutes.textContent = minutes;
            timerSeconds.textContent = seconds;
            return { days, hours, minutes, seconds };
          }
        }, 1000);

        start.disabled = true;
      });
    }
  },
});
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
  console.log(days);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
if (new Date().getTime() < 0) {
  clearInterval(timerId);
}
