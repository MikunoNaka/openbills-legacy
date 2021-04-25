import React from "react";
import "./Display.css";

const getBasicSummary = (items) => {
  let totalRawPrice = 0;
  let totalQuantity = 0;

  for (let i = 0; i < items.length; i++) {
    totalRawPrice += items[i].TotalPrice;
    totalQuantity += items[i].Quantity
  }

  return (
    {
      "TotalRawPrice": totalRawPrice,
      "TotalQuantity": totalQuantity
    }
  );
}

const getFullSummary = (items) => {
  let totalRawPrice = 0;
  let totalDiscountPrice = 0; // to be subtracted from totalRawPrice

  for (let i = 0; i < items.length; i++) {
    const itemTotalPrice = items[i].TotalPrice;
    const itemDiscount = items[i].Discount;

    totalRawPrice += itemTotalPrice;
    totalDiscountPrice += (itemDiscount / 100) * itemTotalPrice;
  }

  // TODO: add support for calculating gst from TotalPriceAfterDiscount

  return (
    {
      "TotalRawPrice":           totalRawPrice,
      "TotalPriceAfterDiscount": totalRawPrice - totalDiscountPrice
    }
  );
}

export const SummaryDisplayTR = (props) => {
  const summary = getBasicSummary(props.items);

  return (
    <tr className={"SummaryDisplayTR"}>
      <td>Total</td>
      <td className={"disabledBorder"}></td>
      <td className={"disabledBorder"}></td>
      <td>{summary.TotalQuantity}</td>
      <td className={"disabledBorder"}></td>
      <td className={"disabledBorder"}></td>
      <td className={"disabledBorder"}></td>
      <td>{summary.TotalRawPrice}</td>
    </tr>
  );
}

const SummaryDisplay = (props) => {
  const summary = getFullSummary(props.items);

  return (
    <>
      <p>Total: {summary.TotalRawPrice}</p>
      <p>Total after discount: {summary.TotalPriceAfterDiscount}</p>
    </>
  );
}

export default SummaryDisplay;
