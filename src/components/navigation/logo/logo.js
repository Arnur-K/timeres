import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <NavLink to="/" className="header__logo-text" activeClassName="">
    TIMERES
  </NavLink>
);
