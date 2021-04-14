import React from "react";
import Header from "./Header/Header";
import BillingForm from "./Form/Form.js";

const App = () => {
	return (
		<>
			<Header/>
			<div className={"root-content"}>
				<BillingForm/>
			</div>
		</>
	)
}

export default App;
