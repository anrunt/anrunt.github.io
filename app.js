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


function checkLocalStorage() {
  if (localStorage.getItem("LongBreakTime") !== null ) {
    LongBreakInput.value = localStorage.getItem("LongBreakTime");
    longBreakFunc();
  } else {
    LongBreakInput.value = 15;
    localStorage.setItem("LongBreakTime", 15);
  }
  if (localStorage.getItem("ShortBreakTime") !== null) {
    ShortBreakInput.value = localStorage.getItem("ShortBreakTime");
    shortBreakFunc();
  } else {
    ShortBreakInput.value = 5;
    localStorage.setItem("ShortBreakTime", 5);
  }
  if (localStorage.getItem("FocusTime") !== null) {
    FocusTimeInput.value = localStorage.getItem("FocusTime");
    focusTimeFunc();
  } else {
    FocusTimeInput.value = 30;
    localStorage.setItem("FocusTime", 30);
  }
}

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
  title.textContent = `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
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
    timerStart.disabled = false;
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
  timerStart.disabled = true;
});

timerStop.addEventListener("click", () => {
  clearInterval(countTime);
  sound.play();
  timerStart.disabled = false;
});

function focusTimeFunc() {
  minutesCount = FocusTimeInput.value;
  title.textContent = `${FocusTimeInput.value}:00`;
  startingValue = FocusTimeInput.value;
  totalSeconds = minutesCount * 60;
  minutesTimer.textContent = `${FocusTimeInput.value
    .toString()
    .padStart(2, "0")}`;
  secondsTimer.textContent = "00";
}

function shortBreakFunc() {
  minutesCount = ShortBreakInput.value;
  title.textContent = `${ShortBreakInput.value}:00`;
  startingValue = ShortBreakInput.value;
  totalSeconds = minutesCount * 60;
  minutesTimer.textContent = `${ShortBreakInput.value
    .toString()
    .padStart(2, "0")}`;
  secondsTimer.textContent = "00";
}

function longBreakFunc() {
  minutesCount = LongBreakInput.value;
  title.textContent = `${LongBreakInput.value}:00`;
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
  localStorage.setItem("LongBreakTime", LongBreakInput.value);
  localStorage.setItem("CheckBoxChecked", checkCheckBox());
  loadCheck();
  document.location.reload();
});

function checkCheckBox() {
  if (muteCheckbox.checked) {
    return true;
  } else {
    return false;
  }
}

function loadCheck() {
  if (localStorage.getItem("CheckBoxChecked") === "true") {
    muteCheckbox.checked = true;
    sound.mute(true);
  } else if (localStorage.getItem("CheckBoxChecked") === "false") {
    sound.mute(false);
  }
}

skipTimeButton.addEventListener("click", () => {
  clearInterval(countTime);
  timerStart.disabled = false;  
  if (startingValue === FocusTimeInput.value) {
    shortBreakFunc();
  } else if (startingValue === ShortBreakInput.value) {
    focusTimeFunc();
  } else if (startingValue === LongBreakInput.value) {
    focusTimeFunc();
  }
});

loadCheck();
checkLocalStorage();