import React from "react";
import AddNewItemForm from "./Form/AddNewItemForm.js";


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
  }, {
    "Model": "Action Houseware",
    "Description": "Not a chair",
    "Price": "69",
    "Discount": ""
  }
];

const BillingPage = () => {
  return (
    <>
      <AddNewItemForm savedItems={sampleData} />
      <AddNewItemForm savedItems={sampleData} />
      <AddNewItemForm savedItems={sampleData} />
      <AddNewItemForm savedItems={sampleData} />
    </>
  );
}

export default BillingPage;
