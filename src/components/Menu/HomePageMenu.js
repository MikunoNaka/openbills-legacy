/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import "./HomePageMenu.scss";

const HomePageMenu = () => {
	return (
    <div className="HomePageMenu">
      <span className="menuItem">
        Create Invoice
      </span>
      <span className="menuItem">
        Don't Create Invoice
      </span>
    </div>
	)
}

export default HomePageMenu
