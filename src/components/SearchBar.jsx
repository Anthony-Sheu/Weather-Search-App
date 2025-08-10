import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY

function SearchBar({ onCitySelect }) {
    const [searchInput, setSearchInput] = useState('')
    const [suggestions, setSuggestions] = useState([])

    const handleSelectCity = (city) => {
        setSearchInput(city.name)
        setSuggestions([])
        onCitySelect(city.key, city.name, city.adm, city.country)
    }

    const handleSearchChange = async (e) => {
        const city = e.target.value
        setSearchInput(city)
        const data = await fetch(
            `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`
        )
        const locations = await data.json()
        const formatted = locations.map(city => ({
            name: city.LocalizedName,
            country: city.Country.LocalizedName,
            adm: city.AdministrativeArea.LocalizedName,
            key: city.Key
        }))
        setSuggestions(formatted)
    }

    return (
        <div>
            <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Enter city name"
            />
            <ul>
                {suggestions.map((city, index) => (
                    <li
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSelectCity(city)}
                    >
                        {city.name}, {city.adm}, {city.country}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default SearchBar