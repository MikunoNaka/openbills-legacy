/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import Header from "./Header/Header";
import HomePage from "./Pages/HomePage";

const App = () => {
  const showHeader = false;
  return (
    <>
      {showHeader && <Header/>}
        <div className={"root-content"}>
          <HomePage />
        </div>
    </>
  );
}

export default App;
