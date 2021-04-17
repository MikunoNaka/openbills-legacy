import React from "react";
import "./Display.css";

const ItemsDisplay = (props) => {
  const items = props.items;

  return (
    <div className={"ItemsDisplay"}>
      <ol>
        {items.map( (item) => {
          return (
            <li>
              <ul>
                <li key={item.Model}>{item.Model}</li>
                <li key={item.Description}>{item.Description}</li>
                <li key={item.Quantity}>{item.Quantity}</li>
                <li key={item.Price}>{item.Price}</li>
                <li key={item.Discount}>{item.Discount}</li>
                <li key={item.GST}>{item.GST}</li>
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ItemsDisplay;
