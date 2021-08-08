/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import { Item } from "../../../interfaces";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import "./../Form.scss";

interface Props {
  savedItems: Item[]
  addItem: (item: Item) => void
  defGSTValue: number
  registerItemFormVisibility: any
  registerPersonFormVisibility: any
}

const AddNewItemForm: React.FC<Props> = (props) => {
  const [itemNameValue, setItemNameValue] = useState<string>("");
  const [itemDescValue, setItemDescValue] = useState<string>("");
  const [itemPriceValue, setItemPriceValue] = useState<number>(0.00);
  const [itemDiscountPercentage, setItemDiscountPercentage] = useState<number>(0.00);
  const [itemGSTPercentage, setItemGSTPercentage] = useState<number>(props.defGSTValue);
  const [itemQTYValue, setItemQTYValue] = useState<number>(1);
  const [itemHSNValue, setItemHSNValue] = useState<string>("");
  const [itemBrand, setItemBrand] = useState<string>("");
  const [itemCategory, setItemCategory] = useState<string>("");

  // default item object
  const defaultItem: any = {
    Description: "",
    UnitPrice: 0.00,
    TotalGST: props.defGSTValue,
    HSN: "",
    Brand: "",
    Category: ""
  }

  // store the current item to easily reset a value to the default one
  const [currentItem, setCurrentItem] = useState<Item|any>(defaultItem);

  // to be handled by DocumentInfo
  // check if client is in same state
  // and apply cgst+sgst or igst accordingly
  const inState: boolean = true;

  const enterItemNamePrompt: string = "start typing here";
  const registerItemPrompt: string = "add new";
  const emptyItemNames: string[] = [enterItemNamePrompt, registerItemPrompt, ""];

  // set description and price if match found in DB
  const applyItemInfo = (i: Item) => {
    setItemDescValue(i.Description);
    setItemPriceValue(i.UnitPrice);
    setItemHSNValue(i.HSN);
    setItemGSTPercentage(i.TotalGST);
    setItemBrand(i.Brand);
    setItemCategory(i.Category);
    console.log(i);
    setCurrentItem(i);
  }

  // check the item name value and do stuff accordingly
  const setItemInfo = (itemName: string) =>
    (props.savedItems === null || itemName === registerItemPrompt)
      ? props.registerItemFormVisibility(true)
      : props.savedItems.some((i) => 
        itemName === i.Model.toLowerCase() && applyItemInfo(i));

  const resetAllValues = () => {
    setItemNameValue("");
    setItemDescValue("");
    setItemQTYValue(1);
    setItemPriceValue(0);
    setItemDiscountPercentage(0);
    setItemHSNValue("");
    setItemGSTPercentage(props.defGSTValue);
    setCurrentItem(defaultItem);
  }

  return (
    <div className={"formContainer"}>
      <form className={"threePaneForm"} onSubmit={
        (event) => {
          event.preventDefault();

          const totalValue: number = itemPriceValue * itemQTYValue;

          // the values below are being rounded to two decimal places
          // i see no reason doing this anymore
          // const discountvalue: number = parsefloat(((itemdiscountpercentage / 100) * totalvalue).tofixed(2))
          // const totalgstvalue: number = parsefloat(((itemgstpercentage / 100) * totalvalue).tofixed(2))

          const discountValue: number = (itemDiscountPercentage / 100) * totalValue;
          const totalGSTValue: number = (itemGSTPercentage / 100) * totalValue;

          const newInvoiceItem: Item = {
            Model:         itemNameValue,
            Description:   itemDescValue,
            Quantity:      itemQTYValue,
            UnitPrice:     itemPriceValue,
            TotalValue:    totalValue,
            Discount:      itemDiscountPercentage,
            DiscountValue: discountValue,
            HSN:           itemHSNValue,
            TotalGST:      itemGSTPercentage,
            TotalGSTValue: totalGSTValue,

            // this also checks if igst applies or not
            SGST: inState && totalGSTValue / 2,
            CGST: inState && totalGSTValue / 2,
            IGST: inState || totalGSTValue,

            Brand:         itemBrand,
            Category:      itemCategory
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
              <span className={"buttonInput"}>
                {itemDescValue === currentItem.Description ||
                  <FontAwesomeIcon icon={faSync} className={"icon"} onClick={
                      (event) => {
                        event.preventDefault(); // don't select the input box
                        setItemDescValue(currentItem.Description);
                      }
                  }/>
                }
                <input className={"wideInputBox"} type="text" value={itemDescValue} 
                  onChange={(event) => setItemDescValue(event.target.value)} 
                />
              </span>
          </label>

          <label>
            Brand: 
              <input className={"wideInputBox"} type="text" value={itemBrand} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => 
                    setItemBrand(event.currentTarget.value)
                } 
              />
          </label>

          <label>
            Category: 
              <input className={"wideInputBox"} type="text" value={itemCategory} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => 
                    setItemCategory(event.currentTarget.value)
                } 
              />
          </label>
        </div>

        <div className={"widePane formPane"}>
          <label>
            Quantity: 
              <input className={"smallInputBox"} type="number" min="1" value={itemQTYValue} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => 
                    setItemQTYValue(parseInt(event.currentTarget.value))
                } 
              required />
          </label>

          <label>
            Price: 
              <span className={"buttonInput"}>
                {itemPriceValue === currentItem.UnitPrice ||
                  <FontAwesomeIcon icon={faSync} className={"icon"} onClick={
                      (event) => {
                        event.preventDefault(); // don't select the input box
                        setItemPriceValue(currentItem.UnitPrice);
                      }
                  }/>
                }
                <input className={"smallInputBox"} type="number" min="1.00" step="0.001" value={itemPriceValue} 
                  onInput={
                    (event: React.FormEvent<HTMLInputElement>) => 
                      setItemPriceValue(parseFloat(event.currentTarget.value))
                  } 
                required />
              </span>
          </label>

          <label>
            Discount: 
              <input className={"smallInputBox"} type="number" min="0" step="0.001" value={itemDiscountPercentage} 
                onInput={
                  (event: React.FormEvent<HTMLInputElement>) => 
                    setItemDiscountPercentage(parseInt(event.currentTarget.value))
                } 
              />
          </label>

          <label>
            HSN: 
              <span className={"buttonInput"}>
                {itemHSNValue === currentItem.HSN ||
                  <FontAwesomeIcon icon={faSync} className={"icon"} onClick={
                      (event) => {
                        event.preventDefault(); // don't select the input box
                        setItemHSNValue(currentItem.HSN);
                      }
                  }/>
                }
                <input className={"smallInputBox"} type="number" min="0" value={itemHSNValue} 
                  onChange={(event) => setItemHSNValue(event.target.value)} 
                required />
              </span>
          </label>

          <label>
            GST: 
              <span className={"buttonInput"}>
                {itemGSTPercentage === currentItem.TotalGST ||
                  <FontAwesomeIcon icon={faSync} className={"icon"} onClick={
                      (event) => {
                        event.preventDefault(); // don't select the input box
                        setItemGSTPercentage(currentItem.TotalGST);
                      }
                  }/>
                }
                <input className={"smallInputBox"} type="number" min="0" value={itemGSTPercentage} 
                  onInput={
                    (event: React.FormEvent<HTMLInputElement>) => 
                      setItemGSTPercentage(parseInt(event.currentTarget.value))
                  } 
                required />
              </span>
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

          <input type="submit" value="add" 
            disabled={ 
              (emptyItemNames.includes(itemNameValue)
              || itemQTYValue <= 0
              || itemPriceValue <= 0
              || itemGSTPercentage <= 0
              ) ? true : false
            }
          />
        </div>
      </form>
    </div>
  );
}

export default AddNewItemForm;
