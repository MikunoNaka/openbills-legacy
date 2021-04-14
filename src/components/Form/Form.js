import React, { useState } from "react";
import "./Form.css";


const BillingForm = (props) => {
  const [itemValue, setItemValue] = useState("");
  const [descValue, setDescValue] = useState("");

  const savedItems = props.savedItems;
  let savedItemNames = []
  for (let i = 0; i < savedItems.length; i++) {
    savedItemNames.push(savedItems[i].Model)
  }

  const filteredItems = savedItemNames.filter(
    (item) => {
      // case insensitive
      return item.toLowerCase().includes(itemValue.toLowerCase());
    }
  );
  
  return (
    <div>
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

      <ul>
        {filteredItems.map(
          (i) => {
            return <li key={i}>{i}</li>
          }
        )}
      </ul>
    </div>
  )
}

export default BillingForm;
