/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { Dispatch, SetStateAction, useState } from "react";
import "./../Form.scss";
import { Address } from "./../../../Interfaces/interfaces"

interface Props {
  heading: string
  address: Address
  setAddress: Dispatch<SetStateAction<Address>>
}

const NewAddressPane: React.FC<Props> = (props) => {
  const address = props.address;

return (
  <div className={"widePane formPane"}>
    <h3>{props.heading}</h3>

    <label>
      Address: <input className={"wideInputBox"} 
        type="text" value={address.AddressLine} onChange={
          ({target: {value}}) => props.setAddress({...address, AddressLine: value})
        }
      required />
    </label>

    <label>
      City: <input className={"wideInputBox"} 
        type="text" value={address.City} onChange={
          ({target: {value}}) => props.setAddress({...address, City: value})
        }
      required />
    </label>

    <label>
      State: <input className={"wideInputBox"} 
        type="text" value={address.State} onChange={
          ({target: {value}}) => props.setAddress({...address, State: value})
        }
      required />
    </label>

    <label>
      PIN Code: <input className={"wideInputBox"} 
        type="text" value={address.PINCode} onChange={
          ({target: {value}}) => props.setAddress({...address, PINCode: value})
        }
      required />
    </label>

    <label>
      Country: <input className={"wideInputBox"} 
        type="text" value={address.Country} onChange={
          ({target: {value}}) => props.setAddress({...address, Country: value})
        }
      required />
    </label>
  </div>
  );
}

export default NewAddressPane;
