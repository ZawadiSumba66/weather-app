import {weatherOrigin, weatherParameters} from './weather.js'
import './style.css';
const content = document.querySelector('#content')
const form = document.createElement('form')
const searchBox = document.createElement('input')
searchBox.setAttribute('id', `search`);
searchBox.type = 'search';
searchBox.placeholder = 'Enter city location'
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const weatherData = searchBox.value
    form.reset();
    weatherOrigin(weatherData)
    .then((data)=>{weatherParameters(data)
    })
})
searchBox.value = ""
form.appendChild(searchBox)
content.appendChild(form);
weatherParameters()