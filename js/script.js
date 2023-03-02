// Часы и календарь

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

// Приветствие

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

// Слайдер изображений

function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

async function setBg(num) {
  if (localStorage.getItem("unsplash")) {
    const tag = localStorage.getItem("tag");
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=gOn77SG2GjMdqV0t19-5JJKDvRNtBzTH9bNPN50QqPk`;
    const res = await fetch(url);
    const data = await res.json();

    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${img.src})`;
    };
  } else {
    const timeOfDay = getTimeOfDay();
    const bgNum = num.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${img.src})`;
    };
  }
}

function switchSlide(direction) {
  if (direction === "next") {
    num = num === 20 ? 1 : num + 1;
  } else if (direction === "prev") {
    num = num === 1 ? 20 : num - 1;
  }

  setBg(num);
}

let num = getRandomNum();
setBg(num);

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

slideNext.addEventListener("click", () => switchSlide("next"));
slidePrev.addEventListener("click", () => switchSlide("prev"));

// API

const tagInput = document.querySelector(".tag-photo");
const unsplashApi = document.querySelector(".unsplash");
const github = document.querySelector(".github");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  setLocalStorageTag();
  setBg(num);
});

unsplashApi.addEventListener("click", () => {
  localStorage.setItem("unsplash", true);
  localStorage.setItem("bgImgSource", "unsplash");
  setBg(num);
});

github.addEventListener("click", () => {
  localStorage.removeItem("unsplash");
  localStorage.setItem("bgImgSource", "github");
  setBg(num);
});

function setLocalStorageTag() {
  localStorage.setItem("tag", tagInput.value);
}

window.addEventListener("beforeunload", setLocalStorageTag);

function getLocalStorageTag() {
  if (localStorage.getItem("tag")) {
    tagInput.value = localStorage.getItem("tag");
  }
}

window.addEventListener("load", getLocalStorageTag);

// Виджет погоды

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const cityInput = document.querySelector(".city");

async function getWeather() {
  if (!cityInput.value) {
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=ru&appid=871306050949094e6ff671b4948e6461&units=metric`;
  const res = await fetch(url);

  if (!res.ok) {
    weatherDescription.textContent =
      "Ошибка: введите корректное название города.";
    return;
  }

  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp.toFixed(0))}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `Влажность: ${data.main.humidity}%`;
  wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
}

function setCity(event) {
  if (event.code === "Enter") {
    getWeather();
    cityInput.blur();
  }
}

function setLocalStorageWeather() {
  localStorage.setItem("city", cityInput.value);
}

window.addEventListener("beforeunload", setLocalStorageWeather);

function getLocalStorageWeather() {
  if (localStorage.getItem("city")) {
    cityInput.value = localStorage.getItem("city");
    getWeather();
  }
}

window.addEventListener("load", getLocalStorageWeather);

cityInput.addEventListener("keypress", setCity);

// Виджет "цитата дня"

const quoteElement = document.querySelector(".quote");
const authorElement = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = "https://63fbc8926deb8bdb814aa5a0.mockapi.io/title";
  const res = await fetch(quotes);
  const data = await res.json();
  const randomQuote = data[Math.floor(Math.random() * data.length)];

  quoteElement.textContent = randomQuote.text;
  authorElement.textContent = randomQuote.author;
}

getQuotes();

changeQuote.addEventListener("click", getQuotes);

// Аудиоплеер

import playList from "./playList.js";

const playBtn = document.querySelector(".play");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
const audio = document.querySelector(".audio");
const trackName = document.querySelector(".track-name");
const trackTime = document.querySelector(".current-time");
const trackTotalTime = document.querySelector(".total-time");
const volumeSlider = document.getElementById("volume");
const durationProgress = document.querySelector(".duration-progress");

let index = 0;
let isPlay = false;

// Регулятор громкости

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
  if (audio.volume !== 0) {
    muteBtn.src = "./assets/svg/speaker.svg";
  }
});

const muteBtn = document.querySelector(".mute");

let prevVolume = volumeSlider.value;

muteBtn.addEventListener("click", () => {
  if (audio.volume !== 0) {
    prevVolume = volumeSlider.value;
    audio.volume = 0;
    volumeSlider.value = 0;
    muteBtn.classList.add("muted");
    muteBtn.src = "./assets/svg/speaker-mute.svg";
  } else {
    audio.volume = prevVolume;
    volumeSlider.value = prevVolume;
    muteBtn.classList.remove("muted");
    muteBtn.src = "./assets/svg/speaker.svg";
  }
});

// Плейлист

playList.forEach((el) => {
  const li = document.createElement("li");

  li.classList.add("play-item");
  playListContainer.append(li);
  li.textContent = el.title;
});

// Воспроизведение аудио

function playTrack() {
  if (!isPlay) {
    playBtn.classList.remove("pause");
    audio.pause();
    isPlay = !isPlay;
  } else {
    audio.src = playList[index].src;
    audio.play();
    playBtn.classList.add("playing");
  }
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
    audio.play();
    isPlay = !isPlay;
  }

  trackName.textContent = playList[index].title;
  trackTotalTime.textContent = playList[index].duration;
  playItems[index].classList.add("item-active");
});

// Прогресс бар проигрывания аудио

function updateProgress() {
  const progress = Math.floor((audio.currentTime / audio.duration) * 100);
  durationProgress.value = progress;
}

function setProgress(e) {
  const newTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = newTime;
}

audio.addEventListener("timeupdate", updateProgress);
durationProgress.addEventListener("change", setProgress);

// Отображение текущего времени воспроизведения

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
}

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  durationProgress.value = progress;
  trackTime.textContent = formatTime(currentTime);
});

// Автоматическое переключение на следующий трек после окончания
// проигрывания первого, после последнего снова проигрывается первый

audio.addEventListener("ended", () => {
  index++;
  if (index >= playList.length) {
    index = 0;
  }
  audio.src = playList[index].src;
  audio.play();
  trackName.textContent = playList[index].title;
  trackTotalTime.textContent = playList[index].duration;
  playItems.forEach((el) => {
    el.classList.remove("item-active");
  });
  playItems[index].classList.add("item-active");
});

// Кнопки переключения аудио на предидущий и следующий трек

playPrev.addEventListener("click", () => {
  if (isPlay) {
    playBtn.classList.remove("pause");
  } else {
    playBtn.classList.add("pause");
    audio.play();
    isPlay = !isPlay;
  }

  playItems.forEach((el) => {
    el.classList.remove("item-active");
  });

  index = (index - 1 + playList.length) % playList.length;
  playTrack();
  playItems[index].classList.add("item-active");
  playBtn.classList.add("pause");
  trackName.textContent = playList[index].title;
  trackTotalTime.textContent = playList[index].duration;
});

playNext.addEventListener("click", () => {
  if (isPlay) {
    playBtn.classList.remove("pause");
  } else {
    playBtn.classList.add("pause");
    audio.play();
    isPlay = !isPlay;
  }

  playItems.forEach((el) => {
    el.classList.remove("item-active");
  });

  index = (index + 1) % playList.length;
  playTrack();
  playItems[index].classList.add("item-active");
  playBtn.classList.add("pause");
  trackName.textContent = playList[index].title;
  trackTotalTime.textContent = playList[index].duration;
});

// Перевод приложения

// Получение фонового изображения от API

// Настройки приложения

const blocksList = document.querySelector(".blocks-list");
const settings = {
  Время: "time",
  Дата: "date",
  Приветствие: "greeting",
  Цитата: "quote",
  Погода: "weather",
  Аудио: "audio",
  "Список дел": "todolist",
};

blocksList.addEventListener("click", (e) => {
  const el = e.target;
  const nameSetting = settings[el.textContent] || "";

  if (!nameSetting) {
    return;
  }

  el.classList.toggle("invisible");
  const settingElement = document.getElementById(nameSetting);
  if (settingElement) {
    settingElement.classList.toggle("hidden");
  }
});

const settingsIcon = document.querySelector(".settings-icon");
const settingsBlock = document.querySelector(".settings-block");

settingsIcon.addEventListener("click", () => {
  settingsBlock.classList.toggle("active");
});

// const themeBlock = document.querySelector(".theme");
// const markTheme = document.querySelectorAll(".mark-theme");

// function setLocalStorageThemeMark() {
//   localStorage.setItem("bgImageSource", "github");
// }

// window.addEventListener("beforeunload", setLocalStorageThemeMark);

// function getLocalStorageThemeMark() {
//   localStorage.setItem("bgImageSource", "github");
//   const img = new Image();
//   img.src = "/assets/icons/mark.png";
//   img.classList.add("mark");
//   github.appendChild(img);
// }

// window.addEventListener("load", getLocalStorageThemeMark);

// themeBlock.addEventListener("click", (e) => {
//   const el = e.target;

//   if (el.textContent.toLowerCase() === localStorage.getItem("bgImageSource")) {
//     const img = new Image();
//     img.src = "/assets/icons/mark.png";
//     img.classList.add("mark");
//     el.appendChild(img);
//   } else {

//   }
// });

// const markItems = document.querySelectorAll(".mark-img");

// markItems.forEach((item) => {
//   item.addEventListener("click", () => {
//     const selectItem = document.querySelector(".select");
//     if (selectItem) {
//       selectItem.classList.remove("select");
//       selectItem.removeChild(selectItem.lastChild);
//       localStorage.removeItem(selectItem.id); // удаляем состояние предыдущего элемента из localStorage
//     }

//     // устанавливаем класс select на текущий элемент
//     item.classList.add("select");

//     // создаем и добавляем галочку
//     const checkbox = document.createElement("span");
//     checkbox.classList.add("checkbox");
//     checkbox.innerHTML = "&#10003;";
//     item.appendChild(checkbox);

//     localStorage.setItem(item.id, "checked"); // сохраняем состояние галочки в localStorage
//   });
// });

// // восстанавливаем состояние при загрузке страницы
// window.addEventListener("load", () => {
//   const selectItemId = localStorage.getItem("selectItemId");
//   if (selectItemId) {
//     const selectItemId = document.getElementById(selectItemId);
//     if (selectItemId) {
//       selectItemId.click(); // имитируем клик на элементе, чтобы восстановить галочку
//     }
//   } else {
//     // если нет сохраненного состояния, устанавливаем галочку на первом элементе
//     markItems[0].click();
//   }
// });

// // сохраняем состояние при закрытии страницы
// window.addEventListener("beforeunload", () => {
//   const selectItem = document.querySelector(".select");
//   if (selectItem) {
//     localStorage.setItem("selectItemId", selectItem.id);
//   }
// });

// Список дел - ToDo

const todoInput = document.getElementsByClassName("todo-input")[0];
const addTaskBtn = document.getElementsByClassName("add-btn")[0];
let taskList = [];

function deleteItem(index) {
  taskList.splice(index, 1);
  localStorage.setItem("localItem", JSON.stringify(taskList));
  showItem();
}

addTaskBtn.addEventListener("click", function () {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }

  if (todoInput.value.trim() != "") {
    taskList.unshift(todoInput.value);
    localStorage.setItem("localItem", JSON.stringify(taskList));
  }

  todoInput.value = "";
  showItem();
});

function showItem() {
  let localItems = JSON.parse(localStorage.getItem("localItem"));
  if (localItems === null) {
    taskList = [];
  } else {
    taskList = localItems;
  }

  let html = "";
  let itemShow = document.querySelector(".todo-items");
  taskList.forEach((data, index) => {
    html += `
      <div class="todo-item">
        <p class="todo-p">${data}</p>
        <button class="delete-todo" data-index="${index}"><img width="18" src="/assets/icons/del3.png" alt=""></button>
      </div>
    `;
  });
  itemShow.innerHTML = html;

  const deleteTask = document.querySelectorAll(".delete-todo");
  deleteTask.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = btn.dataset.index;
      deleteItem(index);
    });
  });
}

showItem();

const clearAllBtn = document.querySelector(".clear-all-btn");

clearAllBtn.addEventListener("click", function () {
  localStorage.clear();
  showItem();
});

const todoList = document.querySelector(".todo-list");
const todoIcon = document.querySelector(".todo-icon");

todoIcon.addEventListener("click", () => {
  todoList.classList.toggle("active");
});
