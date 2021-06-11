/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import "./../Form.scss";

import ClientInfoDisplay from "../../Display/ClientInfoDisplay";

const SelectClientForm = (props) => {
  const [clientName, setClientName] = useState();
  const [selectedClient, setSelectedClient] = useState({});

  const enterValuePrompt = "start typing here";
  const registerPrompt = "add new";

  const formatter = (i) => {
    return `${i.Name} - ${i.Address.slice(0, 20).concat(i.Address.length < 20 ? "" : "")}`;
  }

  // check the client name value and do stuff accordingly
  const setClientInfo = (clientName) =>
    (props.savedPeople === null || clientName === registerPrompt)
      ? alert("coming soon") // toggle registerPersonPrompt visibility
      : props.savedPeople.some((i) => 
        clientName === formatter(i) && setSelectedClient(i))

  return (
    <div className={"DocumentInfoChild"}>
      <label>
        Client Name:
          <select
            className={"selectInputBox"}
            value={clientName} 
            onChange={
              (event) => {
                setClientName(event.target.value);
                setClientInfo(event.target.value);
              }
          }>
            <option key={enterValuePrompt}>{enterValuePrompt}</option>

            {props.savedPeople === null || props.savedPeople.map(
              (i) => <option key={i.ID}>{formatter(i)}</option>
            )}

            <option key={registerPrompt}>{registerPrompt}</option>
          </select>
      </label>

      <ClientInfoDisplay client={selectedClient}/>
    </div>
  )
}

export default SelectClientForm;
