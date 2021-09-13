/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState, Dispatch, SetStateAction } from "react";
import { Transport } from "./../../../Interfaces/interfaces"

interface Props {
  setVisibility: Dispatch<SetStateAction<boolean>> // this component's visibility
  currentTransporter: Transport
  setTransporter: Dispatch<SetStateAction<Transport>>
}

const TransportForm: React.FC<Props> = (props) => {
  // read values from already existing transporter
  const [transporterName, setTransporterName] = useState<string>(props.currentTransporter.Name);
  const [vehicleNum, setVehicleNum] = useState<string>(props.currentTransporter.VehicleNum);
  const [transportMethod, setTransportMethod] = useState<string>(props.currentTransporter.Method);
  const [transporterGSTIN, setTransporterGSTIN] = useState<string>(props.currentTransporter.GSTIN);
  const [builtyNumber, setBuiltyNumber] = useState<string>(props.currentTransporter.Builty);

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
    props.setTransporter(newTransport);

    hideSelf();
  }

  return (
    <div className={"floatingMenuBG"} onClick={closeOnBGClicked}>
      <form className={"smallFloatingMenu TransportForm"} onSubmit={handleSubmit}>
        <div className={"inputs"}>
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
        </div>
        
        <div className={"menu"}>
          <input type="submit" value="ok"/>
        </div>
      </form>
    </div>
  );
}

export default TransportForm;
