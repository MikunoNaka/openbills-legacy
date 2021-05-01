/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import "./Display.scss";
import DisplayItem from "./DisplayItem";
import {SummaryDisplayTR} from "./SummaryDisplay";

const ItemsDisplay = (props) => {
  const items = props.items;
  let itemNumber = 0;

  // TODO: Add HSN Support

  return (
    <table className={"ItemsDisplay"}>
      <tr className="legend">
        <th>S. Num</th>
        <th className={"leftAlign"}>Item</th>
        <th className={"leftAlign"}>Description</th>
        <th>Quantity(NOS)</th>
        <th>Discount(%)</th>
        <th>GST(%)</th>
        <th>HSN</th>
        <th>Price</th>
      </tr>

      {items.map( 
        (item) => {
          itemNumber++
          return (
            <DisplayItem itemNumber={itemNumber} item={item} defGSTValue={props.defGSTValue}/>
          );
        }
      )}

      <SummaryDisplayTR items={props.items}/>
    </table>
  );
}

export default ItemsDisplay;
