import React, { useState } from 'react';
import Logo from './Logo.jsx';
import './app.styles.scss';

const api = {
  key: "e169d6c19cc0401097c392871a8df992",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          if (result.cod === "404") {
            alert(`Error ${result.cod}: ${result.message}`);
          }
        });
    }
  }

  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${day}, ${date} ${month}`
  }

  return (

    <div className="app">
      
      <main>

        <Logo />
        
          {/* =========================== SEARCH BOX ===========================*/}

        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search for a city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
        <div>


          <section>         
            {/* =========================== CURRENT W. ===========================*/}
          
            <div className="location-box">
              <p className="location">{weather.name}, {weather.sys.country}</p>
              <p className="date">{dateBuilder(new Date())}</p>
            </div>

            {/* =========================== MAIN TEMP. ===========================*/}

            <div className="weather-box">
              <div className="temp">
                <div className="temp-box">
                  <p className="temp">{Math.round(weather.main.temp)}</p><span>C°</span>
                </div>
              </div>

              <span className="bar"></span>

            {/* =========================== MIN/MAX ===========================*/}

              <div className="min-max">
                <p className="max">{Math.round(weather.main.temp_max)}<sup>°C</sup></p>
                <p className="min">{Math.round(weather.main.temp_min)}<sup>°C</sup></p>
              </div>

            </div>
          </section>


          <section id="info">

            {/* =========================== MORE INFO ===========================*/}

            <div className="ad-info">

              <div className="tab-1">

                <div className="wind">
                  <img src={require('./assets/svg/wind-solid.svg')} width="30px" alt="wind-logo" />
                  <p className="info-title">Wind</p>
                  <p className="info-text">{Math.round(weather.wind.speed * 2.237)} mph</p>
                </div>

                <div className="humidity">
                  <img src={require('./assets/svg/cloud-showers-heavy-solid.svg')} width="30px" alt="wind-logo" />
                  <p className="info-title">Humidity</p>
                  <p className="info-text">{Math.round(weather.main.humidity)}%</p>
                </div>

              </div>

              <div className="tab-2">

                <div className="cloud-cover">
                  <img src={require('./assets/svg/cloud-solid.svg')} width="30px" alt="wind-logo" />
                  <p className="info-title">Cloud Cover</p>
                  <p className="info-text">{Math.round(weather.clouds.all)}%</p>
                </div>

                <div className="real-feel">
                  <img src={require('./assets/svg/sun-regular.svg')} width="30px" alt="wind-logo" />
                  <p className="info-title">Real Feel</p>
                  <p className="info-text">{Math.round(weather.main.feels_like)}°C</p>
                </div>

              </div>

            </div>

            <div className="conditions">
              <i className={(weather.weather[0].main === "Rain") ? "fas fa-cloud-rain" : (weather.weather[0].main === "Clear") ? "fas fa-cloud-sun" : (weather.weather[0].main === "Clouds") ? "fas fa-cloud" : "far fa-snowflake"}></i>
              <p className={"conditions-name"}>Conditions</p>
              <p>{weather.weather[0].main}</p>
            </div>
          </section>



          <div className="weather">{weather.weather[0].main}</div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
