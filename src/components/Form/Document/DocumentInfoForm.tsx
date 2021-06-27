/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React/*, { useState }*/ from "react";
import { Person } from "./../../../interfaces";
import "./../Form.scss";

import SelectClientForm from "./../People/SelectClientForm";

interface Props {
  savedPeople: Person[]
}

const DocumentInfoForm: React.FC<Props> = (props) => {
  return (
    <div className={"DocumentInfoForm"}>
      <SelectClientForm 
        savedPeople={props.savedPeople}
      />
    </div>
  );
}

export default DocumentInfoForm;
