import React, { useState, useEffect } from "react";
import AddNewItemForm from "./Form/AddNewItemForm";
import ItemsDisplay from "./Display/ItemsDisplay";
import SummaryDisplay from "./Display/SummaryDisplay";

const sampleData = [
  {
    "Model": "Kisan Chair",
    "Description": "Very good chair",
    "Price": 10000,
    "HSN": 9403
  }, {
    "Model": "Supreme Chair",
    "Description": "Even better chair",
    "Price": "2134983",
    "HSN": 9403
  }, {
    "Model": "Action Houseware",
    "Description": "Not a chair",
    "Price": 69,
    "HSN": 69
  }, {
    "Model": "Coirfit Mattress",
    "Description": "Not a chair (neither houseware)",
    "Price": 19,
    "HSN": 420
  }, {
    "Model": "AVRO Chair",
    "Description": "Formerly AVON lol",
    "Price": 291,
    "HSN": 9403
  }, {
    "Model": "Mystery Item",
    "Description": "hehe heheheheheh",
    "Price": 1212312,
    "HSN": 42069
  }
];

const BillingPage = () => {
  useEffect(() => {
    alert("yo this app in beta");
  }, []);
  // to be handled by backend
  const defGSTValue = 18;

  const [items, setItems] = useState([]);
  const getItems = (item) => {
    setItems(
      [...items, item]
    );
  };

  useEffect(() => {
  }, [items]);

  return (
    <div>
      <AddNewItemForm savedItems={sampleData} addItem={getItems} defGSTValue={defGSTValue}/>
      <ItemsDisplay items={items} defGSTValue={defGSTValue}/>
      <SummaryDisplay items={items}/>
    </div>
  );
}

export default BillingPage;
