import weather from './assets/bg-weather.png';
const content = document.querySelector('#content')

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
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=71fbfe5f66beeee255c8447a6ae9b37b`);
    const data = await response.json();
    if (data.cod === 200) {
        return data;
      }
}

const weatherParameters= async(data)=>{
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    li.innerHTML=''
    const temperature = document.createElement('div')
    temperature.textContent = data.main.temp
    const date = document.createElement('div')
    date.innerHTML = new Date()
    const humid = document.createElement('div')
     humid.textContent = data.main.humidity
     const pressure = document.createElement('div')
     pressure.textContent = data.main.pressure
    const description = document.createElement('div')
    description.textContent = data.weather[0].description
     const icon = document.createElement('div')
     icon.textContent = data.weather.icon
    const cityName = document.createElement('h3')
    cityName.textContent = data.name
     const wind = document.createElement('div')
     wind.innerHTML = data.wind.speed
     li.appendChild(cityName)
     li.appendChild(date)
     li.appendChild(temperature)
     li.appendChild(humid)
     li.appendChild(pressure)
     li.appendChild(description)
     li.appendChild(icon)
     li.appendChild(wind)
     ul.appendChild(li)
     content.appendChild(ul)
}

const showWeather= ()=>{
    const form = document.createElement('form')
    const searchBox = document.createElement('input')
    searchBox.classList.add('form-control')
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



export {weatherOrigin,showWeather,weatherParameters}