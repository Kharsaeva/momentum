// 1. Часы и календарь

const time = document.querySelector(".time");
const dateDiv = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

function updateTimeAndDate() {
  const date = new Date();
  const options = { month: "long", day: "numeric", timeZone: "UTC" };
  const currentTime = date.toLocaleTimeString();
  const currentDate = date.toLocaleDateString("en-US", options);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = date.getDay();

  time.textContent = currentTime;
  dateDiv.textContent = `${days[day]}, ${currentDate}`;

  showGreeting();
}

updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);

function getTimeOfDay() {
  var currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour <= 11) {
    return "morning";
  } else if (currentHour >= 12 && currentHour <= 17) {
    return "afternoon";
  } else if (currentHour >= 18 && currentHour <= 23) {
    return "evening";
  } else {
    return "night";
  }
}

// 2. Приветствие

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greeting.textContent = greetingText;
}

const input = document.getElementById("name");

function setLocalStorage() {
  localStorage.setItem("name", input.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    input.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

// 3. Слайдер изображений

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

let randomNum = getRandomNum();

function setBg() {
  // const img = new Image();
  const timeOfDay = getTimeOfDay();
  let bgNum = getRandomNum().toString().padStart(2, "0");
  let bgUrl = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;

  // img.src = bgUrl;
  // img.onload = () => {
  //   document.body.style.backgroundImage = bgUrl;
  // }

  document.body.style.backgroundImage = bgUrl;
}

setBg();

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

let num = 1;
let timeOfDay = getTimeOfDay();

function getSlideNext() {
  let bgNum = num.toString().padStart(2, "0");

  if (num === 20) {
    num = 1;
  } else {
    num++;
  }

  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}

function getSlidePrev() {
  let bgNum = num.toString().padStart(2, "0");

  if (num === 1) {
    num = 20;
  } else {
    num--;
  }

  document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

// 4. Виджет погоды

// 5. Виджет "цитата дня"

const quoteElement = document.querySelector(".quote");
const authorElement = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = "/momentum/js/data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const randomQuote = data[Math.floor(Math.random() * data.length)];

  quoteElement.textContent = randomQuote.text;
  authorElement.textContent = randomQuote.author;
}

getQuotes();

changeQuote.addEventListener("click", getQuotes);

// 6. Аудиоплеер

import playList from "./playList.js";

const playBtn = document.querySelector(".play");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
const audio = document.querySelector("audio");
let index = 0;

playList.forEach((el) => {
  const li = document.createElement("li");

  li.classList.add("play-item");
  playListContainer.append(li);
  li.textContent = el.title;
});

let isPlay = false;

function playTrack() {
  audio.src = playList[index].src;
  audio.play();
  playBtn.classList.add("playing");
}

const playItems = document.querySelectorAll(".play-item");

playBtn.addEventListener("click", (e) => {
  playItems.forEach((el) => {
    el.classList.remove("item-active");
  });

  if (isPlay) {
    playBtn.classList.remove("pause");
    audio.pause();
    isPlay = !isPlay;
  } else {
    playBtn.classList.add("pause");
    audio.src = playList[index].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = !isPlay;
  }

  playItems[index].classList.add("item-active");
});

playPrev.addEventListener("click", () => {
  playItems.forEach((el) => {
    el.classList.remove("item-active");
  });

  index = (index - 1 + playList.length) % playList.length;
  playTrack();
  playItems[index].classList.add("item-active");
});

playNext.addEventListener("click", () => {
  playItems.forEach((el) => {
    el.classList.remove("item-active");
  });

  index = (index + 1) % playList.length;
  playTrack();
  playItems[index].classList.add("item-active");
});

// 7. Продвинутый аудиоплеер

// 8. Перевод приложения

// 9. Получение фонового изображения от API

// 10. Настройки приложения