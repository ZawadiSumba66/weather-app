import weather from './assets/bg-weather.png';
const content = document.querySelector('#content')

const showcase = async () =>{
    const main = document.createElement('div');
    main.classList.add('showcase')
    main.innerHTML = 'i love you'
    main.style.background = `url(${weather})`;
    main.style.backgroundRepeat = 'no-repeat';
    main.style.backgroundSize = 'cover';
    content.appendChild(main);
}

export default showcase