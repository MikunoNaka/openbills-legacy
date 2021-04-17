import React from "react";
import "./Display.css";
import DisplayItem from "./DisplayItem";
import SummaryDisplayTR from "./SummaryDisplay";

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

      <SummaryDisplayTR items={props.items}/>
    </table>
  );
}

export default ItemsDisplay;
