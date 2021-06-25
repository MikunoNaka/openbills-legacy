/*
 * OpenBills - Self hosted browser app to generate and keep track of simple invoices
 * Version - 0
 * Licensed under the MIT license - https://opensource.org/licenses/MIT
 *
 * Copyright (c) 2021 Vidhu Kant Sharma
*/

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header/Header";
import HomePage from "./Pages/HomePage";
import BillingPage from "./Pages/BillingPage";

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Header/>
      <div className={"root-content"}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/BillingPage" component={BillingPage}/>
          <Route path="/" render={() => <div>404</div>}/>
        </Switch>
      </div>
    </BrowserRouter>
  </>
);

export default App;
