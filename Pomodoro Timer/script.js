const start = document.getElementById('start');
const reset = document.getElementById('reset');
const stop = document.getElementById('stop');
const timer = document.getElementById('timer');

let timeleft = 1500;
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeleft /60);
    const seconds = timeleft % 60;

    timer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

};

const startTimer = () => {
    interval = setInterval(() => {
        timeleft--;
        updateTimer();
        if (timeleft <= 0) {
            clearInterval(interval);
            alert("Time's up!");
            timeleft = 1500;
            updateTimer();
        }
    }, 
    1000)
}

const stopTimer = () => clearInterval(interval);

const resetTimer = () => {
    clearInterval(interval);
    timeleft = 1500;
    updateTimer();
}

start.addEventListener('click', startTimer);
stop.addEventListener('click', stopTimer);
reset.addEventListener('click', resetTimer);