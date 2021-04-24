import weather from './assets/bg-weather.jpg';

const content = document.querySelector('#content');
const button = document.createElement('button');
const locationDegree = document.createElement('div');
const date = document.createElement('div');
const description = document.createElement('div');
const cityName = document.createElement('h3');
const humidityH = document.createElement('div');
const humid = document.createElement('div');
const humidP = document.createElement('div');
const windH = document.createElement('div');
const wind = document.createElement('div');
const windP = document.createElement('div');
const pressureH = document.createElement('div');
const pressure = document.createElement('div');
const pressureP = document.createElement('div');
const icon = new Image();
const allHumid = document.createElement('div');
const allPressure = document.createElement('div');
const allWind = document.createElement('div');
const main = document.createElement('div');
main.classList.add('showcase', 'text-center');
main.style.background = `url(${weather})`;
main.style.backgroundRepeat = 'no-repeat';
main.style.backgroundSize = 'cover';


const weatherOrigin = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=71fbfe5f66beeee255c8447a6ae9b37b`);
  const data = await response.json();
  if (data.cod === 200) {
    return data;
  }
  throw new Error('City not found. Please try again.');
};
const changeTemperature = (temperature, tempF, tempC, units) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const element = e.target;
    if (units === 'imperial') {
      temperature = tempC;
      locationDegree.innerHTML = `${temperature}&degC`;
      units = 'metric';
      element.innerHTML = 'Fahrenheit';
    } else {
      temperature = tempF;
      locationDegree.innerHTML = `${temperature}&degF`;
      units = 'imperial';
      element.innerHTML = 'Celcius';
    }
  });
};
const weatherParameters = async (data, units) => {
  const all = document.createElement('div');

  const component = document.createElement('div');
  component.innerHTML = '';
  const temperature = data.main.temp;
  date.innerHTML = new Date();
  locationDegree.innerHTML = `${temperature}&degC`;
  locationDegree.classList.add('temperature');
  const header = document.createElement('div');
  header.classList.add('d-flex', 'justify-content-between');
  description.textContent = data.weather[0].description;
  description.classList.add('text-center', 'description');
  const climate = data.weather[0].icon;
  icon.src = `https://openweathermap.org/img/wn/${climate}.png`;

  //  icon.innerHTML =  `<img src="https://openweathermap.org/img/wn/${climate}.png`
  cityName.textContent = data.name;
  cityName.classList.add('text-center');
  const div = document.createElement('div');
  div.classList.add('justify-content-between', 'd-flex', 'measures');

  humidityH.textContent = 'Humidity';
  humid.textContent = data.main.humidity;
  humidP.innerHTML = '%';

  pressureH.textContent = 'Pressure';
  pressure.textContent = data.main.pressure;
  pressureP.innerHTML = 'hPa';

  windH.innerHTML = 'Wind';
  wind.innerHTML = data.wind.speed;
  windP.innerHTML = 'm/s';
  allHumid.appendChild(humidityH);
  allHumid.appendChild(humid);
  allHumid.appendChild(humidP);
  allPressure.appendChild(pressureH);
  allPressure.appendChild(pressure);
  allPressure.appendChild(pressureP);
  allWind.appendChild(windH);
  allWind.appendChild(wind);
  allWind.appendChild(windP);
  div.appendChild(allHumid);
  div.appendChild(allPressure);
  div.appendChild(allWind);
  button.innerHTML = 'Farenheit';
  button.classList.add('d-flex', 'justify-content-end', 'btn', 'text-dark', 'bg-light', 'font-weight-bold');
  const tempF = (temperature * 1.8 + 32).toFixed(2);
  const tempC = temperature;
  button.addEventListener('click', changeTemperature(temperature, tempF, tempC, units));
  header.appendChild(cityName);
  header.appendChild(icon);
  component.appendChild(header);
  component.appendChild(date);
  component.appendChild(description);
  component.appendChild(locationDegree);
  component.appendChild(div);
  component.appendChild(button);
  component.classList.add('parameters', 'px-5');
  all.appendChild(component);
  main.appendChild(all);
  content.appendChild(main);
};

const showWeather = () => {
  const form = document.createElement('form');
  const searchBox = document.createElement('input');
  searchBox.setAttribute('id', 'search');
  searchBox.type = 'search';
  searchBox.placeholder = 'Enter city ';
  searchBox.classList.add('form-control', 'w-50');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const weatherData = searchBox.value;
    form.reset();
    weatherOrigin(weatherData)
      .then((data) => {
        weatherParameters(data);
      }).catch((err) => (err.message));
  });
  searchBox.value = '';
  form.appendChild(searchBox);
  main.appendChild(form);
  content.appendChild(main);
};

export {
  weatherOrigin, showWeather, weatherParameters, changeTemperature,
};