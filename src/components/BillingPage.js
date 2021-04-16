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
  // to be handled by backend
  const defGSTValue = 18;

  /* Note to the dumbass coding this alone
   * Right now only the models are getting passed
   * into ItemsDisplay because I wanted to
   * take screenshots and shit. 
   * Implement a feature such that I can pass in a
   * whole array of objects and ItemsDisplay processes
   * the itemNames, prices and shit. 
   * This file should only handle 
   * getting the items from AddNewItemForm
   * putting it into the list
   * and pass it into ItemsDisplay 
   */
  const [items, setItems] = useState([]);
  const getItems = (item) => {
    setItems(
      [...items, item.Model]
    );
  };

  console.log(items)
  return (
    <div>
      <AddNewItemForm savedItems={sampleData} addItem={getItems} defGSTValue={defGSTValue}/>

      <ItemsDisplay items={items}/>
    </div>
  );
}

export default BillingPage;
