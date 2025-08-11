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
        e.preventDefault()
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
        } catch (err) {
            console.error("Error fetching city suggestions:", err);
            setSuggestions([]);
        }
    }

    return (
        <div style={{
            position: "fixed",
            top: "80px", // right below title
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            padding: "10px",
            borderRadius: "8px",
        }}>
            <form onSubmit={handleSearchChange} style={{ display: "flex", gap: "5px" }}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{
                        padding: "0.5rem",
                        flex: 1,
                        boxSizing: "border-box"
                    }}
                />
                <button type="submit" style={{ padding: "0.5rem 1rem" }}>
                    Search
                </button>
            </form>

            {suggestions.length > 0 && (
                <div
                    style={{
                        maxHeight: "220px",
                        overflowY: "auto",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "8px",
                        backgroundColor: "#f9f9f9",
                        width: "270px",
                    }}
                >
                    {suggestions.map((city, index) => (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                padding: "10px",
                                marginBottom: "8px",
                                backgroundColor: "#fff",
                                cursor: "pointer",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            }}
                            onClick={() => handleSelectCity(city)}
                        >
                            <strong>{city.name}, {city.adm}</strong>
                            <br />
                            <span style={{ color: "#555" }}>{city.country}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default SearchBar