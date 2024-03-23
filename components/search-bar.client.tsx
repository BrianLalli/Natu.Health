import React, { useState } from "react";
import { useRouter } from 'next/router'; // Import useRouter from next/router for navigation
import { FaSearch } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import "../app/css/additional-styles/searchbar.css";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter(); // Use useRouter for programmatic navigation

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search Term Changed:", event.target.value); // Log search term changes
    setSearchTerm(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Location Changed:", event.target.value); // Log location changes
    setLocation(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting Search:", { searchTerm, location }); // Log values being submitted
    // Directly redirect to the practitioners page with query parameters
    router.push(`/practitioners?searchTerm=${encodeURIComponent(searchTerm)}&zipCode=${encodeURIComponent(location)}`);
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
