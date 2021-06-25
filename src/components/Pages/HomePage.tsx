/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import "./HomePage.scss"

import HomePageMenu from "./../Menu/HomePageMenu"

const HomePage: React.FC = () => {
  return (
    <div className="HomePage">
      <h1 className={"welcomeMessage"}>Welcome To OpenBills</h1>
      <HomePageMenu />
    </div>
  );
}

export default HomePage;
