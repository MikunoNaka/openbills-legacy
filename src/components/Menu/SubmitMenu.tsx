/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React, { Dispatch, SetStateAction } from "react";
import { Transport, Item } from "./../../Interfaces/interfaces";

interface Props {
  setVisibility: Dispatch<SetStateAction<boolean>> // this component's visibility
  transporter: Transport
  items: Item[]
}

const TransportForm: React.FC<Props> = (props) => {
  const hideSelf = () =>
    props.setVisibility(false);

  const closeOnBGClicked = (event: any) =>
    event.target.className === "floatingMenuBG" && hideSelf();


  return (
    <div className={"floatingMenuBG"} onClick={closeOnBGClicked}>
      <div className={"smallFloatingMenu TransportForm"}>
      </div>
    </div>
  );
}

export default TransportForm;
