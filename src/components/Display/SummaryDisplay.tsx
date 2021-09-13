/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, {Dispatch, SetStateAction} from "react";
import { Item, InvoiceSummary } from "./../../Interfaces/interfaces"
import "./Display.scss";

interface Props {
  items: Item[]
  setShowSubmitMenu: Dispatch<SetStateAction<boolean>>
}

interface PropsTR {
  items: Item[]
}

const getSummary = (items: Item[]): InvoiceSummary => {
  var rawPrice: number = 0;
  var totalDiscount: number = 0;
  var totalGST: number = 0;
  var totalQTY: number = 0;

  for (let i in items) {
    const item = items[i];
    totalQTY += item.Quantity;
    rawPrice += item.TotalValue;
    totalDiscount += item.DiscountValue;
    totalGST += item.TotalGSTValue;
  }

  const totalPriceAfterDiscount: number = rawPrice - totalDiscount;
  const totalPriceAfterGST: number = totalPriceAfterDiscount + totalGST;
  const totalRoundedOff: number = parseFloat(Math.abs(
    (totalPriceAfterGST) - Math.round(totalPriceAfterGST)
  ).toFixed(2)); // rounded off value in 0.00 format

  return {
    TotalQuantity:           totalQTY,
    TotalRawPrice:           rawPrice,
    TotalDiscount:           totalDiscount,
    TotalGST:                totalGST,
    TotalPriceAfterDiscount: totalPriceAfterDiscount,
    TotalPriceAfterGST:      totalPriceAfterGST,
    TotalRoundedOff:         totalRoundedOff
  }
}

export const SummaryDisplayTR: React.FC<PropsTR> = (props) => {
  const summary: InvoiceSummary = getSummary(props.items);

  return (
    <tr className={"SummaryDisplayTR"}>
      <td>Total</td>

      <td className={"disabledBorder"}></td>
      <td className={"disabledBorder"}></td>
      <td className={"disabledBorder"}></td>

      <td className={summary.TotalQuantity < 1 ? "disabledBorder" : ""}>
        {summary.TotalQuantity}
      </td>
      <td className={summary.TotalRawPrice < 1 ? "disabledBorder" : ""}>
        {summary.TotalRawPrice}
      </td>
      <td className={summary.TotalDiscount < 1 ? "disabledBorder" : ""}>
        {summary.TotalDiscount}
      </td>
      <td className={summary.TotalGST < 1 ? "disabledBorder" : ""}>
        {summary.TotalGST}
      </td>
      <td className={summary.TotalPriceAfterGST < 1 ? "disabledBorder" : ""}>
        {summary.TotalPriceAfterGST}
      </td>

    </tr>
  );
}

const SummaryDisplay: React.FC<Props> = (props) => {
  const summary: InvoiceSummary = getSummary(props.items);
  return (
    <div className={"SummaryDisplay"}>
      <h1>Summary</h1>
      <table>
        <tbody>
          <tr>
            <td>Base Total</td>
            <td>{summary.TotalRawPrice}</td>
          </tr>

          {summary.TotalDiscount !== 0.00 &&
            <tr>
              <td>After Discount</td>
              <td>{(summary.TotalPriceAfterDiscount).toFixed(2)}</td>
              <td>(-{summary.TotalDiscount})</td>
            </tr>
          } 

          <tr>
            <td>After Tax</td>
            <td>{(summary.TotalRawPrice + summary.TotalGST).toFixed(2)}</td>
            <td>(+{summary.TotalGST})</td>
          </tr>

          {summary.TotalRoundedOff !== 0.00 &&
            <tr> 
              <td>Rounded Off</td> 
              <td>{summary.TotalRoundedOff}</td> 
            </tr>
          }

          <tr className={"grandTotal"}>
            <td>Grand Total</td> 
            <td>{Math.round(summary.TotalRawPrice + (summary.TotalGST - summary.TotalDiscount))}</td>
          </tr>
        </tbody>
      </table>

      {props.items.length > 0 &&
        <button className={"SubmitButton"} onClick={() => props.setShowSubmitMenu(true)}>
          Submit (experimental)
        </button>
      }
    </div>
  );
}

export default SummaryDisplay;
