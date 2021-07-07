/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import { Transport } from "./../../../interfaces"

interface Props {
  setVisibility: any // this component's visibility
}

const TransportForm: React.FC<Props> = (props) => {
  const [transporterName, setTransporterName] = useState<string>("");
  const [vehicleNum, setVehicleNum] = useState<string>("");
  const [transportMethod, setTransportMethod] = useState<string>("");
  const [transporterGSTIN, setTransporterGSTIN] = useState<string>("");
  const [builtyNumber, setBuiltyNumber] = useState<string>("");

  const hideSelf = () =>
    props.setVisibility(false);


  const closeOnBGClicked = (event: any) =>
    event.target.className === "floatingMenuBG" && hideSelf();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const newTransport: Transport = {
      Name: transporterName,
      VehicleNum: vehicleNum,
      Method: transportMethod,
      GSTIN: transporterGSTIN,
      Builty: builtyNumber
    }
    console.log(newTransport);

    hideSelf();
  }

  return (
    <div className={"floatingMenuBG"} onClick={closeOnBGClicked}>
      <form className={"smallFloatingMenu TransportForm"} onSubmit={handleSubmit}>
        <label>
          Transporter Name: <input className={"wideInputBox"} type="text" value={transporterName} onChange={
              (event) => (setTransporterName(event.target.value))
            }/>
        </label>

        <label>
          Vehicle Number: <input className={"wideInputBox"} type="text" value={vehicleNum} onChange={
              (event) => (setVehicleNum(event.target.value))
              } required />
        </label>

        <label>
          Transport Method: <input className={"wideInputBox"} type="text" value={transportMethod} onChange={
              (event) => (setTransportMethod(event.target.value))
            } required />
        </label>

        <label>
          Transporter GSTIN: <input className={"wideInputBox"} type="text" value={transporterGSTIN} onChange={
              (event) => (setTransporterGSTIN(event.target.value))
            }/>
        </label>

        <label>
          Builty Number: <input className={"wideInputBox"} type="text" value={builtyNumber} onChange={
              (event) => (setBuiltyNumber(event.target.value))
            }/>
        </label>
        
        <input type="submit" value="ok"/>
      </form>
    </div>
  );
}

export default TransportForm;
