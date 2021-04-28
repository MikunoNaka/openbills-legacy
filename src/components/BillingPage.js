/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState, useEffect } from "react";
import axios from "axios";

import AddNewItemForm from "./Form/AddNewItemForm";
import RegisterItemForm from "./Form/RegisterItemForm";
import MetaInfoForm from "./Form/MetaInfoForm";
import ItemsDisplay from "./Display/ItemsDisplay";
import SummaryDisplay from "./Display/SummaryDisplay";

const BillingPage = () => {
  const [savedItems, getSavedItems] = useState([]);

  const getRegisteredItems = () => {
    axios.get(`/api/items`)
      .then((res) => {
        getSavedItems(res.data);
      })
      .catch((res) => {
        alert("The promise returned an error idk what to do");
        console.log(res);
      })
  }

  // get data from server on startup
  useEffect(() => {
    getRegisteredItems();
  }, []);
  // TODO: to be handled by backend
  const defGSTValue = 18;

  // update the items from AddNewItemForm
  const [items, setItems] = useState([]);
  const getItems = (item) => {
    setItems(
      [...items, item]
    );
  };

  return (
    <>
      <AddNewItemForm savedItems={savedItems} addItem={getItems} defGSTValue={defGSTValue}/>
      <RegisterItemForm updateItemsList={getRegisteredItems}/>
      <ItemsDisplay items={items} defGSTValue={defGSTValue}/>
      <div className={"BillingPageFlex"}>
        <MetaInfoForm/>
        <SummaryDisplay items={items}/>
      </div>
    </>
  );
}

export default BillingPage;
