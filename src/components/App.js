import React from "react";
import Header from "./Header/Header";
import HomeView from "./Views/Home/Home";

const App = () => {
	const currentview = "home";
	return (
		<>
			<Header/>
			{currentview === "home" && <HomeView/>}
		</>
	)
}

export default App;
