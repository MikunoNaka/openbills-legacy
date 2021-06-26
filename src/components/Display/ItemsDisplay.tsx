/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import { Item } from "./../../interfaces";
import "./Display.scss";
import DisplayItem from "./DisplayItem";
// import {SummaryDisplayTR} from "./SummaryDisplay";

interface Props {
  items: Item[]
  defGSTValue: number
}

const ItemsDisplay: React.FC<Props> = (props) => {
  const items = props.items;
  // TODO: remove mutability
  let itemNumber = 0;

  return (
    <table className={"ItemsDisplay"}>
      <tbody>
        <tr className="legend">
          <th>S. Num</th>
          <th className={"leftAlign"}>Item</th>
          <th className={"leftAlign"}>Description</th>
          <th>HSN</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Discount</th>
          <th>sgst</th>
          <th>cgst</th>
          <th>igst</th>
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

      </tbody>
    </table>
  );
  // this goes right before </tbody>
        //<SummaryDisplayTR items={props.items}/>
}

export default ItemsDisplay;
