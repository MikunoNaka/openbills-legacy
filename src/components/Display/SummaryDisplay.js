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
  let totalDiscount = 0; // to be subtracted from totalRawPrice
  let totalTax = 0;

  for (let i = 0; i < items.length; i++) {
    const itemTotalPrice = items[i].TotalPrice;
    const itemDiscount = items[i].Discount;

    totalRawPrice += itemTotalPrice;
    totalDiscount += (itemDiscount / 100) * itemTotalPrice;
    totalTax += (items[i].GST / 100) * itemTotalPrice;
  }

  // TODO: add support for calculating gst from TotalPriceAfterDiscount

  return (
    {
      "TotalRawPrice":           totalRawPrice,
      "TotalDiscountPrice":      totalDiscount,
      "TotalPriceAfterDiscount": totalRawPrice - totalDiscount,
      "TotalTaxAmount":          totalTax,
      "TotalPrice":              (totalRawPrice - totalDiscount) + totalTax,
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
    <div className={"SummaryDisplay"}>
      <p>Total raw: {summary.TotalRawPrice}</p>
      <p>Total after discount: {summary.TotalRawPrice} - {summary.TotalDiscountPrice} = {summary.TotalPriceAfterDiscount}</p>
      <p>Total tax: {summary.TotalTaxAmount}</p>
      <p>Total: {summary.TotalPriceAfterDiscount} + {summary.TotalTaxAmount} = {summary.TotalPrice}</p>
    </div>
  );
}

export default SummaryDisplay;
