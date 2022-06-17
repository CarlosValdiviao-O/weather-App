import { displayWait, populateDOM, cleanDOM } from './domStuff';
import Water from './water.svg';
import Wind from './wind.svg';
import "./style.css";


let city = 'la paz';
let error = document.querySelector('#error');
let input = document.querySelector('#search');
let button = document.querySelector('#update');
button.addEventListener('click', changeCity);
let data = {};
document.getElementById('humidity').src = Water;
document.getElementById('wind').src = Wind;

async function fetchCity() {
    try {
        displayWait('yes');
        let link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=1e97386003b7832f400660b552acb9f2&units=metric`;
        let response = await fetch(link, {mode: 'cors'});
        let obj = await response.json();
        if (!obj.coord) {
            displayWait('no');
            throw new Error(`Could'nt find the city`);
        }
        error.textContent = '';
        filterData(obj);
        fetchDays();
    } 
  
    catch (err) {
        error.textContent = err.message;
    }
}

async function fetchDays() {
    try {
        let link2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,hourly,alert&APPID=1e97386003b7832f400660b552acb9f2&units=metric`;
        let response = await fetch(link2, {mode: 'cors'});
        let obj = await response.json();
        displayWait('no');
        filterDays(obj);
    } 
    
    catch (err) {
      //
    }
  }

function filterData(obj) {
    data.coord = obj.coord;
    data.temp = obj.main.temp;
    data.humidity = obj.main.humidity;
    data.name = obj.name;
    data.country = obj.sys.country;
    data.timezone = obj.timezone;
    data.weather = obj.weather[0].main;
    data.description = obj.weather[0].description;
    data.wind = obj.wind.speed;
    data.icon = obj.weather[0].icon;
}

function filterDays (obj) {
    data.days=[];
    for (let i=0; i<5; i++) {
        data.days[i] = {};
        data.days[i].max = obj.daily[i].temp.max;
        data.days[i].min = obj.daily[i].temp.min;
        data.days[i].weather = obj.daily[i].weather[0].main;
        data.days[i].icon = obj.daily[i].weather[0].icon;
        data.days[i].description = obj.daily[i].weather[0].description;
    }
    populateDOM();
}

function changeCity () {
    city = input.value;
    input.value = '';
    cleanDOM();
    fetchCity();
}

function getData () {
    return data;
}

fetchCity();

export { getData }