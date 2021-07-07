/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
//import "./../Form.scss";

interface Props {
  setShowTransportForm: any
}

const InvoiceInfoMenu: React.FC<Props> = (props) => {
  return (
    <>
      <div className={"InvoiceInfoMenu"}>
        <input type="button" value="Add Transport Labels" onClick={() => props.setShowTransportForm(true)}/>
      </div>
    </>
  );
}

export default InvoiceInfoMenu;
