import React from "react";
import Header from "./Header/Header";
import BillingPage from "./BillingPage";

const App = () => {
  return (
    <>
      <Header/>
        <div className={"root-content"}>
          <BillingPage />
        </div>
    </>
  );
}

export default App;
