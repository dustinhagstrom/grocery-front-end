import React, { Component } from "react";

function Button({ cssid, buttonName, clickFunc = () => {} }) {
  return (
    <React.Fragment>
      <button
        onClick={() => {
          clickFunc();
        }}
        id={cssid}
      >
        {buttonName}
      </button>
    </React.Fragment>
  );
}

export default Button;
