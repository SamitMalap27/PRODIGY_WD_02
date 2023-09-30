
// Get the HTML elements
const secondsElement = document.querySelector(".seconds");
const tensElement = document.querySelector(".tens");
const startButton = document.querySelector(".btn-start");
const resetButton = document.querySelector(".btn-reset");
const lapButton = document.querySelector(".btn-lap");
const lapList = document.querySelector(".lap-list");

let intervalId;
let running = false;
let tens = 0;
let seconds = 0;
let laps = [];
function startStop() {
    if (running) {
        clearInterval(intervalId);
        startButton.textContent = "Start";
    } else {
        intervalId = setInterval(updateTime, 10);
        startButton.textContent = "Stop";
    }
    running = !running;
}

function reset() {
    clearInterval(intervalId);
    startButton.textContent = "Start";
    tens = 0;
    seconds = 0;
    tensElement.textContent = "00";
    secondsElement.textContent = "00";
    laps = [];
    updateLapList();
}


function lap() {
    if (running) {
        laps.push(seconds + "." + tens);
        updateLapList();
    }
}

function updateLapList() {
    lapList.innerHTML = "";
    laps.forEach((lapTime, index) => {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${index + 1}: ${lapTime}s`;
        lapList.appendChild(lapItem);
    });
}

function updateTime() {
    tens++;

    if (tens < 10) {
        tensElement.textContent = "0" + tens;
    } else {
        tensElement.textContent = tens;
    }

    if (tens === 99) {
        tens = 0;
        seconds++;

        if (seconds < 10) {
            secondsElement.textContent = "0" + seconds;
        } else {
            secondsElement.textContent = seconds;
        }
    }
}

startButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
