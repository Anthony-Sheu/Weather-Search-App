import React, { useState } from "react";
import './WeatherDisplay.css'
import SearchBar from './SearchBar.jsx'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'

const API_KEY = import.meta.env.VITE_API_KEY

// function WeatherDisplay({ weather }) {
//     if (!weather) return null

//     return (
//         <div>
//             <h3>Current Weather for {weather.name}, {weather.adm}, {weather.country}</h3>
//             <p>{weather.text}</p>
//             <p>Temperature: {weather.temp}°{weather.unit}</p>
//         </div>
//     )
// }

const WeatherDisplay = () => {
    const [weather, setWeather] = useState(null)

    const fetchWeather = async (locKey, city, adm, country) => {
        try {

            const res = await fetch(
                `http://dataservice.accuweather.com/currentconditions/v1/${locKey}?apikey=${API_KEY}`
            );
            const data = await res.json();
            setWeather({
                text: data[0].WeatherText,
                temp: data[0].Temperature.Metric.Value,
                unit: data[0].Temperature.Metric.Unit,
                name: city,
                adm: adm,
                country: country
            })
        } catch (err) {
            console.error('Fetch error:', err)
            alert('Error fetching weather')
        }
    }

    return (
        <div className='weather'>
            {/* <div className="search-bar">
                <input type="text" placeholder='Search' />
                <img src={search_icon} alt="" />
            </div> */}
            <SearchBar onCitySelect={fetchWeather} />
            <img src={clearIcon} alt="" className='weather-icon' />
            <p className='temperature'>16°C</p>
            <p className='location'>Richmond</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidityIcon} alt="" />
                    <div>
                        <p>91 %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windIcon} alt="" />
                    <div>
                        <p>1 km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherDisplay