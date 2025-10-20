let stopwatchContainer = document.createElement('div');
let timerContainer = document.createElement('div');
document.body.appendChild(stopwatchContainer);
document.body.appendChild(timerContainer);

stopwatchContainer.id = 'stopwatch-container';
timerContainer.id = 'timer-container';

function createButton(label, onClick, className = '') {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.onclick = onClick;
  if (className) btn.classList.add(className);
  return btn;
}

document.body.appendChild(createButton('Add Stopwatch', () => new Stopwatch()));
document.body.appendChild(createButton('Add Timer', () => new Timer()));

class Stopwatch {
  constructor() {
    this.startTime = null;
    this.elapsed = 0;
    this.running = false;
    this.interval = null;

    this.element = document.createElement('div');
    this.element.className = 'stopwatch';

    this.timeDisplay = document.createElement('span');
    this.timeDisplay.textContent = '00:00:00';

    const startBtn = createButton('Start', () => this.start());
    const pauseBtn = createButton('Pause', () => this.pause());
    const resetBtn = createButton('Reset', () => this.reset());
    const deleteBtn = createButton('Delete', () => this.delete(), 'delete');

    this.element.append(this.timeDisplay, startBtn, pauseBtn, resetBtn, deleteBtn);
    stopwatchContainer.appendChild(this.element);
  }

  updateDisplay() {
    const time = this.elapsed + (this.running ? Date.now() - this.startTime : 0);
    const date = new Date(time);
    this.timeDisplay.textContent = date.toISOString().substr(11, 8);
  }

  start() {
    if (!this.running) {
      this.startTime = Date.now();
      this.running = true;
      this.interval = setInterval(() => this.updateDisplay(), 1000);
    }
  }

  pause() {
    if (this.running) {
      this.elapsed += Date.now() - this.startTime;
      clearInterval(this.interval);
      this.running = false;
    }
  }

  reset() {
    this.elapsed = 0;
    this.startTime = null;
    this.running = false;
    clearInterval(this.interval);
    this.updateDisplay();
  }

  delete() {
    clearInterval(this.interval);
    this.element.remove();
  }
}

class Timer {
  constructor() {
    this.duration = 0;
    this.remaining = 0;
    this.interval = null;
    this.audio = null;

    this.element = document.createElement('div');
    this.element.className = 'timer';

    this.input = document.createElement('input');
    this.input.type = 'number';
    this.input.placeholder = 'Seconds';

    this.timeDisplay = document.createElement('span');
    this.timeDisplay.textContent = '00:00';

    const startBtn = createButton('Start', () => this.start());
    const resetBtn = createButton('Reset', () => this.reset());
    const deleteBtn = createButton('Delete', () => this.delete(), 'delete');
    this.stopBtn = createButton('Stop', () => this.stopAlert(), 'stop');
    this.stopBtn.style.display = 'none';

    this.element.append(this.input, this.timeDisplay, startBtn, resetBtn, deleteBtn, this.stopBtn);
    timerContainer.appendChild(this.element);
  }

  updateDisplay() {
    const mins = String(Math.floor(this.remaining / 60)).padStart(2, '0');
    const secs = String(this.remaining % 60).padStart(2, '0');
    this.timeDisplay.textContent = `${mins}:${secs}`;
  }

  start() {
    this.duration = parseInt(this.input.value);
    if (isNaN(this.duration) || this.duration <= 0) return;

    this.remaining = this.duration;
    this.updateDisplay();

    this.interval = setInterval(() => {
      this.remaining--;
      this.updateDisplay();
      if (this.remaining <= 0) {
        clearInterval(this.interval);
        this.alert();
      }
    }, 1000);
  }

  reset() {
    clearInterval(this.interval);
    this.remaining = 0;
    this.updateDisplay();
    this.element.classList.remove('alert');
    this.stopBtn.style.display = 'none';
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  delete() {
    clearInterval(this.interval);
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.element.remove();
  }

  alert() {
    this.element.classList.add('alert');
    this.audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    this.audio.loop = true;
    this.audio.play();
    this.stopBtn.style.display = 'inline-block';
  }

  stopAlert() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.element.classList.remove('alert');
    this.stopBtn.style.display = 'none';
  }
}