/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

// TODO: Code isn't tested properly
// I'd be surprised if it < 10 bugs

// TODO: Implement override protection

import React, { useState } from "react";
import axios from "axios";
import "./../Form.scss";

interface props {
  defGSTValue: number
  setVisibility: any // this component's visibility
  updateItemsList: () => Promise<void>
}

const RegisterItemForm: React.FC<props> = (props) => {
  const [newItemNameValue, setNewItemNameValue] = useState<string>("");
  const [newItemDescValue, setNewItemDescValue] = useState<string>("");
  const [newItemPriceValue, setNewItemPriceValue] = useState<number>(0.00);
  const [newItemHSNValue, setNewItemHSNValue] = useState<number>();
  const [newItemGSTValue, setNewItemGSTValue] = useState<number>(props.defGSTValue);
  // const [newItemBrandValue, setNewItemBrandValue] = useState("");
  // const [newItemTypeValue, setNewItemTypeValue] = useState("");

  const hideSelf = () => props.setVisibility(false);

  const closeOnBGClicked = (event: any) => 
    event.target.className === "floatingMenuBG" && hideSelf();

  const postForm = (event: any) => {
    event.preventDefault();
    // TODO: show confirmation before being invisible
    axios.post(
      `/api/items/register/`
      + `?model=${newItemNameValue}`
      + `&desc=${newItemDescValue}`
      + `&price=${newItemPriceValue}`
      + `&hsn=${newItemHSNValue}`
      + `&gst=${newItemGSTValue}`
    )
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
                  Item/Service: <input className={"wideInputBox"} type="text" value={newItemNameValue} onChange={
                    (event) => setNewItemNameValue(event.target.value)
                  } required />
                </label>

                <label>
                  Description: <input className={"wideInputBox"} type="text" value={newItemDescValue} onChange={
                    (event) => setNewItemDescValue(event.target.value)
                  } />
                </label>

              </div>
              <div className={"widePane formPane"}>
                <label>
                  Price: <input className={"smallInputBox"} type="number" min="0.00" step="0.001" value={newItemPriceValue} onChange={
                    (event: React.FormEvent<HTMLInputElement>) => 
                      setNewItemPriceValue(parseInt(event.currentTarget.value))
                  } />
                </label>

                <label>
                  HSN: <input className={"smallInputBox"} type="number" min="0" value={newItemHSNValue} onChange={
                    (event: React.FormEvent<HTMLInputElement>) => 
                      setNewItemHSNValue(parseInt(event.currentTarget.value))
                  } />
                </label>

                <label>
                  GST: <input className={"smallInputBox"} type="number" min="0" value={newItemGSTValue} onChange={
                    (event: React.FormEvent<HTMLInputElement>) => 
                      setNewItemGSTValue(parseInt(event.currentTarget.value))
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
                disabled={newItemNameValue === "" ? true : false}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterItemForm;
