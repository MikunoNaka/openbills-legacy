/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import { Person } from "./../../Interfaces/interfaces";
import "./Display.scss";

interface Props {
  client: Person
}

const ClientInfoDisplay: React.FC<Props> = (props) => {
  return (
    <table className={"ClientInfoDisplay"}>
      <tbody>
        <tr>
          <td>Client Name:</td> 
          <td>{props.client.Name}</td>
        </tr>
        <tr>
          <td>Client Address:</td>
          <td>{props.client.Address}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ClientInfoDisplay;
