/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

// TODO: Code isn't tested properly
// I'd be surprised if it has no bugs

import React, { useState } from "react";
import axios from "axios";
import "./Form.css";


const RegisterItemForm = () => {
  // show/hide this component
  const [visibility, setVisibility] = useState(true)// useState(props.visibility);

  const [newItemNameValue, setNewItemNameValue] = useState("");
  const [newItemDescValue, setNewItemDescValue] = useState("");
  // const [newItemBrandValue, setNewItemBrandValue] = useState("");
  // const [newItemTypeValue, setNewItemTypeValue] = useState("");
  const [newItemPriceValue, setNewItemPriceValue] = useState("");
  const [newItemHSNValue, setNewItemHSNValue] = useState("");
  const [newItemGSTValue, setNewItemGSTValue] = useState("");


  return (
    <div className={"formContainer RegisterItemFormContainer"} style={{display: visibility ? "fixed" : "none"}}>
      <form className={"addNewItemForm RegisterItemForm"} onSubmit={
          (event) => {
            event.preventDefault();
            setVisibility(false);

            axios.post(`/api/items/?model=${newItemNameValue}&desc=${newItemDescValue}&price=${newItemPriceValue}&hsn=${newItemHSNValue}&gst=${newItemGSTValue}`)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }>
        <div className={"textInputs"}>
          <label>
            Item/Service: <input type="text" value={newItemNameValue} onChange={
              (event) => {
                setNewItemNameValue(event.target.value);
              }
            } required />
          </label>

          <label>
            Description: <input type="text" value={newItemDescValue} onChange={
              (event) => {
                setNewItemDescValue(event.target.value);
              }
            } />
          </label>
        </div>

        <div className={"numericInputs"}>
          <label>
            Price: <input type="number" min="1.00" step="0.001" value={newItemPriceValue} onChange={
              (event) => {
                const value = event.target.value;
                setNewItemPriceValue(value);
              }
            } />
          </label>

          <label>
            HSN: <input type="number" min="0" value={newItemHSNValue} onChange={
              (event) => {
                const value = event.target.value;
                setNewItemHSNValue(value);
              }
            } />
          </label>

          <label>
            GST: <input type="number" min="0" value={newItemGSTValue} onChange={
              (event) => {
                const value = event.target.value;
                setNewItemGSTValue(value);
              }
            } />
          </label>
        </div>

        <input
          type="submit"
          value="Register/Add"
          disabled={newItemNameValue !== "" ? "" : "disabled"}
        />
      </form>
    </div>
  );
}

export default RegisterItemForm;
