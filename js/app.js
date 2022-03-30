window.addEventListener("load", ()=>{
    const splash = document.querySelector('.splash');

    setTimeout(()=>{
        splash.classList.add('display-none');
    }, 3000);

    IniciarPage('Lima');
})

function Buscar(){
    let ciudad = document.getElementById("input_buscarCiudad").value
    document.getElementById("input_buscarCiudad").value = ''
    IniciarPage(ciudad);
}

function IniciarPage(Ciudad){
    let lon
    let lat

    let temperaturaValor = document.getElementById("temperatura-valor")
    let temperaturaDescripcion = document.getElementById("temperatura-descripcion")

    let ubicacion = document.getElementById("ubicacion")
    let iconoAnimado = document.getElementById("iconoAnimado")

    let vientoVelocidad = document.getElementById("viento-velocidad")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            key = `2f552e8007f133e8df0acdae638ae6c6`

            //url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

            url = `https://api.openweathermap.org/data/2.5/weather?q=${Ciudad}&lang=es&unit=metric&appid=${key}&units=metric`

            fetch(url)
                .then( response => {return response.json() })
                .then( data => {
                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp} °C`

                    let desc = data.weather[0].description
                    temperaturaDescripcion.textContent = desc.toUpperCase()

                    ubicacion.textContent = data.name

                    vientoVelocidad.textContent = `${data.wind.speed} m/s`
                    
                    //iconos estaticos
                    /*let icon = data.weather[0].icon
                    const urlIcon = `http://openweathermap.org/img/wn/${icon}.png`
                    iconoAnimado*/

                    //iconos Animados
                    switch(data.weather[0].main){
                        case 'Thunderstorm':
                            iconoAnimado.src='animated/thunder.svg'
                            console.log('TORMENTA');
                            break;
                        case 'Drizzle':
                            iconoAnimado.src='animated/rainy-2.svg'
                            console.log('LLOVIZNA');
                        break;
                        case 'Rain':
                            iconoAnimado.src='animated/rainy-7.svg'
                            console.log('LLUVIA');
                        break;
                        case 'Snow':
                            iconoAnimado.src='animated/snowy-6.svg'
                            console.log('NIEVE');
                        break;                        
                        case 'Clear':
                            iconoAnimado.src='animated/day.svg'
                            console.log('LIMPIO');
                        break;
                        case 'Atmosphere':
                            iconoAnimado.src='animated/weather.svg'
                            console.log('ATMOSFERA');
                        break;  
                        case 'Clouds':
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                            console.log('NUBES');
                        break;  
                        default:
                            iconoAnimado.src='animated/cloudy-day-1.svg'
                            console.log('por defecto');
                    }
                })
                .catch( error => {
                    console.log(error)
                })

        } );
    }
}
