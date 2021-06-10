/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import "./Display.scss";

const getBasicSummary = (items) => {
  let totalRawPrice = 0;
  let totalQuantity = 0;

  items.some((i) => {
      totalRawPrice += i.TotalPrice;
      totalQuantity += i.Quantity;
      return null;
    }
  )

  return (
    {
      "TotalRawPrice": totalRawPrice,
      "TotalQuantity": totalQuantity
    }
  );
}

// TODO: remove mutability from this function
const getFullSummary = (items) => {
  let totalRawPrice = 0;
  let totalDiscount = 0; // to be subtracted from totalRawPrice
  let totalTax = 0;

  items.some((i) => {
    const itemTotalPrice = i.TotalPrice;
    const itemDiscount = (i.Discount / 100) * itemTotalPrice;

    totalRawPrice += itemTotalPrice;
    totalDiscount += itemDiscount;
    totalTax += i.igst === "" 
      ? ((i.sgst + i.cgst) / 100) * (itemTotalPrice - itemDiscount)
      : (i.igst / 100) * (itemTotalPrice - itemDiscount);
    return null;
  })



  const totalPriceAfterTax = (totalRawPrice - totalDiscount) + totalTax;
  const totalRoundedOff = Math.abs(totalPriceAfterTax - Math.round(totalPriceAfterTax));
  return (
    {
      "TotalRawPrice":           parseFloat(totalRawPrice.toFixed(2)),
      "TotalDiscountPrice":      parseFloat(totalDiscount.toFixed(2)),
      "TotalPriceAfterDiscount": parseFloat((totalRawPrice - totalDiscount).toFixed(2)),
      "TotalTaxAmount":          parseFloat(totalTax.toFixed(2)),
      "TotalPriceAfterTax":      parseFloat(totalPriceAfterTax.toFixed(2)),
      "RoundedOff":              parseFloat(totalRoundedOff.toFixed(2)),
      "TotalPrice":              Math.round(totalPriceAfterTax)
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
      <h1>Summary</h1>
      <table>
        <tbody>
          <tr>
            <td>Base Total</td>
            <td>{summary.TotalRawPrice}</td>
          </tr>

          {summary.TotalDiscountPrice !== 0.00 &&
            <tr>
              <td>After Discount</td>
              <td>{summary.TotalPriceAfterDiscount}</td>
              <td>(-{summary.TotalDiscountPrice})</td>
            </tr>
          }

          <tr>
            <td>After Tax</td>
            <td>{summary.TotalPriceAfterTax}</td>
            <td>(+{summary.TotalTaxAmount})</td>
          </tr>

          {summary.RoundedOff !== 0.00 &&
            <tr>
              <td>Rounded Off</td>
              <td>{summary.RoundedOff}</td>
            </tr>
          }

          <tr className={"grandTotal"}>
            <td>Grand Total</td> 
            <td>{summary.TotalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SummaryDisplay;
