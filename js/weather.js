// broswer에서 user의 위치 좌표를 줌
const API_KEY = "8f1eeffaeca169c14e62ba0539c7898c";
// API => 다른 서버와 이야기 할 수 있는 방법

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span");
      //   const name = data.name;
      //   const weather = data.weather[0].main;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}℃`;
      //   console.log(data.main.temp, data.main.feels_like);
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
