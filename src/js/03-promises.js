import Notiflix from 'notiflix';
const form = document.querySelector('.form');

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);
  function createPromise(position, delay) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          res({ position, delay });
        } else {
          rej({ position, delay });
        }
      }, delay);
    });
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            timeout: 100000,
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            timeout: 100000,
          }
        );
      });
    delay += step;
  }
}
