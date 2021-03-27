import React from "react";
// import React, { useState } from "react";
import "./Tile.css";

const Tile = (props) => {
	// const [,] = useState()
	
	const style = {
		height: props.height;
		width: props.width;
		backgroundColor: props.colorBG
		// textColor: props.colorFG
	}

	return (
		<div className={"tile"} style={style}></div>
	)
}

export default Tile
