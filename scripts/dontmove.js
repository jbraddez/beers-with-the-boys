let motionActive = false;
var threshold = 3; 
const status = document.getElementById('status');
const timerDisplay = document.getElementById('timer');

let timerInterval;
let startTime;

document.getElementById('startBtn').addEventListener('click', async () => {
    document.getElementById('startBtn').ariaDisabled = true;
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const response = await DeviceMotionEvent.requestPermission();
      if (response !== 'granted') throw 'Permission denied';
    } catch (err) {
      status.innerHTML = 'Motion access denied';
      return;
    }
  }

  status.innerHTML = 'Game started. Don’t move...';
  timerDisplay.textContent = "0.0s";
  motionActive = true;

  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    timerDisplay.textContent = `${elapsed}s`;
  }, 100);

  setTimeout(() => {
    window.addEventListener('devicemotion', detectMovement);
    }, 300);
});

function detectMovement(event) {
  if (!motionActive) return;

  const acc = event.acceleration;
  const totalAcc = Math.abs(acc.x || 0) + Math.abs(acc.y || 0) + Math.abs(acc.z || 0);

  if (totalAcc > threshold) {
    motionActive = false;
    clearInterval(timerInterval);
    window.removeEventListener('devicemotion', detectMovement);

    const finalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    status.innerHTML = `You moved after <span class="warning">${finalTime}s</span>!`;
    localStorage.setItem('lastTime', finalTime);
    setTimeout(() => {
        window.location.reload();
    }, 1000);
  }
}

document.getElementById("difficulty").addEventListener("change", function() {
    threshold = parseFloat(this.value);
    localStorage.setItem('DMdifficulty',this.value);
});

threshold = parseFloat(localStorage.getItem('DMdifficulty') || 3);

document.getElementById('lastTime').textContent = localStorage.getItem('lastTime') + 's' || '';