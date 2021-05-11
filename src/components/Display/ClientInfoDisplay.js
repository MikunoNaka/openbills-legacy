/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import "./Display.scss";

const ClientInfoDisplay = (props) => {
  return (
    <div>
      Client Name: {props.client.Name}
    </div>
  );
}

export default ClientInfoDisplay;
