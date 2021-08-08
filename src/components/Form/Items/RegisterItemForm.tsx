/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

// TODO: Code isn't tested properly
// I'd be surprised if it < 10 bugs

import React, { useState, Dispatch, SetStateAction } from "react";
import "./../Form.scss";
import { NewItem } from "./../../../interfaces"
import axios from "axios";

interface props {
  defGSTValue: number
  setVisibility: Dispatch<SetStateAction<boolean>> // this component's visibility
  updateItemsList: () => Promise<void>
}

const RegisterItemForm: React.FC<props> = (props) => {
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemDesc, setNewItemDesc] = useState<string>("");
  const [newItemPrice, setNewItemPrice] = useState<number>(0.00);
  const [newItemHSN, setNewItemHSN] = useState<string>("");
  const [newItemGST, setNewItemGST] = useState<number>(props.defGSTValue);
  const [newItemBrand, setNewItemBrand] = useState<string>("");
  const [newItemCategory, setNewItemCategory] = useState<string>("");

  const hideSelf = () => props.setVisibility(false);

  const closeOnBGClicked = (event: any) => 
    event.target.className === "floatingMenuBG" && hideSelf();

  const postForm = (event: any) => {
    event.preventDefault();

    const newItem: NewItem = {
      Model: newItemName,
      Description: newItemDesc,
      UnitPrice: newItemPrice,
      HSN: newItemHSN,
      TotalGST: newItemGST,
      Brand: newItemBrand,
      Category: newItemCategory
    }

    // TODO: show confirmation before being invisible 
    // TODO: Implement override protection
    axios.post("/api/items/register", newItem)
      .then((res) => {
        console.log(res);
        hideSelf();
        props.updateItemsList();
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong, please check the log by opening the console.")
      });
  }


  return (
    <div className={"floatingMenuBG"} onClick={closeOnBGClicked}>
      <div className={"floatingMenu"}>
        <div className={"formContainer"}>
          <form className={"floatingForm"} onSubmit={postForm}>
            <div className={"twoPaneForm"}>
              <div className={"widePane formPane"}>
                <label>
                  Item/Service: <input className={"wideInputBox"} type="text" value={newItemName} onChange={
                    (event) => setNewItemName(event.target.value)
                  } required />
                </label>

                <label>
                  Description: <input className={"wideInputBox"} type="text" value={newItemDesc} onChange={
                    (event) => setNewItemDesc(event.target.value)
                  } />
                </label>

                <label>
                  Brand: <input className={"wideInputBox"} type="text" value={newItemBrand} onChange={
                    (event) => setNewItemBrand(event.target.value)
                  } required />
                </label>

                <label>
                  Category: <input className={"wideInputBox"} type="text" value={newItemCategory} onChange={
                    (event) => setNewItemCategory(event.target.value)
                  } />
                </label>
              </div>

              <div className={"widePane formPane"}>
                <label>
                  Price: <input className={"smallInputBox"} type="number" min="0.00" step="0.001" value={newItemPrice} onChange={
                    (event: React.FormEvent<HTMLInputElement>) => 
                      setNewItemPrice(parseInt(event.currentTarget.value))
                  } />
                </label>

                <label>
                  HSN: <input className={"smallInputBox"} type="number" min="0" value={newItemHSN} onChange={
                    (event) => setNewItemHSN(event.target.value)
                  } />
                </label>

                <label>
                  GST: <input className={"smallInputBox"} type="number" min="0" value={newItemGST} onChange={
                    (event: React.FormEvent<HTMLInputElement>) => 
                      setNewItemGST(parseInt(event.currentTarget.value))
                  } />
                </label>
              </div>
            </div>

            <div className={"menu"}>
              <input
                type="button"
                value="cancel"
                onClick={() => hideSelf()}
              />

              <input
                type="submit"
                value="Register/Add"
                disabled={newItemName=== "" ? true : false}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterItemForm;
