import React, { useState } from "react";
import { motion } from "framer-motion";


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="searchbar-container">
      <label>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <motion.button
        type="button"
        onClick={handleSearch}
        variants={buttonVariants}
        whileHover="hover"
      >
        Search
      </motion.button>
    </div>
  );
};

export default SearchBar;
