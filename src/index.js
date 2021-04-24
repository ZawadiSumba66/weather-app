import {weatherOrigin, weatherParameters,showWeather} from './weather.js'
import './style.css';

showWeather()

window.onload = async()=>{
    weatherOrigin('Nairobi').then((data)=>{
        weatherParameters(data) 
    })
}

weatherParameters()