import React from "react";
// import React, { useState } from "react";
import "./../Tile/Tile";
import "./Home.css";

const HomeView = () => {
	// const [activeLink, updateActiveLink] = useState("home")
	return (
		<div className={"view"}>
			<Tile height="1rem" width="1rem"></Tile>
		</div>
	)
}

export default HomeView
