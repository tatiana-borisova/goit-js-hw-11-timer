class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.refs = {
      divEl: document.querySelector(selector),
      daysEl: document.querySelector(`${selector} [data-value="days"]`),
      hoursEl: document.querySelector(`${selector} [data-value="hours"]`),
      minsEl: document.querySelector(`${selector} [data-value="mins"]`),
      secsEl: document.querySelector(`${selector} [data-value="secs"]`),
      textEl: document.querySelector(`${selector} > .text`),
    };
    this.targetDate = targetDate;
    this.start();
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
    if (this.targetDate > Date.now()) {
      this.refs.daysEl.textContent = days;
      this.refs.hoursEl.textContent = hours;
      this.refs.minsEl.textContent = mins;
      this.refs.secsEl.textContent = secs;
    } else {
      this.refs.textEl.textContent = 'Happy New Year!';
    }
  }
}

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('January 1, 2022'),
});

const countdownTimer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('January 1, 2023'),
});
