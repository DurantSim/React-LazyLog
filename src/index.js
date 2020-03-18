import ReactDOM from "react-dom";
import React, { Component } from "react";
import Hello from "./Hello";

class Todo extends Component {
  render() {
    return <Hello />;
  }
}

ReactDOM.render(<Todo />, document.getElementById("root"));
