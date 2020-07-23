import React from "react";

function Search(props) {
  return (
    <div className="search-container row mx-auto">
      <input
        onChange={props.handleInputChange}
        value={props.value}
        name="search"
        type="text"
        placeholder="Enter a search term"
        id="search"
        className="mx-auto"
      />
      <button onClick={props.handleFormSubmit} className="button mx-auto">Search</button>
      <button onClick={props.handleReset} className="button mx-auto">Reset</button>
    </div>
  );
}

export default Search;