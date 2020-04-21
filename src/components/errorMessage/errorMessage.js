import React from 'react';
import PropTypes from 'prop-types';

const errorMessage = ({ className, message }) => (
  <p className={className}>{message !== '' && message}</p>
);

errorMessage.defaultProps = {
  className: '',
  message: '',
};

errorMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
};

export default errorMessage;
