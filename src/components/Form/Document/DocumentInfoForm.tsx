/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import { Person } from "./../../../interfaces";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import "./../Form.scss";

import SelectClientForm from "./../People/SelectClientForm";


interface Props {
  savedPeople: Person[]
  invoiceNumber: number
  setInvoiceNumber: any
}

const DocumentInfoForm: React.FC<Props> = (props) => {
  const [invoiceNumber, setInvoiceNumber] = useState<number>(props.invoiceNumber);
  return (
    <div className={"DocumentInfoForm"}>
      <SelectClientForm 
        savedPeople={props.savedPeople}
      />

      <div className={"documentInfoChild"}>
        <label>
          Invoice Number:
            <span className={"buttonInput"}>
              {invoiceNumber === props.invoiceNumber ||
                <FontAwesomeIcon icon={faSync} className={"icon"} onClick={
                    (event) => {
                      event.preventDefault(); // don't select the input box
                      setInvoiceNumber(props.invoiceNumber);
                    }
                }/>
              }
              <input className={"smallInputBox"} type="number" step="0.0" value={invoiceNumber} 
                onInput={(event: React.FormEvent<HTMLInputElement>) => setInvoiceNumber(parseInt(event.currentTarget.value))} 
              required />
            </span>
        </label>

        <label>
          Invoice Date: <span>wtf do i do</span>
        </label>
      </div>

      <div className={"documentInfoChild"}>
      </div>
    </div>
  );
}

export default DocumentInfoForm;
