// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "18b0fd91e5683f8bd7ab5a29f8386957";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// GET WEATHER FROM API PROVIDER (2)
let latitude2 = 39.760;
let longitude2 = -98.500;

let latitude3 = 35.690;
let longitude3 = 139.692;

function getWeatherTwo(latitudenum, longitudenum, weatherDivId){
    $.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitudenum}&lon=${longitudenum}&appid=${key}`
        )
        .done(function(data){
            console.log(data);
            $(`${weatherDivId} div:first`)
              .empty()
              .append(
                `<img src="icons/${data.weather[0].icon}.png"/>`
              )

            $(`${weatherDivId} .temperature-value`)
            .empty()
            .append(
              ` <p>${Math.floor(data.main.temp - KELVIN)}°<span>C</span></p>
              `
            )
        
            $(`${weatherDivId} .temperature-description`)
            .empty()
            .append(
              ` <p> ${data.weather[0].description} </p>
              `
            )

            $(`${weatherDivId} .location`)
            .empty()
            .append(
              ` <p> ${data.sys.country} </p>
              `
            )


           
          })
          .fail(function (data) {
            // CODE HERE
            console.log("The function will be run if the ajax is failed")
          })
          .always(function (data) {
            // CODE HERE
            console.log("The function runs no matter success of fail")
          })   
    }
    getWeatherTwo(latitude2, longitude2, "#weather2")
    getWeatherTwo(latitude3, longitude3, "#weather3")

// GET WEATHER FROM API PROVIDER (3)
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}


// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
   /*  locationElement.innerHTML = `${weather.city}, ${weather.country}`; */
   locationElement.innerHTML = `${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});



