/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";

const HomePageMenu: React.FC = () => {
	return (
    <div className="HomePageMenu">
      <Link className="menuItem" to="BillingPage">
        Create Invoice
      </Link>
      <Link className="menuItem" to="pepe">
        Don't Create Invoice
      </Link>
    </div>
	)
}

export default HomePageMenu
