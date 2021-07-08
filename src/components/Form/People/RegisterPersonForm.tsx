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
  const [newPersonAddress, setNewPersonAddress] = useState<string>("");
  const [newPersonEmail, setNewPersonEmail] = useState<string>("");
  const [newPersonPhone, setNewPersonPhone] = useState<string>("");

  const hideSelf = () => props.setVisibility(false);

  const closeOnBGClicked = (event: any) => 
    event.target.className === "floatingMenuBG" && hideSelf();

  const postForm = (event: any) => {
    event.preventDefault();

    const newClient: Person =  {
      Name: newPersonName,
      Address: newPersonAddress,
      Phone: newPersonPhone,
      Email: newPersonEmail
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
            <div className={"wideForm"}>
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

              <label>
                Address: <input className={"wideInputBox"} 
                  type="text" value={newPersonAddress} onChange={
                    (event) => setNewPersonAddress(event.target.value)
                  }
                required />
              </label>
            </div>

            <div className={"menu"}>
              <input type="button" value="cancel" 
              onClick={() => hideSelf()} />

              <input type="submit" value="Register/Add" 
              disabled={newPersonName === "" ? true : false} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPersonForm;
