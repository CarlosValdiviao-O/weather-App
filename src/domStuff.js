import { getData } from '.'

let temps = Array.from(document.getElementsByClassName('temps'));
let info = Array.from(document.getElementsByClassName('info'));
let dates = Array.from(document.getElementsByClassName('date'));
let weather = Array.from(document.getElementsByClassName('weather'));
let icons = Array.from(document.querySelectorAll('img.icon'));

function populateDOM () {
    let data = getData();
    populateCurrent(data);
    populateDays(data);
}

function displayWait(signal) {
    let message;
    if (signal == 'yes') {
        message = 'Please wait..'    
    }
    else {
        message = '';
    }

    for (let i=0; i<temps.length; i++) {
        temps[i].textContent = message;
    }
} 

function populateCurrent(data) {
    info[0].textContent = data.weather;
    info[1].textContent = `${data.temp}°`;
    info[2].textContent = data.humidity + '%';
    info[3].textContent = data.wind + ' m/s';
    info[4].textContent = `${data.name}, ${data.country}`;
    info[5].textContent = `${data.coord.lon}, ${data.coord.lat}`;
    icons[0].src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    icons[0].title = data.description;
}

function populateDays(data) {
    let today = new Date();
    for (let i=0; i<weather.length; i++) {
        temps[i+1].textContent = `${data.days[i].min}° ~ ${data.days[i].max}°`;
        weather[i].textContent = data.days[i].weather;
        today.setDate(today.getDate()+1);
        dates[i].textContent = today.toDateString(); 
        icons[i+1].src = `http://openweathermap.org/img/wn/${data.days[i].icon}@2x.png`;
        icons[i+1].title = data.days[i].description;
    }
}

function cleanDOM() {
    for (let i=0; i<weather.length; i++) {
        info[i].textContent = '';
        temps[i].textContent = '';
        weather[i].textContent = '';
        dates[i].textContent = '';
    }
    info[5].textContent = '';
}

export { displayWait, populateDOM, cleanDOM }