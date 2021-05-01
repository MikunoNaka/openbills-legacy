/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import "./Display.scss";

const DisplayItem = (props) => {
  const itemNumber = props.itemNumber;
  const item = props.item;

  return (
    <tr>
      <td>{itemNumber}</td>
      <td className={"leftAlign"}>{item.Model}</td>
      <td className={item.Description === "" ? "leftAlign disabledBorder" : "leftAlign"}>{item.Description}</td>
      <td>{item.Quantity}</td>
      <td className={item.Discount === 0 ? "disabledBorder" : ""}>{item.Discount}</td>
      <td className={item.GST === props.defGSTValue ? "" : "warningBorder"}>{item.GST}</td>
      <td>{item.HSN}</td>
      <td>{item.TotalPrice}</td>
    </tr>
  );
}

export default DisplayItem;
