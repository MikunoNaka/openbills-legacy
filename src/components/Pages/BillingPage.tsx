/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState, useEffect } from "react";
import "./BillingPage.scss";
import { Item, Person, Transport/*, Invoice*/ } from "../../interfaces";
import axios from "axios";

import DocumentInfoForm from "./../Form/Document/DocumentInfoForm";
import AddNewItemForm from "./../Form/Items/AddNewItemForm";
import TransportForm from "./../Form/Transport/TransportForm";
import RegisterItemForm from "./../Form/Items/RegisterItemForm";
import RegisterPersonForm from "./../Form/People/RegisterPersonForm";

import ItemsDisplay from "./../Display/ItemsDisplay";
import SummaryDisplay from "./../Display/SummaryDisplay"; 

import InvoiceInfoMenu from "./../Menu/InvoiceInfoMenu";
import SubmitMenu from "./../Menu/SubmitMenu";


const BillingPage: React.FC = () => {
  const [savedItems, getSavedItems] = useState<Item[]>([]);
  const [savedPeople, getSavedPeople] = useState<Person[]>([]);
  const [registerItemFormVisibility, setRegisterItemFormVisibility] = useState<boolean>(false);
  const [registerPersonFormVisibility, setRegisterPersonFormVisibility] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [invoiceNumber, setInvoiceNumber] = useState<number>(1234); // TODO: get data from backend
  const [showTransportForm, setShowTransportForm] = useState<boolean>(false);
  const [transporter, setTransporter] = useState<Transport>({Name: "", VehicleNum: "", Method: "", GSTIN: "", Builty: ""})
  const [showSubmitMenu, setShowSubmitMenu] = useState<boolean>(false);

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
          updatePeopleList={getRegisteredPeople} 
          setVisibility={setRegisterPersonFormVisibility}
        />
      }

      {showTransportForm &&
        <TransportForm
          setVisibility={setShowTransportForm}
          setTransporter={setTransporter}
          currentTransporter={transporter}
        />
      }

      {showSubmitMenu &&
        <SubmitMenu
          setVisibility={setShowSubmitMenu}
          transporter={transporter}
          items={items}
        />
      }

      <DocumentInfoForm 
        savedPeople={savedPeople}
        invoiceNumber={invoiceNumber}
        setInvoiceNumber={setInvoiceNumber}
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
        <InvoiceInfoMenu
          setShowTransportForm={setShowTransportForm}
        />

        <SummaryDisplay 
          items={items}
          setShowSubmitMenu={setShowSubmitMenu}
        />
      </div>
    </>
  );
}

export default BillingPage;
