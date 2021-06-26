/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import { Person } from "./../../../interfaces";
import "./../Form.scss";

import ClientInfoDisplay from "../../Display/ClientInfoDisplay";

interface Props {
  savedPeople: Person[]
}

const SelectClientForm: React.FC<Props> = (props) => {
  // TODO: fix the default selectedClient
  const [selectedClient, setSelectedClient] = useState<Person>({Name: "", Address: ""});

  const enterValuePrompt = "start typing here";
  const registerPrompt = "add new";

  // TODO: make it use email if no address found, shorten the name too
  // in short, make formatter flexible
  const formatter = (i: Person): string =>
    `${i.Name} - ${i.Address.slice(0, 20).concat(i.Address.length < 20 ? "" : "")}`;

  // TODO: if no client found at least clear the display
  // do this in other components too
  // check the client name value and do stuff accordingly
  const setClientInfo = (e: string) =>
    (props.savedPeople === null || e === registerPrompt)
      ? alert("coming soon") // toggle registerPersonPrompt visibility
      : props.savedPeople.some((i) =>
        e === formatter(i) && setSelectedClient(i))
  
  return (
    <div className={"documentInfoChild"}>
      <label>
        Client Name:
          <select
            className={"selectInputBox"}
            value={selectedClient.Name} 
            onChange={
              (event) => {
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
