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


const RegisterItemForm = (props) => {
  const [newItemNameValue, setNewItemNameValue] = useState("");
  const [newItemDescValue, setNewItemDescValue] = useState("");
  const [newItemPriceValue, setNewItemPriceValue] = useState(0.00);
  const [newItemHSNValue, setNewItemHSNValue] = useState("");
  const [newItemGSTValue, setNewItemGSTValue] = useState(props.defGSTValue);
  // const [newItemBrandValue, setNewItemBrandValue] = useState("");
  // const [newItemTypeValue, setNewItemTypeValue] = useState("");

  const hideSelf = () => props.setVisibility(false);

  const closeOnBGClicked = (event) => 
    event.target.className === "floatingMenuBG" && hideSelf();

  const postForm = (event) => {
    event.preventDefault();

  // TODO: show confirmation before being invisible
    axios.post(
      `/api/items/`
      + `?model=${newItemNameValue}`
      + `&desc=${newItemDescValue}`
      + `&price=${newItemPriceValue}`
      + `&hsn=${newItemHSNValue}`
      + `&gst=${newItemGSTValue}`
    )
      .then((res) => {
        console.log(res);
        props.setVisibility(false);
      })
      .catch((err) => {
        console.log(err);
      });
    props.updateItemsList();
  }


  return (
    <div className={"floatingMenuBG"} onClick={closeOnBGClicked}>
      <div className={"floatingMenu"}>
        <div className={"formContainer"}>
          <form className={"floatingForm"} onSubmit={postForm}>
            <div className={"twoPaneForm"}>
              <div className={"widePane"}>
                <label>
                  Item/Service: <input className={"wideInputBox"} type="text" value={newItemNameValue} onChange={
                    (event) => {
                      setNewItemNameValue(event.target.value);
                    }
                  } required />
                </label>

                <label>
                  Description: <input className={"wideInputBox"} type="text" value={newItemDescValue} onChange={
                    (event) => {
                      setNewItemDescValue(event.target.value);
                    }
                  } />
                </label>

              </div>
              <div className={"widePane"}>
                <label>
                  Price: <input className={"smallInputBox"} type="number" min="0.00" step="0.001" value={newItemPriceValue} onChange={
                    (event) => {
                      const value = event.target.value;
                      setNewItemPriceValue(value);
                    }
                  } />
                </label>

                <label>
                  HSN: <input className={"smallInputBox"} type="number" min="0" value={newItemHSNValue} onChange={
                    (event) => {
                      const value = event.target.value;
                      setNewItemHSNValue(value);
                    }
                  } />
                </label>

                <label>
                  GST: <input className={"smallInputBox"} type="number" min="0" value={newItemGSTValue} onChange={
                    (event) => {
                      const value = event.target.value;
                      setNewItemGSTValue(value);
                    }
                  } />
                </label>
            </div>
            </div>

            <div className={"menu"}>
              <input
                type="button"
                value="cancel"
                onClick={
                  () => {
                    props.setVisibility(false);
                  }
                }
              />

              <input
                type="submit"
                value="Register/Add"
                disabled={newItemNameValue !== "" ? "" : "disabled"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterItemForm;
