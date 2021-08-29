/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, {Dispatch, SetStateAction} from "react";
import { Item } from "./../../interfaces"
import "./Display.scss";

interface props {
  items: Item[]
  setShowSubmitMenu: Dispatch<SetStateAction<boolean>>
}

interface FullSummary {
  TotalRawPrice: number // total price without gst/discount
  TotalDiscount: number // total amount of discount
  TotalGST: number // total gst to be paid
  TotalPriceAfterDiscount: number
  TotalPriceAfterGST: number
  TotalRoundedOff: number
}

const getFullSummary = (items: Item[]): FullSummary => {
  var rawPrice: number = 0;
  var totalDiscount: number = 0;
  var totalGST: number = 0;

  for (let i in items) {
    const item = items[i];
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
    TotalRawPrice:           rawPrice,
    TotalDiscount:           totalDiscount,
    TotalGST:                totalGST,
    TotalPriceAfterDiscount: totalPriceAfterDiscount,
    TotalPriceAfterGST:      totalPriceAfterGST,
    TotalRoundedOff:         totalRoundedOff
  }
}

const SummaryDisplay: React.FC<props> = (props) => {
  const summary: FullSummary = getFullSummary(props.items);
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
