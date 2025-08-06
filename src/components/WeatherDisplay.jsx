import Reach from 'react'

function WeatherDisplay({ weather }) {
    if (!weather) return null

    return (
        <div>
            <h3>Current Weather</h3>
            <p>{weather.text}</p>
            <p>Temperature: {weather.temp}°{weather.unit}</p>
        </div>
    )
}

export default WeatherDisplay