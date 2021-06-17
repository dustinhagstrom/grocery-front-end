import React, { Component } from "react";

import Header from "./components/Header/Header";
import Grocery from "./components/Groceries/Grocery";

import "./App.css";

export class App extends Component {
  render() {
    return (
      <div className="da-app">
        <Header />
        <Grocery />
      </div>
    );
  }
}

export default App;
