import React from "react";
import "./Display.css";

const DisplayItem = (props) => {
  const itemNumber = props.itemNumber;
  const item = props.item;
  // const ID = props.ID;
  // const name = props.Model;
  // const desc = props.Description;
  // const QTY = props.Quantity;
  // const price = props.Price;
  // const discount = props.Discount;
  // const GST = props.GST;

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
  /*return (
    <ul className={"DisplayItem"}>
      <li className={"num"}>{itemNumber}</li>

      <li className={"text"}>{item.Model}</li>
      <li className={"text"}>{item.Description}</li>
      <li className={"num"}>{item.Quantity}</li>
      <li className={"num"}>{item.Price}</li>
      <li className={"num"}>{item.Discount}</li>
      <li className={"num"}>{item.GST}</li>
    </ul>
  );*/
}

export default DisplayItem;
