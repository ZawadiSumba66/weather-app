import {weatherOrigin, weatherParameters} from './weather.js'
import './style.css';
const content = document.querySelector('#content')
const form = document.createElement('form')
const searchBox = document.createElement('input')
searchBox.setAttribute('id', `search`);
searchBox.type = 'search';
searchBox.placeholder = 'Enter city location'
const units = 'metric';
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const weatherData = searchBox.value
    form.reset();
    weatherOrigin(weatherData)
    .then((data)=>{weatherParameters(data,units)
    })
})

window.onload = async()=>{
    weatherOrigin('london').then((data)=>{
        weatherParameters(data,units) 
    })
}
searchBox.value = ""
form.appendChild(searchBox)
content.appendChild(form);
weatherParameters()