import React from "react";
import PropTypes from "prop-types";

const button = props => (
  <div className="button-container">
    <button
      type={props.type}
      onClick={props.clicked}
      disabled={props.disabled}
      style={props.style}
      className={"button " + props.className}
    >
      {props.children}
    </button>
  </div>
);

button.propTypes = {
  type: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string.isRequired
};

export default button;
