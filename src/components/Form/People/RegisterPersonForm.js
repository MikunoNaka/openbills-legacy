/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

// TODO: Code isn't tested properly
// I'd be surprised if it < 10 bugs

// TODO: Implement override protection

import React, { useState } from "react";
import axios from "axios";
import "./../Form.scss";


const RegisterPersonForm = (props) => {
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonPhone, setNewPersonPhone] = useState("");
  const [newPersonEmail, setNewPersonEmail] = useState("");

  const hideSelf = () => props.setVisibility(false);

  const closeOnBGClicked = (event) => 
    event.target.className === "floatingMenuBG" && hideSelf();

  const postForm = (event) => {
    event.preventDefault();
    // TODO: show confirmation before being invisible
    axios.post(
      `/api/people/register/`
      + `?name=${newPersonName}`
      + `&phone=${newPersonPhone}`
      + `&email=${newPersonEmail}`
    )
      .then((res) => {
        console.log(res);
        props.setVisibility(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <div className={"floatingMenuBG"} onClick={closeOnBGClicked}>
      <div className={"floatingMenu"}>
        <div className={"formContainer"}>
          <form className={"floatingForm"} onSubmit={postForm}>
            <div className={"wideForm"}>
              <label>
                Client Name: <input className={"wideInputBox"} type="text" value={newPersonName} onChange={
                  (event) => {
                    setNewPersonName(event.target.value);
                  }
                } required />
              </label>

              <label>
                Phone: <input className={"wideInputBox"} type="text" value={newPersonPhone} onChange={
                  (event) => {
                    setNewPersonPhone(event.target.value);
                  }
                } />
              </label>

              <label>
                Email: <input className={"wideInputBox"} type="text" value={newPersonEmail} onChange={
                  (event) => {
                    setNewPersonEmail(event.target.value);
                  }
                } />
              </label>

              <input type="submit" value="submit"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPersonForm;
