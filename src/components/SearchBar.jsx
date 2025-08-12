import React, { useState } from "react";
import search_icon from '../assets/search.png'
import './SearchBar.css'

const API_KEY = import.meta.env.VITE_API_KEY

function SearchBar({ onCitySelect }) {
    const [searchInput, setSearchInput] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [dropVisible, setDropVisible] = useState(false)

    const handleSelectCity = (city) => {
        setSearchInput(city.name)
        setSuggestions([])
        setDropVisible(false)
        onCitySelect(city.key, city.name, city.adm, city.country)
    }

    const handleSearchChange = async (e) => {
        if (searchInput.trim() === "") return
        try {
            const data = await fetch(
                `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${searchInput}`
            )
            const locations = await data.json()
            const formatted = locations.map(city => ({
                name: city.LocalizedName,
                country: city.Country.LocalizedName,
                adm: city.AdministrativeArea.LocalizedName,
                key: city.Key
            }))
            setSuggestions(formatted)
            setDropVisible(true)
        } catch (err) {
            alert(searchInput)
            alert("Error fetching city suggestions:", err);
            setSuggestions([]);
        }
    }

    return (
        <div className='search-bar-container'>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <img
                    src={search_icon}
                    alt=""
                    onClick={handleSearchChange}
                />
            </div>

            {dropVisible && suggestions.length > 0 && (
                <div className="dropdown">
                    {suggestions.map((city) => (
                        <div
                            key={city.key}
                            className="dropdown-item"
                            onClick={() => handleSelectCity(city)}
                        >
                            {city.name}, {city.adm}, {city.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}
export default SearchBar