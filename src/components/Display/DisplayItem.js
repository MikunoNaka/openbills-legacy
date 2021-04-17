import React from "react";
import "./Display.css";

const DisplayItem = (props) => {
  const itemNumber = props.itemNumber;
  const item = props.item;

  return (
    <tr>
      <td>{itemNumber}</td>
      <td className={"leftAlign"}>{item.Model}</td>
      <td className={"leftAlign"}>{item.Description}</td>
      <td>{item.Quantity}</td>
      <td>{item.Price}</td>
      <td>{item.Discount}</td>
      <td>{item.GST}</td>
    </tr>
  );
}

export default DisplayItem;
