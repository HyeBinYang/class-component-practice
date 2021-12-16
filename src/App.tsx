import React, { Component } from "react";
import StateAndProps from "./components/StateAndProps";

export class App extends Component {
  render() {
    return (
      <div>
        <StateAndProps parent={"parent"} />
      </div>
    );
  }
}

export default App;
