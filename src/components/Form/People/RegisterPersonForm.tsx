/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import "./../Form.scss";
import { Person } from "./../../../interfaces"
import axios from "axios";

interface props {
  setVisibility: any // this component's visibility
  updatePeopleList: any
}

const RegisterPersonForm: React.FC<props> = (props) => {
  const [newPersonName, setNewPersonName] = useState<string>("");
  const [newPersonPhone, setNewPersonPhone] = useState<string>("");
  const [newPersonEmail, setNewPersonEmail] = useState<string>("");

  const [shipToBillAddress, setShipToBillAddress] = useState<boolean>(true);

  const [newPersonBillAddressLine, setNewPersonBillAddressLine] = useState<string>("");
  const [newPersonBillCity, setNewPersonBillCity] = useState<string>("");
  const [newPersonBillState, setNewPersonBillState] = useState<string>("");
  const [newPersonBillPINCode, setNewPersonBillPINCode] = useState<string>("");
  const [newPersonBillCountry, setNewPersonBillCountry] = useState<string>("");


  const hideSelf = () => props.setVisibility(false);

  const closeOnBGClicked = (event: any) => 
    event.target.className === "floatingMenuBG" && hideSelf();

  const postForm = (event: any) => {
    event.preventDefault();

    const newClient: Person =  {
      Name: newPersonName,
      Phone: newPersonPhone,
      Email: newPersonEmail,

      BillAddress: {
        AddressLine: newPersonBillAddressLine,
        City: newPersonBillCity,
        State: newPersonBillState,
        PINCode: newPersonBillPINCode,
        Country: newPersonBillCountry
      },

      // currently same as BillAddress
      ShipAddress: {
        AddressLine: newPersonBillAddressLine,
        City: newPersonBillCity,
        State: newPersonBillState,
        PINCode: newPersonBillPINCode,
        Country: newPersonBillCountry
      },
    }

    // TODO: show confirmation before being invisible
    // TODO: Implement override protection
    axios.post("/api/people/register", newClient)
      .then((res) => {
        console.log(res);
        props.updatePeopleList();
        hideSelf();
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong, please check the log by opening the console.")
      });
  }


  return (
    <div className={"floatingMenuBG"} onClick={closeOnBGClicked}>
      <div className={"floatingMenu"}>
        <div className={"formContainer"}>
          <form className={"floatingForm"} onSubmit={postForm}>
            <div className={"twoPaneForm"}>
              <div className={"widePane formPane"}>
                <h3>Client Details</h3>
                <div className={"inputs"}>
                  <label>
                    Name: <input className={"wideInputBox"} 
                      type="text" value={newPersonName} onChange={
                        (event) => setNewPersonName(event.target.value)
                      }
                    required />
                  </label>

                  <label>
                    Phone: <input className={"wideInputBox"} 
                      type="text" value={newPersonPhone} onChange={
                        (event) => setNewPersonPhone(event.target.value)
                      }
                    required />
                  </label>

                  <label>
                    Email: <input className={"wideInputBox"} 
                      type="text" value={newPersonEmail} onChange={
                        (event) => setNewPersonEmail(event.target.value)
                      }
                    required />
                  </label>
                </div>
              </div>

              <div className={"widePane formPane"}>
                <h3>Billing Address</h3>

                <label>
                  Address: <input className={"wideInputBox"} 
                    type="text" value={newPersonBillAddressLine} onChange={
                      (event) => setNewPersonBillAddressLine(event.target.value)
                    }
                  required />
                </label>

                <label>
                  City: <input className={"wideInputBox"} 
                    type="text" value={newPersonBillCity} onChange={
                      (event) => setNewPersonBillCity(event.target.value)
                    }
                  required />
                </label>

                <label>
                  State: <input className={"wideInputBox"} 
                    type="text" value={newPersonBillState} onChange={
                      (event) => setNewPersonBillState(event.target.value)
                    }
                  required />
                </label>

                <label>
                  PIN Code: <input className={"wideInputBox"} 
                    type="text" value={newPersonBillPINCode} onChange={
                      (event) => setNewPersonBillPINCode(event.target.value)
                    }
                  required />
                </label>

                <label>
                  Country: <input className={"wideInputBox"} 
                    type="text" value={newPersonBillCountry} onChange={
                      (event) => setNewPersonBillCountry(event.target.value)
                    }
                  required />
                </label>
              </div>

              {shipToBillAddress || // TODO: Make it store different data
                // TODO: maybe move it to its own prop
                <div className={"widePane formPane"}>
                  <h3>Shipping Address</h3>

                  <label>
                    Address: <input className={"wideInputBox"} 
                      type="text" value={newPersonBillAddressLine} onChange={
                        (event) => setNewPersonBillAddressLine(event.target.value)
                      }
                    required />
                  </label>

                  <label>
                    City: <input className={"wideInputBox"} 
                      type="text" value={newPersonBillCity} onChange={
                        (event) => setNewPersonBillCity(event.target.value)
                      }
                    required />
                  </label>

                  <label>
                    State: <input className={"wideInputBox"} 
                      type="text" value={newPersonBillState} onChange={
                        (event) => setNewPersonBillState(event.target.value)
                      }
                    required />
                  </label>

                  <label>
                    PIN Code: <input className={"wideInputBox"} 
                      type="text" value={newPersonBillPINCode} onChange={
                        (event) => setNewPersonBillPINCode(event.target.value)
                      }
                    required />
                  </label>

                  <label>
                    Country: <input className={"wideInputBox"} 
                      type="text" value={newPersonBillCountry} onChange={
                        (event) => setNewPersonBillCountry(event.target.value)
                      }
                    required />
                  </label>
                </div>
              }

              <div className={"options"}>
                <label className={"menuLabel"}>
                  <input 
                    type="radio" 
                    name={"shipToBillAddressRadio"} 
                    checked={shipToBillAddress === true}
                    onChange={() => setShipToBillAddress(true)}
                  />
                  Same shipping address as billing address 
                </label>

                <label className={"menuLabel"}>
                  <input 
                    type="radio" 
                    name={"shipToBillAddressRadio"} 
                    checked={shipToBillAddress === false}
                    onChange={() => setShipToBillAddress(false)}
                  />
                  Use different shipping address
                </label>
              </div>

              <div className={"menu"}>
                <input type="button" value="cancel" 
                onClick={() => hideSelf()} />

                <input type="submit" value="Register/Add" 
                disabled={newPersonName === "" ? true : false} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPersonForm;
