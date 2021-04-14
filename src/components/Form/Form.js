import React, { useState } from "react";
import "./Form.css";

const BillingForm = () => {
  /*
  const sampleData = [
    {
      "Model": "Kisan Chair",
      "Description":"Very good chair",
      "Price":"10000",
      "Discount":"3%"
    },
    {
      "Model": "Supreme Chair",
      "Description":"Even better chair",
      "Price":"2134983",
      "Discount":"9%"
    }
  ]
  */
  const [itemValue, setItemValue] = useState("");
  const [descValue, setDescValue] = useState("");



  return (
    <form onSubmit={
      (event) => {
        event.preventDefault();
        console.log(itemValue, descValue);
      }
    }>

      <label>
        Item: <input type="text" value={itemValue} onChange={
          (event) => {
            setItemValue(event.target.value);
          }
        } />
      </label>

      <label>
        Description: <input type="text" value={descValue} onChange={
          (event) => {
            setDescValue(event.target.value);
          }
        } />
      </label>

      <input type="submit" value="add" />

    </form>
  )
}

export default BillingForm;
