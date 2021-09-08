//variables
const refs = {
  divEl: document.querySelector('#timer-1'),
  daysEl: document.querySelector('[data-value="days"]'),
  hoursEl: document.querySelector('[data-value="hours"]'),
  minsEl: document.querySelector('[data-value="mins"]'),
  secsEl: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    const finishTime = this.targetDate;
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = finishTime - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.updateClock(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClock({ days, hours, mins, secs }) {
    refs.daysEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minsEl.textContent = mins;
    refs.secsEl.textContent = secs;
  }
}

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('January 1, 2022'),
});

countdownTimer.start();
