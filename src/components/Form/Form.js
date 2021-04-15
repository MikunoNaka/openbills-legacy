import React, { useState } from "react";
import "./Form.css";


const BillingForm = (props) => {
  const [itemNameValue, setItemNameValue] = useState("");
  const [itemDescValue, setItemDescValue] = useState("");
  const [itemPriceValue, setItemPriceValue] = useState(0.00);
  const [itemDiscountValue, setItemDiscountValue] = useState(0.00);
  const [itemGSTValue, setItemGSTValue] = useState(18);
  const [itemQtyValue, setItemQtyValue] = useState(1);

  // Extract the model names from savedItems
  const savedItems = props.savedItems;
  let savedItemNames = [];
  for (let i = 0; i < savedItems.length; i++) {
    savedItemNames.push(savedItems[i].Model);
  }

  const filteredItems = savedItemNames.filter(
    (item) => {
      // case insensitive
      return item.toLowerCase().includes(itemNameValue.toLowerCase());
    }
  );

  return (
    <div className={"formContainer"}>
      <form className={"addNewItemForm"} onSubmit={
        (event) => {
          event.preventDefault();
          console.log(itemNameValue, itemDescValue, itemPriceValue);
        }
      }>
        <div className={"textInputs"}>
          <label>
            Item:<input type="text" value={itemNameValue} onChange={
              (event) => {
                setItemNameValue(event.target.value);
                // set description and price value
                for (let i = 0; i <= props.savedItems.length - 1; i++) {
                  const mod = props.savedItems[i].Model;
                  const desc = props.savedItems[i].Description;
                  const price = props.savedItems[i].Price;
                  if (mod === event.target.value) {
                    setItemDescValue(desc);
                    setItemPriceValue(price);
                    break;
                  }
                }
              }
            } />
          </label>
  
          <label>
            Description:<input type="text" min="0" step="0.1" value={itemDescValue} onChange={
              (event) => {
                setItemDescValue(event.target.value);
              }
            } />
          </label>
        </div>

        <div className={"numericInputs"}>
          <label>
            Price: <input type="number" min="0" value={itemPriceValue} onChange={
              (event) => {
                setItemPriceValue(event.target.value);
              }
            } />
          </label>

          <label>
            Discount: <input type="number" min="0" value={itemDiscountValue} onChange={
              (event) => {
                setItemDiscountValue(event.target.value);
              }
            } />
          </label>

          <label>
            GST: <input type="number" min="0" value={itemGSTValue} onChange={
              (event) => {
                setItemGSTValue(event.target.value);
              }
            } />
          </label>

          <label>
            Quantity: <input type="number" min="1" value={itemQtyValue} onChange={
              (event) => {
                setItemQtyValue(event.target.value);
              }
            } />
          </label>
        </div>

        <div className={"menuButtons"}>
          <input type="submit" value="Placeholder1" />
          <input type="submit" value="Placeholder2" />
          <input type="submit" value="Placeholder3" />
          <input type="submit" value="Placeholder4" />
          <input type="submit" value="add" />
        </div>
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
