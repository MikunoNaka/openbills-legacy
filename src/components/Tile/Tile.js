import React from "react";
// import React, { useState } from "react";
// import "./Tile.css";

const Tile = (props) => {
	// const [activeLink, updateActiveLink] = useState("home")
	return (
		<div className={"tile"} style={{
			"height": props.height,
			"width": props.width
		}}></div>
	)
}

export default Tile;
