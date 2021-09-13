/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { useState } from "react";
import NewAddressPane from "./../Address/NewAddressPane"
import { Person, Address } from "./../../../Interfaces/interfaces"
import { DummyAddress } from "../../../Interfaces/dummies";
import axios from "axios";
import "./../Form.scss";

interface props {
  setVisibility: any // this component's visibility
  updatePeopleList: any
}

const RegisterPersonForm: React.FC<props> = (props) => {
  const [newPersonName, setNewPersonName] = useState<string>("");
  const [newPersonPhone, setNewPersonPhone] = useState<string>("");
  const [newPersonEmail, setNewPersonEmail] = useState<string>("");

  const [newPersonBillAddress, setNewPersonBillAddress] = useState<Address>(DummyAddress);

  const [shipToBillAddress, setShipToBillAddress] = useState<boolean>(true);


  const hideSelf = () => props.setVisibility(false);

  const closeOnBGClicked = (event: any) => 
    event.target.className === "floatingMenuBG" && hideSelf();

  const postForm = (event: any) => {
    event.preventDefault();

    const newClient: Person =  {
      Name: newPersonName,
      Phone: newPersonPhone,
      Email: newPersonEmail,

      BillAddress: newPersonBillAddress,
      ShipAddress: shipToBillAddress 
        ? newPersonBillAddress 
        // TODO: use shipping address(es) instead
        : newPersonBillAddress,
    }

    // TODO: show confirmation before being invisible
    // TODO: Implement overwrite protection
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

              <NewAddressPane heading={"Billing Address"} address={newPersonBillAddress} setAddress={setNewPersonBillAddress}/>

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
