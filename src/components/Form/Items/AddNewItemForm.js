/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import "./../Form.scss";

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

  // set description and price if match found in DB
  const applyItemInfo = (i) => {
    setItemDescValue(i.Description);
    setItemPriceValue(i.Price);
    setItemHSNValue(i.HSN);
    setItemGSTValue(i.GST);
  }

  // check the item name value and do stuff accordingly
  const setItemInfo = (itemName) => {
    props.savedItems.some(
      (i) => {
        itemName === i.Model.toLowerCase()
          ? applyItemInfo(i)
          : itemName === registerItemPrompt && props.registerItemFormVisibility(true)
        return null;
      }
    )
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
      <form className={"threePaneForm"} onSubmit={
        (event) => {
          alert("submit")
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
        <div className={"widePane formPane"}>
          <label>
            Item/Service: 
              <select
                className={"selectInputBox"}
                value={itemNameValue} 
                onChange={
                  (event) => {
                    setItemNameValue(event.target.value);
                    setItemInfo(event.target.value.toLowerCase());
                  }
              }>
                <option key={enterItemNamePrompt}>{enterItemNamePrompt}</option>
                {props.savedItems === null || props.savedItems.map(
                  (i) => {
                    return <option key={i.Model}>{i.Model}</option>
                  }
                )}
                <option key={registerItemPrompt}>{registerItemPrompt}</option>
              </select>
          </label>

          <label>
            Description:
              <input className={"wideInputBox"} type="text" value={itemDescValue} 
                onChange={
                  (event) => {
                    setItemDescValue(event.target.value);
                  }
                } 
              />
          </label>
        </div>

        <div className={"widePane formPane"}>
          <label>
            Quantity: 
              <input className={"smallInputBox"} type="number" min="1" value={itemQtyValue} 
                onInput={
                  (event) => {
                    const value = event.target.value;
                    setItemQtyValue(value);
                  }
                } 
              required />
          </label>

          <label>
            Price: 
              <input className={"smallInputBox"} type="number" min="1.00" step="0.001" value={itemPriceValue} 
                onChange={
                  (event) => {
                    const value = event.target.value;
                    setItemPriceValue(value);
                  }
                } 
              required />
          </label>

          <label>
            Discount: 
              <input className={"smallInputBox"} type="number" min="0" step="0.001" value={itemDiscountValue} 
                onChange={
                  (event) => {
                    const value = event.target.value;
                    setItemDiscountValue(value);
                  }
                }
              />
          </label>

          <label>
            HSN: 
              <input className={"smallInputBox"} type="number" min="0" value={itemHSNValue} 
                onChange={
                  (event) => {
                    const value = event.target.value;
                    setItemHSNValue(value);
                  }
                } 
              required />
          </label>

          <label>
            GST: 
              <input className={"smallInputBox"} type="number" min="0" value={itemGSTValue} 
                onChange={
                  (event) => {
                    const value = event.target.value;
                    setItemGSTValue(value);
                  }
                } 
              required />
          </label>
        </div>

        <div className={"smallPane formPane"}>
          <input type="button" 
            value="Register New Client" 
            onClick={() => props.registerPersonFormVisibility(true)}
          />

          <input type="button" 
            value="Register New Item" 
            onClick={() => props.registerItemFormVisibility(true)}
          />

          <input type="button" value="Placeholder1" />
          <input type="button" value="Placeholder2" />
          <input type="submit" value="Force Add" />

          <input type="submit" value="add" 
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
