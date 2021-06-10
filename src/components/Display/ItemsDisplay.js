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
  // TODO: remove mutability
  let itemNumber = 0;

  // TODO: Add HSN Support

  return (
    <table className={"ItemsDisplay"}>
      <tbody>
        <tr className="legend">
          <th>S. Num</th>
          <th className={"leftAlign"}>Item</th>
          <th className={"leftAlign"}>Description</th>
          <th>Quantity(NOS)</th>
          <th>Discount(%)</th>
          <th>sgst(%)</th>
          <th>cgst(%)</th>
          <th>igst(%)</th>
          <th>HSN</th>
          <th>Price</th>
        </tr>

        {items.map( 
          (item) => {
            itemNumber++
            return (
              <DisplayItem key={itemNumber} itemNumber={itemNumber} item={item} defGSTValue={props.defGSTValue}/>
            );
          }
        )}

        <SummaryDisplayTR items={props.items}/>
      </tbody>
    </table>
  );
}

export default ItemsDisplay;
