import React, { Component } from "react";
import Grocerylist from "./GroceryList";

import Button from "../common/Button";

import "./Grocery.css";
import axios from "axios";

const URL = "http://localhost:3004";

export class Grocery extends Component {
  state = {
    groceryList: [],
    groceryInput: "",
    error: null,
    errorMessage: "",
  };

  async componentDidMount() {
    try {
      let allGroceries = await axios.get(
        `${URL}/api/grocery/get-all-groceries`
      );
      this.setState({
        groceryList: allGroceries.data.payload,
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleGroceryOnChange = (event) => {
    this.setState({
      groceryInput: event.target.value,
      error: null,
      errorMessage: "",
    });
  };

  handleOnSubmit = async (event) => {
    event.preventDefault();

    if (this.state.groceryInput.length === 0) {
      this.setState({
        error: true,
        errorMessage: "Cannot enter a blank grocery item!",
      });
    } else {
      let checkIfGroceryAlreadyExists = this.state.groceryList.findIndex(
        (item) =>
          item.grocery.toLowerCase() === this.state.groceryInput.toLowerCase()
      );

      if (checkIfGroceryAlreadyExists > -1) {
        this.setState({
          error: true,
          errorMessage: "Grocery item already exists!",
        });
      } else {
        try {
          let createdGrocery = await axios.post(
            `${URL}/api/grocery/create-grocery`,
            { grocery: this.state.groceryInput }
          );
          let newArray = [
            ...this.state.groceryList,
            {
              grocery: createdGrocery.data.payload.grocery,
              _id: createdGrocery.data.payload._id, //might be an error here. plus maybe more data to manipulate
            },
          ];
          this.setState({
            groceryList: newArray,
            groceryInput: "",
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  handleEditByID = async (_id, editInput) => {
    try {
      let groceryIsEdited = await axios.put(
        `${URL}/api/grocery/update-grocery-words/${_id}`,
        { grocery: editInput }
      );
      let updatedGroceryListArray = this.state.groceryList.map((item) => {
        if (item._id === _id) {
          item.grocery = groceryIsEdited.data.payload.grocery;
        }
        return item;
      });
      this.setState({
        groceryList: updatedGroceryListArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteByID = async (_id) => {
    try {
      let deletedGrocery = await axios.delete(
        `${URL}/api/grocery/delete-grocery-by-id/${_id}`
      );

      let filteredArray = this.state.groceryList.filter(
        (item) => item._id !== deletedGrocery.data.payload._id
      );
      this.setState({
        groceryList: filteredArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handlePurchasedByID = async (_id, purchased) => {
    try {
      let groceryIsPurchasedUpdated = await axios.put(
        `${URL}/api/grocery/update-grocery-purchased/${_id}`,
        { purchased: !purchased }
      );
      let tryingToDoItArray = this.state.groceryList.map((item) => {
        if (item._id === groceryIsPurchasedUpdated.data.payload._id) {
          item.purchased = groceryIsPurchasedUpdated.data.payload.purchased;
        }
        return item;
      });
      this.setState({
        groceryList: tryingToDoItArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  sortByDate = () => {};
  sortByPurchased = () => {};

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="form-div">
          <form onSubmit={this.handleOnSubmit}>
            <input
              className="grocery-list-input"
              name="groceryInput" //match to state
              type="text"
              onChange={this.handleGroceryOnChange}
              value={this.state.groceryInput}
              autoFocus
            ></input>
            <button type="submit" className="form-button">
              Submit
            </button>
          </form>
          {this.state.error && (
            <div style={{ color: "red", fontSize: "20px" }}>
              {this.state.errorMessage}
            </div>
          )}
        </div>
        <div className="sort-buttons">
          <Button
            buttonName="Sort by date added- Oldest to Newest"
            // clickFunc={() => {this.sortByDate("")}}
          />
          <Button
            buttonName="Sort by date added- Newest to Oldest"
            // clickFunc={() => {this.sortByDate("")}}
          />
          <Button
            buttonName="Sort by Purchased"
            // clickFunc={() => {this.sortByPurchased("")}}
          />
          <Button
            buttonName="Sort by Not Purchased"
            // clickFunc={() => {this.sortByPurchased("")}}
          />
        </div>
        <table>
          {this.state.groceryList.map((item) => {
            return (
              <Grocerylist
                item={item}
                key={item._id}
                inputID={item._id}
                handleDeleteByID={this.handleDeleteByID}
                handlePurchasedByID={this.handlePurchasedByID}
                handleEditByID={this.handleEditByID}
              />
            );
          })}
        </table>
      </div>
    );
  }
}

export default Grocery;
