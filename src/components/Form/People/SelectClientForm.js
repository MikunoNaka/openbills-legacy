/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import "./../Form.scss";

import ClientInfoDisplay from "./../../Display/ClientInfoDisplay";


const DocumentInfoForm = (props) => {
  const [clientID, setClientID] = useState("");
  /* TODO: implement a way such that the database also 
    * gives the ID of the client and all the functions
    * are carried out from the ID because if two people
    * with same name are added then this shit is done for
  */

  const selectPersonPrompt = "start typing here";
  const registerPersonPrompt = "add new";

  // const emptyPersonNames = [enterItemNamePrompt, registerItemPrompt, ""];

  // No need for this code but just in case
  // Extract the model names from savedItems
  /*
  let savedPeopleNames = [];
  if (props.savedPeople !== null) {
    for (let i = 0; i < props.savedPeople.length; i++) {
      savedPeopleNames.push(props.savedPeople[i].Name);
    }
  }*/
  
  // set description and price
  // when item is entered
  /*
  const setItemInfo = (itemName) => {
    for (let i = 0; i < props.savedItems.length; i++) {
      const mod = props.savedItems[i].Model.toLowerCase();
      const desc = props.savedItems[i].Description;
      const price = props.savedItems[i].Price;
      const hsn = props.savedItems[i].HSN;
      const gst = props.savedItems[i].GST;

      if (mod === itemName) {
        setItemDescValue(desc);
        setItemPriceValue(price);
        setItemHSNValue(hsn);
        setItemGSTValue(gst);
        break;
      }
    }
  }
    */

  /*
  const resetAllValues = () => {
    setItemNameValue("");
    setItemDescValue("");
    setItemQtyValue(1);
    setItemPriceValue(1);
    setItemDiscountValue(0);
    setItemHSNValue(0);
    setItemGSTValue(props.defGSTValue);
  }
  */

  return (
    <div className={"SelectClientForm DocumentInfoChild"}>
      <label>
        Client Name:
          <select
            className={"selectInputBox"}
            value={clientID}
            onChange={
              (event) => {
                setClientID(event.target.value);
                // setItemInfo(event.target.value.toLowerCase());
              }
          }>
            <option>{selectPersonPrompt}</option>
            {props.savedPeople.map(
              (i) => {
                return (
                  // the className helps determine the id of the option
                  // TODO: find another way to show this selection box
                  // such that the user can enter name and it chooses the id
                  // most likely it needs to be a different component
                  <option key={i.ID}>
                    {i.Name}
                  </option>
                );
              }
            )}
            <option key={registerPersonPrompt}>{registerPersonPrompt}</option>
          </select>
      </label>
      <ClientInfoDisplay clientID={clientID}/>
    </div>
  );
}

export default DocumentInfoForm;
