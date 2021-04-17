import React from "react";
import "./Display.css";
import DisplayItem from "./DisplayItem";

const ItemsDisplay = (props) => {
  const items = props.items;
  let itemNumber = 0;


  return (
    <table className={"ItemsDisplay"}>
      <tr className="legend">
        <th>S. Num</th>
        <th className={"leftAlign"}>Item</th>
        <th className={"leftAlign"}>Description</th>
        <th>Quantity(NOS)</th>
        <th>Price</th>
        <th>Discount(%)</th>
        <th>GST(%)</th>
      </tr>

      {items.map( 
        (item) => {
          itemNumber++
          return (
            <DisplayItem itemNumber={itemNumber} item={item}/>
          );
        }
      )}
    </table>
  )


  /*return (
    <div className={"ItemsDisplay"}>
      <div className={"legend"}>
        <ul>
          <li className={"num"}>S. Num.</li>
          <li className={"text"}>Name</li>
          <li className={"text"}>Description</li>
          <li className={"num"}>Quantity</li>
          <li className={"num"}>Price</li>
          <li className={"num"}>Discount</li>
          <li className={"num"}>GST</li>
        </ul>
      </div>

      <div className={"items"}>
        {items.map( 
          (item) => {
            itemNumber++
            return (
              <DisplayItem itemNumber={itemNumber} item={item}/>
            );
          }
        )}
      </div>

    </div>
  );*/
}

export default ItemsDisplay;
