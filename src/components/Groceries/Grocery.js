import React, { Component } from "react";
import Grocerylist from "./GroceryList";

import "./Grocery.css";
import axios from "axios";

const URL = "http://localhost:3004";

export class Grocery extends Component {
  state = {
    groceryList: [],
    error: null,
    errorMessage: "",
  };

  async componentDidMount() {
    try {
      let allGroceries = await axios.get(
        `${URL}/api/grocery/get-all-groceries`
      );
      console.log(allGroceries.data.payload);
      this.setState({
        groceryList: allGroceries.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <div className="form-div">
          <form>
            <input
              className="grocery-input"
              name="groceryInput" //match to state
              type="text"
              autoFocus
            ></input>
            <button className="form-button">Submit</button>
          </form>
        </div>
        <div className="sort-buttons">
          <button>Sort by date added- Oldest to Newest</button>
          <button>Sort by date added- Newest to Oldest</button>
          <button>Sort by Purchased</button>
          <button>Sort by Not Purchased</button>
        </div>
        <ul>
          {this.state.groceryList.map((item) => {
            return <Grocerylist item={item} key={item._id} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Grocery;
