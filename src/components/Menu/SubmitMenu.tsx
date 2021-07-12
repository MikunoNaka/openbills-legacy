/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState, Dispatch, SetStateAction } from "react";
import { PDFViewer } from '@react-pdf/renderer';
import PrintableDoc from "./../Print/PrintableDoc";

interface Props {
  setVisibility: Dispatch<SetStateAction<boolean>> // this component's visibility
}

const TransportForm: React.FC<Props> = (props) => {
  const [showPDF, setShowPDF] = useState<boolean>(false);
  const hideSelf = () =>
    props.setVisibility(false);

  const closeOnBGClicked = (event: any) =>
    event.target.className === "floatingMenuBG" && hideSelf();

  return (
    <div className={"floatingMenuBG"} onClick={closeOnBGClicked}>
      {showPDF &&
        <PDFViewer className={"PDFViewer"}>
          <PrintableDoc/>
        </PDFViewer>
      }
      <div className={"smallFloatingMenu TransportForm"} /*onSubmit={handleSubmit}*/>
        <button onClick={() => setShowPDF(true)}>Generate PDF</button>
      </div>
    </div>
  );
}

export default TransportForm;
