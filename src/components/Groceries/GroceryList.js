import React, { Component } from "react";

import "./GroceryList.css";

export class GroceryList extends Component {
  render() {
    const { grocery } = this.props.item;
    return (
      <div>
        <li>{grocery}</li>
      </div>
    );
  }
}

export default GroceryList;
