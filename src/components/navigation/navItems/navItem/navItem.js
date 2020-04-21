import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const navItem = ({ children, link, listItemCn, linkCn, activeCn }) => (
  <li className={listItemCn}>
    <NavLink to={link} exact activeClassName={activeCn} className={linkCn}>
      {children}
    </NavLink>
  </li>
);

navItem.defaultProps = {
  children: '',
  listItemCn: '',
  linkCn: '',
  activeCn: '',
};

navItem.propTypes = {
  children: PropTypes.string,
  link: PropTypes.string.isRequired,
  listItemCn: PropTypes.string,
  linkCn: PropTypes.string,
  activeCn: PropTypes.string,
};

export default navItem;
