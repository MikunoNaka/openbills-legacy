import React from "react";
import "./Display.css";

const ItemsDisplay = (props) => {
  const items = props.items;

  return (
    <div className={"ItemsDisplay"}>
      <ol>
        {
          items.map(
            (item) => {
              return <li key={item}>{item}</li>
            }
          )
        }
      </ol>
    </div>
  );
}

export default ItemsDisplay;
