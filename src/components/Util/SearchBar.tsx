/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import "./SearchBar.scss";

const SearchBar: React.FC = () => {
  const sampledata: string[] = ["one", "two", "three", "four", "five", "six"]

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchSelection, setSearchSelection] = useState<string>("");

  const setSelectionValue = (value: string) => {
    setSearchValue("");
    setSearchSelection(value);
    console.log(searchSelection);
  }

  return (
    <div className="searchBar">
      <div className="searchBarInput">
        <input 
          type="text" 
          value={searchValue}
          onChange={
            (event) => {
              setSearchValue(event.target.value);
              console.log(searchSelection);
            }
          }
        />
      </div>

      <div className="searchResults">
        {
          searchValue === "" 
            || sampledata.map((i) => i.toLowerCase().includes(searchValue.toLowerCase()) 
              && (<p key={i} className={"searchResult"} onClick={() => setSelectionValue(i)}>{i}</p>))
        }
      </div>
    </div>
  );
}

export default SearchBar;
