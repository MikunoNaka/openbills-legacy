/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React/*, { useState }*/ from "react";
import "./../Form.scss";

import SelectClientForm from "./../People/SelectClientForm";


const DocumentInfoForm = (/*props*/) => {
  const savedPeople = [
    {
      ID: 1,
      Name: "one"
    },
    {
      ID: 2,
      Name: "two"
    },
    {
      ID: 3,
      Name: "three"
    },
  ]
  return (
    <div className={"DocumentInfoForm"}>
      <SelectClientForm 
        savedPeople={savedPeople}
      />
    </div>
  );
}

export default DocumentInfoForm;
