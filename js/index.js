"use strict";
// NavBar
const NavLinks = Array.from(document.querySelectorAll(".nav-link"));
for (let i = 0; i < NavLinks.length; ++i) {
  NavLinks[i].addEventListener("click", function () {
    const ActiveOne = document.querySelector(".active");
    ActiveOne.classList.remove("active");
    NavLinks[i].classList.add("active");
  });
}
// Search bar
const Input = document.querySelector(".Part1 input");
// Proccess Functions
async function GetData(X) {
  const IntialData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f6640698932042a6a5f164627232408&q=${X}&days=3`
  );
  const FinalData = await IntialData.json();
  return FinalData;
}
function FillTodayData(ReponseData) {
  const ToDay = new Date();
  document.querySelector("#Card1 .card-header #Day").innerHTML =
    ToDay.toLocaleDateString("en-US", { weekday: "long" });
  document.querySelector("#Card1 .card-header #DayNum").innerHTML =
    ToDay.getDate();
  document.querySelector("#Card1 .card-header #Month").innerHTML =
    ToDay.toLocaleDateString("en-US", { month: "long" });
  document.querySelector("#Card1 h3").innerHTML = ReponseData.location.name;
  document.querySelector("#Card1 h4").innerHTML = ReponseData.location.country;
  document.querySelector(
    "#Card1 h2"
  ).innerHTML = `${ReponseData.current.temp_c} &deg;C`;
  document.querySelector("#Card1 .WeatherDesc").innerHTML =
    ReponseData.current.condition.text;
  document
    .querySelector("#Card1 img")
    .setAttribute("src", ReponseData.current.condition.icon);
  document.querySelector(
    "#Card1 .Humidity"
  ).innerHTML = `${ReponseData.current.humidity}%`;
  document.querySelector(
    "#Card1 .WindSpeed"
  ).innerHTML = `${ReponseData.current.wind_kph} Kph`;
  document.querySelector("#Card1 .WindDirection").innerHTML =
    ReponseData.current.wind_dir;
}
function FillNextDayData(ReponseData) {
  const Forecast = ReponseData.forecast.forecastday[1].day;
  const ForecastDate = ReponseData.forecast.forecastday[1].date;
  const NextDay = new Date(ForecastDate);
  document.querySelector("#Card2 .card-header .Day").innerHTML =
    NextDay.toLocaleDateString("en-US", { weekday: "long" });
  document.querySelector("#Card2 .card-header .DayNum").innerHTML =
    NextDay.getDate();
  document.querySelector("#Card2 .card-header .Month").innerHTML =
    NextDay.toLocaleDateString("en-US", { month: "long" });
  document.querySelector(
    "#Card2 #MaxTemp"
  ).innerHTML = `Max Temp. ${Forecast.maxtemp_c} &deg;C`;
  document.querySelector(
    "#Card2 #MinTemp"
  ).innerHTML = `Min Temp. ${Forecast.mintemp_c} &deg;C`;
  document.querySelector("#Card2 .WeatherDesc").innerHTML =
    Forecast.condition.text;
  document
    .querySelector("#Card2 .card-body img")
    .setAttribute("src", Forecast.condition.icon);
  document.querySelector(
    "#Card2 .Humidity"
  ).innerHTML = `${Forecast.avghumidity}%`;
  document.querySelector(
    "#Card2 .WindSpeed"
  ).innerHTML = `${Forecast.maxwind_kph} Kph`;
  document.querySelector("#Card2 .WindDirection").innerHTML = `?!`;
}
function FillTheDayAfterTommorrowData(ReponseData) {
  const Forecast = ReponseData.forecast.forecastday[2].day;
  const ForecastDate = ReponseData.forecast.forecastday[2].date;
  const TheDayAfterTommorrow = new Date(ForecastDate);
  document.querySelector("#Card3 .card-header .Day").innerHTML =
    TheDayAfterTommorrow.toLocaleDateString("en-US", { weekday: "long" });
  document.querySelector("#Card3 .card-header .DayNum").innerHTML =
    TheDayAfterTommorrow.getDate();
  document.querySelector("#Card3 .card-header .Month").innerHTML =
    TheDayAfterTommorrow.toLocaleDateString("en-US", { month: "long" });
  document.querySelector(
    "#Card3 #MaxTemp"
  ).innerHTML = `Max Temp. ${Forecast.maxtemp_c} &deg;C`;
  document.querySelector(
    "#Card3 #MinTemp"
  ).innerHTML = `Min Temp. ${Forecast.mintemp_c} &deg;C`;
  document.querySelector("#Card3 .WeatherDesc").innerHTML =
    Forecast.condition.text;
  document
    .querySelector("#Card3 .card-body img")
    .setAttribute("src", Forecast.condition.icon);
  document.querySelector(
    "#Card3 .Humidity"
  ).innerHTML = `${Forecast.avghumidity}%`;
  document.querySelector(
    "#Card3 .WindSpeed"
  ).innerHTML = `${Forecast.maxwind_kph} Kph`;
  document.querySelector("#Card3 .WindDirection").innerHTML = `?!`;
}
async function SearchProccess(X = "Tokyo") {
  const MainData = await GetData(X);
  console.log(MainData);
  FillTodayData(MainData);
  FillNextDayData(MainData);
  FillTheDayAfterTommorrowData(MainData);
}
SearchProccess();
Input.addEventListener("input", function () {
  SearchProccess(Input.value);
});
