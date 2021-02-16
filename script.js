const api = {
    key: "f2093085627e9a9fb4b8e175de658a94",
    base: "https://api.openweathermap.org/data/2.5/"
}
const search = document.querySelector('.search')
search.addEventListener('keypress', setQuery);
function setQuery(evt){
    if (evt.keyCode ==13){
        getResults(search.value);  
    }
}
function getResults (query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => { 
        return weather.json();
    }).then(displayResults);
}
function displayResults(weather) {
    console.log(weather);

    let city = document.querySelector('.city');
    city.innerHTML =`${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = dateBuilder(now);

    let sunrise = document.querySelector('.sunrise');
    sunrise.innerHTML = `${weather.sys.sunrise}`

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.feels_like)}°C`

    let weather_el = document.querySelector('.weather')
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML =  `${Math.round(weather.main.temp_max)}°C` 
    
    let humidity = document.querySelector('.humidity')
    humidity.innerHTML = `Humidity : ${weather.main.humidity} %` 

    let pressure = document.querySelector('.pressure')
    pressure.innerHTML = `Pressure : ${weather.main.pressure} mbar`
}
function dateBuilder (d) {
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday",
    "Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}