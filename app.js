const secondsTimer = document.querySelector(".seconds-timer");
const minutesTimer = document.querySelector(".minutes-timer");
const title = document.querySelector(".title");
const timerStart = document.querySelector(".start");
const timerStop = document.querySelector(".stop");

const focusTime = document.querySelector(".focus-time");
const shortBreak = document.querySelector(".short-break");
const longBreak = document.querySelector(".long-break");
const skipTimeButton = document.querySelector(".skip-time");

const settingsButton = document.querySelector("[data-open-modal]");
const exitSettings = document.querySelector("[data-close-modal]");
const modal = document.querySelector("[data-modal]");
const modalSettings = document.querySelector(".modal-settings");
const muteCheckbox = document.querySelector(".mute-sound-checkbox");

const FocusTimeInput = document.querySelector(".FocusTime-input");
const ShortBreakInput = document.querySelector(".ShortBreak-input");
const LongBreakInput = document.querySelector(".LongBreak-input");


FocusTimeInput.value = localStorage.getItem("FocusTime");
ShortBreakInput.value = localStorage.getItem("ShortBreakTime");
LongBreakInput.value = localStorage.getItem("LongBreaktime");

minutesTimer.textContent = `${FocusTimeInput.value
  .toString()
  .padStart(2, "0")}`;

let minutesCount = FocusTimeInput.value;
let startingValue = FocusTimeInput.value;
let totalSeconds = minutesCount * 60;
let loops = 0;

function updateTimeDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  minutesTimer.textContent = minutes.toString().padStart(2, "0");
  secondsTimer.textContent = remainingSeconds.toString().padStart(2, "0");
  title.textContent = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

let countTime;

function go() {
  if (totalSeconds >= 0) {
    updateTimeDisplay(totalSeconds);
    totalSeconds--;
  }

  if (totalSeconds < 0) {
    clearInterval(countTime);
    alarm.play();
    if (startingValue === FocusTimeInput.value) {
      shortBreakFunc();
    } else if (startingValue === ShortBreakInput.value) {
      focusTimeFunc();
    } else if (startingValue === LongBreakInput.value) {
      focusTimeFunc();
    }
    if (loops < minutesCount - 1) {
      setTimeout(function () {
        totalSeconds = minutesCount * 60;
        loops++;
      }, 0);
    }
  }
}

var sound = new Howl({
  src: ["sounds/click-sound.mp3"],
  volume: 0.3,
});

var alarm = new Howl({
  src: ["sounds/alarm-sound.mp3"],
  volume: 0.2,
});

timerStart.addEventListener("click", function () {
  loops = 0;
  go();
  countTime = setInterval(go, 1000);
  sound.play();
});

timerStop.addEventListener("click", () => {
  clearInterval(countTime);
  sound.play();
});

function focusTimeFunc() {
  minutesCount = FocusTimeInput.value;
  startingValue = FocusTimeInput.value;
  totalSeconds = minutesCount * 60;
  minutesTimer.textContent = `${FocusTimeInput.value
    .toString()
    .padStart(2, "0")}`;
  secondsTimer.textContent = "00";
}

function shortBreakFunc() {
  minutesCount = ShortBreakInput.value;
  startingValue = ShortBreakInput.value;
  totalSeconds = minutesCount * 60;
  minutesTimer.textContent = `${ShortBreakInput.value
    .toString()
    .padStart(2, "0")}`;
  secondsTimer.textContent = "00";
}

function longBreakFunc() {
  minutesCount = LongBreakInput.value;
  startingValue = LongBreakInput.value;
  totalSeconds = minutesCount * 60;
  minutesTimer.textContent = `${LongBreakInput.value
    .toString()
    .padStart(2, "0")}`;
  secondsTimer.textContent = "00";
}

focusTime.addEventListener("click", focusTimeFunc);

shortBreak.addEventListener("click", shortBreakFunc);

longBreak.addEventListener("click", longBreakFunc);

settingsButton.addEventListener("click", () => {
  modal.showModal();
  modalSettings.style.display = "flex";
});

exitSettings.addEventListener("click", () => {
  modal.close();
  modalSettings.style.display = "none";
  localStorage.setItem("FocusTime", FocusTimeInput.value);
  localStorage.setItem("ShortBreakTime", ShortBreakInput.value);
  localStorage.setItem("LongBreaktime", LongBreakInput.value);
  document.location.reload();
});

muteCheckbox.addEventListener("change", () => {
  if (muteCheckbox.checked) {
    sound.mute(true);
  } else {
    sound.mute(false);
  }
});

skipTimeButton.addEventListener("click", () => {
  clearInterval(countTime);
  if (startingValue === FocusTimeInput.value) {
    shortBreakFunc();
  } else if (startingValue === ShortBreakInput.value) {
    focusTimeFunc();
  } else if (startingValue === LongBreakInput.value) {
    focusTimeFunc();
  }
});
