import React from "react";
import Header from "./Header/Header";
import BillingForm from "./Form/Form.js";

const sampleData = [
  {
    "Model": "Kisan Chair",
    "Description": "Very good chair",
    "Price": "10000",
    "Discount": ""}
  , {
    "Model": "Supreme Chair",
    "Description": "Even better chair",
    "Price": "2134983",
    "Discount": ""
  }
]

const App = () => {
	return (
		<>
			<Header/>
			<div className={"root-content"}>
				<BillingForm savedItems={sampleData} />
			</div>
		</>
	);
}

export default App;
