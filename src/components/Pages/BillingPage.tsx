/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState, useEffect } from "react";
import axios from "axios";

import { Item } from "../../interfaces";

import AddNewItemForm from "./../Form/Items/AddNewItemForm";
import RegisterItemForm from "./../Form/Items/RegisterItemForm";

import RegisterPersonForm from "./../Form/People/RegisterPersonForm";

import DocumentInfoForm from "./../Form/Document/DocumentInfoForm";
import MetaInfoForm from "./../Form/Document/MetaInfoForm";

import ItemsDisplay from "./../Display/ItemsDisplay";
import SummaryDisplay from "./../Display/SummaryDisplay"; 

const BillingPage: React.FC = () => {
  const [savedItems, getSavedItems] = useState<Item[]>([]);
  const [savedPeople, getSavedPeople] = useState([]);
  const [registerItemFormVisibility, setRegisterItemFormVisibility] = useState<boolean>(false);
  const [registerPersonFormVisibility, setRegisterPersonFormVisibility] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  const getRegisteredItems = () =>
    axios.get(`/api/items/get-all`)
      .then((res) => getSavedItems(res.data))
      .catch((res) => console.log(res));

  const getRegisteredPeople = () => 
    axios.get(`/api/people/get-all`)
      .then((res) => getSavedPeople(res.data))
      .catch((res) => console.log(res));

  // get data from server on startup
  useEffect(() => {
    getRegisteredItems();
    getRegisteredPeople();
  }, []);

  // TODO: to be handled by backend
  const defGSTValue = 18;

  // update the items from AddNewItemForm
  const getItems = (item: Item) => setItems([...items, item]);

  return (
    <>
      {registerItemFormVisibility &&
        <RegisterItemForm 
          defGSTValue={defGSTValue}
          updateItemsList={getRegisteredItems} 
          setVisibility={setRegisterItemFormVisibility}
        />
      }

      {registerPersonFormVisibility &&
        <RegisterPersonForm 
          updateItemsList={getRegisteredItems} 
          setVisibility={setRegisterPersonFormVisibility}
        />
      }

      <DocumentInfoForm 
        savedPeople={savedPeople}
      />

      <AddNewItemForm 
        savedItems={savedItems} 
        addItem={getItems} 
        defGSTValue={defGSTValue}
        registerItemFormVisibility={setRegisterItemFormVisibility}
        registerPersonFormVisibility={setRegisterPersonFormVisibility}
      />

      <ItemsDisplay 
        items={items} 
        defGSTValue={defGSTValue}
      />

      <div className={"BillingPageFlex"}>
        <MetaInfoForm/>
        <SummaryDisplay items={items}/>
      </div>
    </>
  );
}

export default BillingPage;
