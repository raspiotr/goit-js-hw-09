import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const settlePromises = event => {
  event.preventDefault();

  const firstDelayInput = form.querySelector('input[name="delay"]');
  const delayStepInput = form.querySelector('input[name="step"]');
  const amountInput = form.querySelector('input[name="amount"]');
  const firstDelay = parseInt(firstDelayInput.value);
  const delayStep = parseInt(delayStepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 0; i < amount; i++) {
    const actualDelay = firstDelay + i * delayStep;
    createPromise(i + 1, actualDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 5000,
        });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          timeout: 5000,
        });
      });
  }
};

form.addEventListener('submit', settlePromises);
