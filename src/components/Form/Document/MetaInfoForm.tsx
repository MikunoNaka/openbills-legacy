/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import "./../Form.scss";

interface Transport {
  name:       string,
  vehicleNum: string, 
  method:     string, // shipment method
  gstin:      string,
  builty:     string // goods receipt
}

const MetaInfoForm: React.FC = () => {
  // don't push it to github!
  const sampleTransport: Transport = {
    name: "Own Vehicle",
    vehicleNum: "HR61C9220",
    method: "By Road",
    gstin: "",
    builty: ""
  }
  console.log(sampleTransport);
  return (
    <div className={"MetaInfoForm"}>
      <form>
      </form>
    </div>
  );
}

export default MetaInfoForm;
