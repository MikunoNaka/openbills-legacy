/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import {Link} from "react-router-dom";
import "./Header.scss";

const Header = () => {
	return (
		<div className={"header"}>
			<div className="placeholder">
				<p className="inlineBlock">OpenBills</p>

			</div>
			<div className={"navBar"}>
				<nav>
          <Link to="/">Home</Link>
          <Link to="/BillingPage">BillingPage</Link>
				</nav>
			</div>
		</div>
	)
}

export default Header
