// SearchBar.tsx

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import "../app/css/additional-styles/searchbar.css"; // Importing styles.css from the app folder

interface SearchBarProps {
  onSearch: (searchTerm: string, location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchTerm, location);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Condition, procedure, doctor..."
            value={searchTerm}
            onChange={handleSearchChange}
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
