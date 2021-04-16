import React, { useState } from "react";
import AddNewItemForm from "./Form/AddNewItemForm";
import ItemsDisplay from "./Display/ItemsDisplay";

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


const BillingPage = () => {
  const [items, setItems] = useState([]);
  const defGSTValue = 18;

  const getItems = (item) => {
    setItems(
        [...items, item]
    );
  }

  console.log(items)
  return (
    <div>
      <AddNewItemForm savedItems={sampleData} addItem={getItems} defGSTValue={defGSTValue}/>

      <ItemsDisplay/>
    </div>
  );
}

export default BillingPage;
