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
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  // const Warnings = {
  //   raining: "It looks like it's raining, better go out with an umbrella",
  //   sunny: "The sun looks very strong, better use a sunscreen",
  //   clouds: "",
  //   clear: ""
  // }

  return (

    <div className="app">
      
      <main>

       <a href="//#region "><Logo /></a>
        
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

        <div className="scale">
        </div>
        
        {(typeof weather.main != "undefined") ? (
        <div>

          <div className="location-box">
            <p className="location">{weather.name}, {weather.sys.country}</p>  {/*CITY, COUNTRY */}
            <p className="date">{dateBuilder(new Date())}</p>
          </div>

          <div className="weather-box">
            <div className="temp">
              <div className="temp-box">
                <p className="temp">{Math.round(weather.main.temp)}</p><span>C°</span>
              </div>
            </div>

            <span className="bar"></span>

            <div className="min-max">
              <p className="max">{Math.round(weather.main.temp_max)}<sup>°C</sup></p>
              <p className="min">{Math.round(weather.main.temp_min)}<sup>°C</sup></p>
            </div>
            {/* <div className="info">{weather.weather[0].main === "Rain" ? Warnings.raining : "The weather looks peaceful"}</div> */}
          </div>

          <div className="weather">{weather.weather[0].main}</div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
