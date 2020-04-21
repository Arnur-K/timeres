import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const button = ({ type, clicked, disabled, style, className, children }) =>
  type === 'button' ? (
    <button
      type="button"
      onClick={clicked}
      disabled={disabled}
      style={style}
      className={`button ${className}`}
    >
      {children}
    </button>
  ) : (
    <button
      type="submit"
      disabled={disabled}
      style={style}
      className={`button ${className}`}
    >
      {children}
    </button>
  );

button.defaultProps = {
  disabled: false,
  style: null,
  clicked: null,
};

button.propTypes = {
  type: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string.isRequired,
};

export default button;
