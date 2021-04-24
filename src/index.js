import { weatherOrigin, weatherParameters, showWeather } from './weather';
import './style.css';

showWeather();

window.onload = async () => {
  weatherOrigin('Nairobi').then((data) => {
    weatherParameters(data);
  });
};

weatherParameters();