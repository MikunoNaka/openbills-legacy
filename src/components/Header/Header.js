import React from "react";
import "./Header.css";
// import React, { useState } from "react";

const Header = () => {
	// const [activeLink, updateActiveLink] = useState("home")
	return (
		<div className={"header"}>
			<div class="placeholder">
				<p class="inlineBlock">OpenBills</p>

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
