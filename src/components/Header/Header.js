/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import "./Header.scss";

const Header = () => {
	return (
		<div className={"header"}>
			<div className="placeholder">
				<p className="inlineBlock">OpenBills</p>

			</div>
			<div className={"navBar"}>
				<nav>
					<a href="https://nhentai.net">Link1</a>
					<a href="https://youtube.com">Link2</a>
					<a href="https://google.com">Link3</a>
					<a href="https://github.com">Link4</a>
				</nav>
			</div>
		</div>
	)
}

export default Header
