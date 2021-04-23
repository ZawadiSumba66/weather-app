import weather from './assets/bg-weather.png';
const content = document.querySelector('#content')
const button = document.createElement('button')
const locationDegree = document.createElement('div')
const date = document.createElement('div')
const humid = document.createElement('div')
const pressure = document.createElement('div')
const description = document.createElement('div')
const cityName = document.createElement('h3')
const wind = document.createElement('div')
// const showcase = () =>{
//     const main = document.createElement('div');
//     main.classList.add('showcase')
//     main.innerHTML = 'i love you'
//     main.style.background = `url(${weather})`;
//     main.style.backgroundRepeat = 'no-repeat';
//     main.style.backgroundSize = 'cover';
//     const weatherCard = document.createElement('div')
//     content.appendChild(main);
// }

const weatherOrigin = async (city)=>{
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units='metric'&APPID=71fbfe5f66beeee255c8447a6ae9b37b`);
    const data = await response.json();
    if (data.cod === 200) {
        return data;
      }
}

const weatherParameters= async(data,units)=>{
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    li.innerHTML=''
    const temperature = data.main.temp
    // document.createElement('div')
    // temperature.textContent = data.main.temp
    date.innerHTML = new Date()
    locationDegree.innerHTML = `${temperature}&degC`
     humid.textContent = data.main.humidity
     pressure.textContent = data.main.pressure
    description.textContent = data.weather[0].description
     const icon = document.createElement('div')
     icon.textContent = data.weather.icon
    cityName.textContent = data.name
     wind.innerHTML = data.wind.speed
     button.innerHTML= 'Farenheit'
     const tempF = (temperature * 1.8 + 32).toFixed(2);;
     const tempC = temperature;
     button.addEventListener('click',changeTemperature(temperature,tempF,tempC,units))
     li.appendChild(button)
     li.appendChild(cityName)
     li.appendChild(date)
     li.appendChild(locationDegree)
     li.appendChild(humid)
     li.appendChild(pressure)
     li.appendChild(description)
     li.appendChild(icon)
     li.appendChild(wind)
     ul.appendChild(li)
     content.appendChild(ul)
}
const changeTemperature =(temperature,tempF,tempC,units) =>{
    button.addEventListener('click',(e)=>{
        e.preventDefault();
        const elm = e.target;
        if (units === 'imperial') {
          temperature = tempC;
          locationDegree.innerHTML = `${temperature}&degC`;
          units = 'metric';
          elm.innerHTML = 'Fahrenheit';
        } else {
          temperature = tempF;
          locationDegree.innerHTML = `${temperature}&degF`;
          units = 'imperial';
           elm.innerHTML = 'Celcius';
        }
    })
    
}
const showWeather= ()=>{
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
}



// const createWeather = ()=>{
//     const searchBox = document.createElement('input')
//     searchBox.setAttribute('id', `search`);
//     searchBox.type = 'search';
//     searchBox.placeholder = 'Enter location'
//     content.appendChild(searchBox);
// }



export {weatherOrigin,showWeather,weatherParameters,changeTemperature}