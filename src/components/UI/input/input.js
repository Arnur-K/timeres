import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

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
  let componentInputClassName = inputClassName;

  if (valid && !valid.value && shouldValidate && touched) {
    componentInputClassName += ' invalid';
  }

  return (
    <div className={wrapperClassName}>
      <label htmlFor={name} className="input-field__label">
        {label}
      </label>
      <input
        {...elementConfig}
        value={value}
        onChange={changed}
        disabled={disabled}
        className={componentInputClassName}
      />
    </div>
  );
};

input.defaultProps = {
  valid: false,
  shouldValidate: {},
  touched: false,
  value: '',
  disabled: false,
};

input.propTypes = {
  inputClassName: PropTypes.string.isRequired,
  valid: PropTypes.objectOf(PropTypes.any),
  shouldValidate: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.bool,
  wrapperClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  elementConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  value: PropTypes.string,
  changed: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default input;
