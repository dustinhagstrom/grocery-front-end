import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../common/Button";

import "./GroceryList.css";

export class GroceryList extends Component {
  state = {
    canEdit: false,
    editInput: this.props.item.grocery,
  };

  componentDidUpdate() {
    let input = document.getElementById(this.props.inputID);
    if (input) {
      input.focus();
    }
  }

  handleEditOnChange = (event) => {
    this.setState({
      editInput: event.target.value,
    });
  };

  handleOnEditClick = () => {
    this.setState((prevState) => {
      return {
        canEdit: !prevState.canEdit,
      };
    });
  };

  handleOnSubmitClick = (_id) => {
    this.handleOnEditClick();

    this.props.handleEditByID(_id, this.state.editInput);
  };

  render() {
    const { grocery, purchased, _id } = this.props.item;
    const { handlePurchasedByID, handleDeleteByID, inputID } = this.props;
    const { canEdit, editInput } = this.state;
    return (
      <tbody className="the-list">
        <tr>
          {canEdit ? (
            <td>
              <input
                type="text"
                name="editInput"
                value={editInput}
                onChange={this.handleEditOnChange}
                id={inputID}
              />
            </td>
          ) : (
            <td className={`${purchased && "td-purchased"}`}>{grocery}</td>
          )}
          {canEdit ? (
            <td>
              <Button
                buttonName="Submit"
                clickFunc={() => {
                  this.handleOnSubmitClick(_id);
                }}
              />
            </td>
          ) : (
            <td>
              <Button
                buttonName="Edit"
                clickFunc={() => {
                  this.handleOnEditClick(_id);
                }}
              />
            </td>
          )}
          <td>
            <Button
              buttonName="Purchased"
              clickFunc={() => handlePurchasedByID(_id, purchased)}
            />
          </td>
          <td>
            <Button
              buttonName="Delete"
              clickFunc={() => handleDeleteByID(_id)}
            />
          </td>
        </tr>
      </tbody>
    );
  }
}

GroceryList.propTypes = {
  item: PropTypes.object.isRequired,
  handleDeleteByID: PropTypes.func.isRequired,
  handleEditByID: PropTypes.func.isRequired,
  handlePurchasedByID: PropTypes.func.isRequired,
};

export default GroceryList;
