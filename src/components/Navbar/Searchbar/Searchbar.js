import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import "./Searchbar.css";

const Searchbar = (props) => {
  const [inputVal, setInputVal] = useState("");

  const handleChange = (e) => {
    setInputVal(e.currentTarget.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    props.setSearchKeyword(inputVal);
    props.setTabVal(3);
    setInputVal("");
  };
  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={handleSearch}>
        <input
          id="field1"
          autocomplete="do-not-autofill"
          type="text"
          placeholder="What do you want to watch?"
          name="search"
          className="search-bar-input"
          value={inputVal}
          onChange={handleChange}
        />
        <button type="submit" className="search-bar-button">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
