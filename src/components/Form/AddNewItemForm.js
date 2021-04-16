import React, { useState } from "react";
import "./Form.css";


const AddNewItemForm = (props) => {
  const [itemNameValue, setItemNameValue] = useState("");
  const [itemDescValue, setItemDescValue] = useState("");
  const [itemPriceValue, setItemPriceValue] = useState(0.00);
  const [itemDiscountValue, setItemDiscountValue] = useState(0.00);
  const [itemGSTValue, setItemGSTValue] = useState(18);
  const [itemQtyValue, setItemQtyValue] = useState(1);

  const enterItemNamePrompt = "Start typing here";
  const registerItemPrompt = "add new";

  const emptyItemNames = [enterItemNamePrompt, registerItemPrompt, ""];

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

  // set description and price
  // when item is entered
  const setItemInfo = (itemName) => {
  for (let i = 0; i <= props.savedItems.length - 1; i++) {
    const mod = props.savedItems[i].Model.toLowerCase();
    const desc = props.savedItems[i].Description;
    const price = props.savedItems[i].Price;

    if (mod === itemName) {
      setItemDescValue(desc);
      setItemPriceValue(price);
      break;
      }
    }
  }

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
            Item:
              <select
                value={itemNameValue} 
                onChange={
                  (event) => {
                    setItemNameValue(event.target.value);
                    setItemInfo(event.target.value.toLowerCase());
                  }
              }>
                <option key={enterItemNamePrompt}>{enterItemNamePrompt}</option>
                {savedItemNames.map(
                  (i) => {
                    return <option key={i}>{i}</option>
                  }
                )}
                <option key={registerItemPrompt}>{registerItemPrompt}</option>
              </select>

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
            Quantity: <input type="number" min="1" value={itemQtyValue} onChange={
              (event) => {
                setItemQtyValue(event.target.value);
              }
            } />
          </label>

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

        </div>

        <div className={"menuButtons"}>
          <input type="button" value="Placeholder1" />
          <input type="button" value="Placeholder2" />
          <input type="button" value="Placeholder3" />
          <input type="button" value="Placeholder4" />
            <input 
              type="submit" 
              value="add" 
              disabled={ emptyItemNames.includes(itemNameValue) ? "disabled" : "" }
            />
        </div>
      </form>
    </div>
  )
}

export default AddNewItemForm;
