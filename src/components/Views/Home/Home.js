import React from "react";
// import React, { useState } from "react";
import "./Home.css";

const HomeView = (procs) => {
	const tileHeight = procs.height;
	const tileWidth = procs.width;
	// const [activeLink, updateActiveLink] = useState("home")
	return (
		<div className={"view"}>
			<div className={"tile"}></div>
		</div>
	)
}

export default HomeView
