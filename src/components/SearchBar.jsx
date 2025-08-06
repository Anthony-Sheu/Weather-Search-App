import React, { useState } from "react";

function SearchBar({ onSearch }) {
    const [searchInput, setSearchInput] = useState('')
    const handleSearch = (event) => { setSearchInput(event.target.value) }
    const handleSubmit = (event) => {
        event.preventDefault()
        onSearch(searchInput)
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter City"
                    value={searchInput}
                    onChange={handleSearch}
                    style={{
                        padding: '0.5rem',
                        fontSize: '1rem',
                        width: '250px',
                        marginRight: '1rem'
                    }}
                />
                <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                    Search
                </button>
            </form>
        </div>
    )
}
export default SearchBar