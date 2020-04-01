import React from "react";
import NavItem from "./navItem/navItem";

export default ({ isAuthenticated }) => {
  let nav = null;

  if (isAuthenticated !== null) {
    nav = (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <NavItem
            link="/"
            exact
            listItemCn="header__list-item"
            linkCn="header__link"
          >
            Home
          </NavItem>
          <NavItem
            link="/new-countdown-timer"
            listItemCn="header__list-item"
            linkCn="header__link"
          >
            New countdown timer
          </NavItem>
          <NavItem
            link="/my-countdown-timers"
            listItemCn="header__list-item"
            linkCn="header__link"
          >
            My countdown timers
          </NavItem>
        </ul>
      </nav>
    );
  } else {
    nav = (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <NavItem
            link="/"
            exact
            listItemCn="header__list-item"
            linkCn="header__link"
          >
            Home
          </NavItem>
          <NavItem
            link="/new-countdown-timer"
            listItemCn="header__list-item"
            linkCn="header__link"
          >
            New countdown timer
          </NavItem>
        </ul>
      </nav>
    );
  }

  return nav;
};
