import React from "react";
import AddNewItemForm from "./Form/AddNewItemForm.js";


const sampleData = [
  {
    "Model": "Kisan Chair",
    "Description": "Very good chair",
    "Price": 10000,
    "Discount": 0
  }, {
    "Model": "Supreme Chair",
    "Description": "Even better chair",
    "Price": "2134983",
    "Discount": 0
  }, {
    "Model": "Action Houseware",
    "Description": "Not a chair",
    "Price": 69,
    "Discount": 0
  }
];

// called when AddNewItemForm is submitted
let addedItems = [];
const getAddedItems = (item) => {
  addedItems.push(item);
}

const defGSTValue = 18;

const BillingPage = () => {
  return (
    <>
      <AddNewItemForm savedItems={sampleData} addItem={getAddedItems} defGSTValue={defGSTValue}/>
    </>
  );
}

export default BillingPage;
