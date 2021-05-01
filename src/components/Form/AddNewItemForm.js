/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import "./Form.scss";


const AddNewItemForm = (props) => {
  const [itemNameValue, setItemNameValue] = useState("");
  const [itemDescValue, setItemDescValue] = useState("");
  const [itemPriceValue, setItemPriceValue] = useState(0.00);
  const [itemDiscountValue, setItemDiscountValue] = useState(0.00);
  const [itemGSTValue, setItemGSTValue] = useState(props.defGSTValue);
  const [itemQtyValue, setItemQtyValue] = useState(1);
  const [itemHSNValue, setItemHSNValue] = useState(0);

  const enterItemNamePrompt = "start typing here";
  const registerItemPrompt = "add new";
  const emptyItemNames = [enterItemNamePrompt, registerItemPrompt, ""];

  // Extract the model names from savedItems
  let savedItemNames= [];
  if (props.savedItems !== null) {
    for (let i = 0; i < props.savedItems.length; i++) {
      savedItemNames.push(props.savedItems[i].Model);
    }
  }
  
  // set description and price
  // when item is entered
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

  const resetAllValues = () => {
    setItemNameValue("");
    setItemDescValue("");
    setItemQtyValue(1);
    setItemPriceValue(1);
    setItemDiscountValue(0);
    setItemHSNValue(0);
    setItemGSTValue(props.defGSTValue);
  }

  return (
    <div className={"formContainer"}>
      <form className={"addNewItemForm"} onSubmit={
        (event) => {
          event.preventDefault();
          const newInvoiceItem = {
            "Model": itemNameValue,
            "Description": itemDescValue,
            "Quantity": parseInt(itemQtyValue),
            "UnitPrice": parseFloat(itemPriceValue),
            "TotalPrice": parseFloat(itemPriceValue * itemQtyValue),
            "Discount": parseInt(itemDiscountValue),
            "HSN": parseInt(itemHSNValue),
            "GST": parseInt(itemGSTValue)
          };
          props.addItem(newInvoiceItem);
          resetAllValues();
        }
      }>
        <div className={"textInputs"}>
          <label>
            Item/Service: 
              <select
                value={itemNameValue} 
                onChange={
                  (event) => {
                    setItemNameValue(event.target.value);
                    setItemInfo(event.target.value.toLowerCase());
                  }
              }>
                <option key={enterItemNamePrompt}>{enterItemNamePrompt}</option>
                {savedItemNames.map(
                  (i) => {
                    return <option key={i}>{i}</option>
                  }
                )}
                <option key={registerItemPrompt}>{registerItemPrompt}</option>
              </select>
          </label>
  
          <label>
            Description: <input type="text" step="0.1" value={itemDescValue} onChange={
              (event) => {
                setItemDescValue(event.target.value);
              }
            } />
          </label>
        </div>

        <div className={"numericInputs"}>
          <label>
            Quantity: <input type="number" min="1" value={itemQtyValue} onInput={
              (event) => {
                const value = event.target.value;
                setItemQtyValue(value);
              }
            } required />
          </label>

          <label>
            Price: <input type="number" min="1.00" step="0.001" value={itemPriceValue} onChange={
              (event) => {
                const value = event.target.value;
                setItemPriceValue(value);
              }
            } required />
          </label>

          <label>
            Discount: <input type="number" min="0" step="0.001" value={itemDiscountValue} onChange={
              (event) => {
                const value = event.target.value;
                setItemDiscountValue(value);
              }
            } />
          </label>

          <label>
            HSN: <input type="number" min="0" value={itemHSNValue} onChange={
              (event) => {
                const value = event.target.value;
                setItemHSNValue(value);
              }
            } required />
          </label>

          <label>
            GST: <input type="number" min="0" value={itemGSTValue} onChange={
              (event) => {
                const value = event.target.value;
                setItemGSTValue(value);
              }
            } required />
          </label>
        </div>

        <div className={"menuButtons"}>
          <input type="button" 
            value="Register New Item" 
            onClick={() => props.registerFormVisibility(true)}
          />

          <input type="button" value="Placeholder1" />
          <input type="button" value="Placeholder2" />
          <input type="submit" value="Force Add" />

          <input 
            type="submit" 
            value="add" 
            disabled={ 
              (emptyItemNames.includes(itemNameValue)
              || itemQtyValue <= 0
              || itemPriceValue <= 0
              || itemGSTValue <= 0
              ) ? "disabled" : ""
            }
          />
        </div>
      </form>
    </div>
  )
}

export default AddNewItemForm;
