import React from "react";

export const VisibilityControl = props => {
  return (
    <div className="">
      <input
        type="checkbox"
        className=""
        checked={props.isChecked}
        onChange={ e => props.callback(e.target.checked)}
      />
      <label >
        Show { props.description }
      </label>
    </div>
  );
};