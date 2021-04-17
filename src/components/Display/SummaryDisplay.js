import React from "react";
import "./Display.css";

const getSummary = (items) => {
  let totalRawPrice = 0;
  let totalQuantity = 0;

  for (let i = 0; i < items.length; i++) {
    totalRawPrice += items[i].Price;
    totalQuantity += items[i].Quantity
  }

  return (
    {
      "TotalRawPrice": totalRawPrice,
      "TotalQuantity": totalQuantity
    }
  );
}

const SummaryDisplayTR = (props) => {
  const summary = getSummary(props.items);

  return (
    <tr className={"SummaryDisplayTR"}>
      <td>Total</td>
      <td className={"disabledBorder"}></td>
      <td className={"disabledBorder"}></td>
      <td>{summary.TotalQuantity}</td>
      <td className={"disabledBorder"}></td>
      <td className={"disabledBorder"}></td>
      <td>{summary.TotalRawPrice}</td>
    </tr>
  );
}

export default SummaryDisplayTR;
