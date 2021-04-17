import React, { useState } from "react";
import AddNewItemForm from "./Form/AddNewItemForm";
import ItemsDisplay from "./Display/ItemsDisplay";
// import SummaryDisplay from "./Display/SummaryDisplay";

const sampleData = [
  {
    "Model": "Kisan Chair",
    "Description": "Very good chair",
    "Price": 10000,
  }, {
    "Model": "Supreme Chair",
    "Description": "Even better chair",
    "Price": "2134983",
  }, {
    "Model": "Action Houseware",
    "Description": "Not a chair",
    "Price": 69,
  }, {
    "Model": "Coirfit Mattress",
    "Description": "Not a chair (neither houseware)",
    "Price": 19,
  }, {
    "Model": "AVRO Chair",
    "Description": "Formerly AVON lol",
    "Price": 291,
  }, {
    "Model": "Mystery Item",
    "Description": "hehe heheheheheh",
    "Price": 1212312,
  }
];

const BillingPage = () => {
  // to be handled by backend
  const defGSTValue = 18;

  const [items, setItems] = useState([]);
  const getItems = (item) => {
    setItems(
      [...items, item]
    );
  };

  return (
    <div>
      <AddNewItemForm savedItems={sampleData} addItem={getItems} defGSTValue={defGSTValue}/>
      <ItemsDisplay items={items}/>
    </div>
  );
}

export default BillingPage;
