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
  console.log(summary)

  return (
    <tr>
      <td>Total</td>
      <td className={"altBorder"}></td>
      <td className={"altBorder"}></td>
      <td>{summary.TotalQuantity}</td>
      <td>{summary.TotalRawPrice}</td>
      <td className={"altBorder"}></td>
      <td className={"altBorder"}></td>
    </tr>
  );
}

export default SummaryDisplayTR;
