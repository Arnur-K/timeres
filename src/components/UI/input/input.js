import React from 'react';
import PropTypes, { any } from 'prop-types';

const input = ({
  inputClassName,
  valid,
  shouldValidate,
  touched,
  wrapperClassName,
  name,
  label,
  elementConfig,
  value,
  changed,
  disabled,
}) => {
  let _inputClassName = inputClassName;

  if (valid && !valid.value && shouldValidate && touched) {
    _inputClassName += ' invalid';
  }

  return (
    <div className={wrapperClassName}>
      <label htmlFor={name}>{label}</label>
      <input
        {...elementConfig}
        value={value}
        onChange={changed}
        disabled={disabled}
        className={_inputClassName}
      />
    </div>
  );
};

input.propTypes = {
  inputClassName: PropTypes.string.isRequired,
  valid: any, // CHANGE IT
  shouldValidate: PropTypes.object,
  touched: PropTypes.bool,
  wrapperClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string,
  changed: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default input;
