import React, { Component } from "react";

import "./GroceryList.css";

export class GroceryList extends Component {
  render() {
    const { grocery } = this.props.item;
    return (
      <tr className="the-list">
        <td>{grocery}</td>
        <td>
          <button>Edit</button>
        </td>
        <td>
          <button>Done</button>
        </td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
    );
  }
}

export default GroceryList;
