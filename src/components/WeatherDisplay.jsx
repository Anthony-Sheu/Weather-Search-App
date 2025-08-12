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

function getWeatherIcon(weatherText) {
    if (!weatherText) return clearIcon
    const text = weatherText.toLowerCase()
    if (text === "sunny") return clearIcon
    if (text.includes("shower") || text.includes("flurries")) return drizzleIcon
    if (text.includes("rain") || text.includes("t-storms")) return rainIcon
    if (text.includes("snow") || text.includes("ice") || text.includes("sleet")) return snowIcon
    return cloudIcon
}

function getLocal(iso) {
    const match = iso.match(/([+-]\d{2}):(\d{2})$/);
    const date = new Date(iso);
    if (match) {
        const offsetHours = parseInt(match[1], 10);
        const utcHour = date.getUTCHours();
        return (utcHour + offsetHours + 24) % 24;
    }
    return date.getUTCHours();
}

function getTime(weatherTime) {
    if (!weatherTime) return ""
    const hour = getLocal(weatherTime)
    if (hour >= 18 || hour < 6) return "night"
    if (hour >= 6 && hour < 12) return "morning"
    return "afternoon"
}

const WeatherDisplay = () => {
    const [weather, setWeather] = useState(null)

    const fetchWeather = async (locKey, city, adm, country) => {
        try {
            const res = await fetch(
                `http://dataservice.accuweather.com/currentconditions/v1/${locKey}?apikey=${API_KEY}&details=true`
            )
            const data = await res.json();
            setWeather({
                text: data[0].WeatherText,
                temp: data[0].Temperature.Metric.Value,
                wind: data[0].Wind.Speed.Metric.Value,
                humidity: data[0].RelativeHumidity,
                time: data[0].LocalObservationDateTime,
                name: city,
                adm: adm,
                country: country
                // text: "Sunny",
                // temp: 16,
                // wind: 19,
                // humidity: 91,
                // time: "2025-08-11T20:15:00Z",
                // name: "Richmond",
                // adm: "British Columbia",
                // country: "Canada"
            })
        } catch (err) {
            console.error('Fetch error:', err)
            alert('Error fetching weather')
        }
    }

    return (
        <div className={`weather ${getTime(weather?.time)}`}>
            <SearchBar onCitySelect={fetchWeather} />
            <img src={getWeatherIcon(weather?.text)} alt="" className='weather-icon' />
            <p className='temperature'>{weather?.temp}°C, {weather?.text}</p>
            <p className='location'>{weather?.name}, {weather?.adm}, {weather?.country}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidityIcon} alt="" />
                    <div>
                        <p>{weather?.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windIcon} alt="" />
                    <div>
                        <p>{weather?.wind} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherDisplay