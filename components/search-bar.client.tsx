// SearchBar.tsx

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import "../app/css/additional-styles/searchbar.css"; // Importing styles.css from the app folder

interface SearchBarProps {
  // Updated to accept two parameters: focusArea and location
  onSearch: (focusArea: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  // State for the search term (focus area) and location (zip code)
  const [focusArea, setFocusArea] = useState("");
  const [location, setLocation] = useState("");

  const handleFocusAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFocusArea(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Passes the focus area and location (zip code) to the parent component's search handler
    onSearch(focusArea, location);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Focus Area (e.g., Pregnancy, Digestive, Pain)"
            value={focusArea}
            onChange={handleFocusAreaChange}
          />
        </div>
        <div className="search-input-wrapper">
          <MdLocationOn className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="ZIP code"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
export const config = { runtime: "client" };
