/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import "./../Form.scss";
import { Item } from "../../../interfaces";

interface props {
  savedItems: Item[]
  addItem: (item: Item) => void
  defGSTValue: number,
  registerItemFormVisibility: any,
  registerPersonFormVisibility: any
}

const AddNewItemForm: React.FC<props> = (props) => {
  console.log(props)
  const [itemNameValue, setItemNameValue] = useState<string>("");
  const [itemDescValue, setItemDescValue] = useState<string>("");
  const [itemPriceValue, setItemPriceValue] = useState<number>(0.00);
  const [itemDiscountValue, setItemDiscountValue] = useState<number>(0.00);
  const [itemGSTValue, setItemGSTValue] = useState<number>(props.defGSTValue);
  const [itemQTYValue, setItemQTYValue] = useState<number>(1);
  const [itemHSNValue, setItemHSNValue] = useState<number>(0);

  // to be handled by DocumentInfo
  // check if client is in same state
  // and apply cgst+sgst or igst accordingly
  // const inState: boolean = true;

  const enterItemNamePrompt: string = "start typing here";
  const registerItemPrompt: string = "add new";
  const emptyItemNames: any[] = [enterItemNamePrompt, registerItemPrompt, ""];

  // set description and price if match found in DB
  const applyItemInfo = (i: any) => {
    setItemDescValue(i.Description);
    setItemPriceValue(i.Price);
    setItemHSNValue(i.HSN);
    setItemGSTValue(i.GST);
  }

  // check the item name value and do stuff accordingly
  const setItemInfo = (itemName: any) =>
    (props.savedItems === null || itemName === registerItemPrompt)
      ? props.registerItemFormVisibility(true)
      : props.savedItems.some((i) => 
        itemName === i.Model.toLowerCase() && applyItemInfo(i))

  const resetAllValues = () => {
    setItemNameValue("");
    setItemDescValue("");
    setItemQTYValue(1);
    setItemPriceValue(1);
    setItemDiscountValue(0);
    setItemHSNValue(0);
    setItemGSTValue(props.defGSTValue);
  }

  return (
    <div className={"formContainer"}>
      <form className={"threePaneForm"} onSubmit={
        (event) => {
          event.preventDefault();

          // TODO: maybe move calculation of GST and Discount here
          const newInvoiceItem: Item = {
            Model: itemNameValue,
            Description: itemDescValue,
            Quantity: itemQTYValue,
            UnitPrice: itemPriceValue,
            TotalValue: (itemPriceValue * itemQTYValue),
            Discount: itemDiscountValue,
            HSN: itemHSNValue,

            // this also checks if igst applies or not
            // TODO: fix this
            sgst: 0,
            cgst: 0,
            igst: 0
            // sgst: inState ? parseInt(itemGSTValue) / 2 : "",
            // cgst: inState ? parseInt(itemGSTValue) / 2 : "",
            // igst: inState ? "" :  parseInt(itemGSTValue)
          }
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
                {props.savedItems !== null && props.savedItems.map(
                  (i) => <option key={i.Model}>{i.Model}</option>
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
              <input className={"smallInputBox"} type="number" min="1" value={itemQTYValue} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => {
                    const value: number = parseInt(event.currentTarget.value);
                    setItemQTYValue(value);
                  }
                } 
              required />
          </label>

          <label>
            Price: 
              <input className={"smallInputBox"} type="number" min="1.00" step="0.001" value={itemPriceValue} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => {
                    const value: number = parseFloat(event.currentTarget.value);
                    setItemPriceValue(value);
                  }
                } 
              required />
          </label>

          <label>
            Discount: 
              <input className={"smallInputBox"} type="number" min="0" step="0.001" value={itemDiscountValue} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => {
                    const value: number = parseInt(event.currentTarget.value);
                    setItemDiscountValue(value);
                  }
                } 
              />
          </label>

          <label>
            HSN: 
              <input className={"smallInputBox"} type="number" min="0" value={itemHSNValue} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => {
                    const value: number = parseInt(event.currentTarget.value);
                    setItemHSNValue(value);
                  }
                } 
              required />
          </label>

          <label>
            GST: 
              <input className={"smallInputBox"} type="number" min="0" value={itemGSTValue} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => {
                    const value: number = parseInt(event.currentTarget.value);
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
              || itemQTYValue <= 0
              || itemPriceValue <= 0
              || itemGSTValue <= 0
              ) ? true : false
            }
          />
        </div>
      </form>
    </div>
  )
}

export default AddNewItemForm;
