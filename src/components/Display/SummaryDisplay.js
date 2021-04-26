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
    const itemDiscount = (items[i].Discount / 100) * itemTotalPrice;

    totalRawPrice += itemTotalPrice;
    totalDiscount += itemDiscount;
    totalTax += (items[i].GST / 100) * (itemTotalPrice - itemDiscount);
  }

  const totalPriceAfterTax = (totalRawPrice - totalDiscount) + totalTax;
  const totalRoundedOff = Math.abs(totalPriceAfterTax - Math.round(totalPriceAfterTax));
  return (
    {
      "TotalRawPrice":           totalRawPrice.toFixed(2),
      "TotalDiscountPrice":      totalDiscount.toFixed(2),
      "TotalPriceAfterDiscount": (totalRawPrice - totalDiscount).toFixed(2),
      "TotalTaxAmount":          totalTax.toFixed(2),
      "TotalPriceAfterTax":      totalPriceAfterTax.toFixed(2),
      "RoundedOff":              totalRoundedOff.toFixed(2),
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
        <tr>
          <td>Base Total</td>
          <td>{summary.TotalRawPrice}</td>
        </tr>

        {true &&// summary.TotalDiscountPrice !== 0 &&
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

        {true && //summary.RoundedOff !== 0 &&
          <tr>
            <td>Rounded Off</td>
            <td>{summary.RoundedOff}</td>
          </tr>
        }

        <tr>
          <td>Grand Total</td> 
          <td>{summary.TotalPrice}</td>
        </tr>
      </table>
    </div>
  );
}

export default SummaryDisplay;
