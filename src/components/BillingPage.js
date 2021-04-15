import React from "react";
import BillingForm from "./Form/Form.js";


const sampleData = [
  {
    "Model": "Kisan Chair",
    "Description": "Very good chair",
    "Price": "10000",
    "Discount": ""
  }, {
    "Model": "Supreme Chair",
    "Description": "Even better chair",
    "Price": "2134983",
    "Discount": ""
  }
];

const BillingPage = () => {
  return (
    <>
      <BillingForm savedItems={sampleData} />
    </>
  );
}

export default BillingPage;
