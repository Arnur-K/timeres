import React from "react";
import { NavLink } from "react-router-dom";

export default ({
  children,
  link,
  exact,
  listItemCn,
  linkCn,
  activeClassName
}) => (
  <li className={listItemCn}>
    <NavLink to={link} exact={exact} className={linkCn}>
      {children}
    </NavLink>
  </li>
);
