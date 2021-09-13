/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import { Item } from "./../../Interfaces/interfaces";
import "./Display.scss";

interface Props {
  defGSTValue: number
  itemNumber: number
  item: Item
}

const DisplayItem: React.FC<Props> = (props) => {
  const itemNumber = props.itemNumber;
  const item = props.item;

  return (
    <tr>
      <td>{itemNumber}</td>
      <td className={"leftAlign"}>{item.Model}</td>

      <td className={
        // disable if no description
        // and left align
        item.Description === "" ? "leftAlign disabledBorder" : "leftAlign"
      }>
        {item.Description}
      </td>

      <td>{item.HSN}</td>
      <td>{item.Quantity}</td>
      <td>{item.UnitPrice}</td>

      <td className={
        // check if discount is zero
        item.Discount === 0 ? "disabledBorder hideContents" : ""
      }>
        <span className="multiValue">
          <span>{item.DiscountValue}</span>
          <span>({item.Discount}%)</span>
        </span>
      </td>

      <td className={ // check if GST is zero or more than default
        item.TotalGSTValue === 0 ? "disabledBorder" : 
        (item.TotalGST === props.defGSTValue ? "" : "warningBorder")
      }>
        <span className="multiValue">
          <span>{item.TotalGSTValue}</span>
          <span>({item.TotalGST}%)</span>
        </span>
      </td>

      <td>
        {(item.TotalValue + (item.TotalGSTValue - item.DiscountValue)).toFixed(2)}
      </td>
    </tr>
  );
}

export default DisplayItem;
