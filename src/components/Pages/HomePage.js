/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React/*, { useState, useEffect } */from "react";
import "./HomePage.scss"
//import axios from "axios";

//import BillingPage from "./BillingPage"
import HomePageMenu from "./../Menu/HomePageMenu"

const HomePage = () => {
  return (
    <div className="HomePage">
      <h1 className={"welcomeMessage"}>Welcome To OpenBills</h1>
      <HomePageMenu />
    </div>
  );
}

export default HomePage;
