import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY

// function App() {

//   const [weather, setWeather] = useState(null)

//   const fetchWeather = async (locKey, city, adm, country) => {
//     try {

//       const res = await fetch(
//         `http://dataservice.accuweather.com/currentconditions/v1/${locKey}?apikey=${API_KEY}`
//       );
//       const data = await res.json();
//       setWeather({
//         text: data[0].WeatherText,
//         temp: data[0].Temperature.Metric.Value,
//         unit: data[0].Temperature.Metric.Unit,
//         name: city,
//         adm: adm,
//         country: country
//       })
//     } catch (err) {
//       console.error('Fetch error:', err)
//       alert('Error fetching weather')
//     }
//   }

//   return (
//     <div className="app-container">
//       <h1
//         style={{
//           position: "fixed",
//           top: "30px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           padding: "10px 20px",
//           margin: 0,
//           zIndex: 1000,
//         }}
//       >
//         Weather Search App
//       </h1>
//       <SearchBar onCitySelect={fetchWeather} />
//       <WeatherDisplay weather={weather} />
//     </div>
//   )
// }

const App = () => {
  return (
    <div className='app'>
      <WeatherDisplay />
    </div>
  )
}

export default App
