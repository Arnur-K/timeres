import React from 'react';
import NavItem from './navItem/navItem';

const navItems = ({
  isAuthenticated,
  listItemCn,
  linkCn,
  navCn,
  ulCn,
  activeCn,
}) => {
  let nav = null;

  if (isAuthenticated !== null) {
    nav = (
      <nav className={navCn}>
        <ul className={ulCn}>
          <NavItem
            link="/"
            exact
            listItemCn={listItemCn}
            linkCn={linkCn}
            activeCn={activeCn}
          >
            Home
          </NavItem>
          <NavItem
            link="/new-event"
            listItemCn={listItemCn}
            linkCn={linkCn}
            activeCn={activeCn}
          >
            New event
          </NavItem>
          <NavItem
            link="/my-events"
            listItemCn={listItemCn}
            linkCn={linkCn}
            activeCn={activeCn}
          >
            My events
          </NavItem>
        </ul>
      </nav>
    );
  } else {
    nav = (
      <nav className={navCn}>
        <ul className={ulCn}>
          <NavItem
            link="/"
            exact
            listItemCn={listItemCn}
            linkCn={linkCn}
            activeCn={activeCn}
          >
            Home
          </NavItem>
          <NavItem
            link="/new-event"
            listItemCn={listItemCn}
            linkCn={linkCn}
            activeCn={activeCn}
          >
            New event
          </NavItem>
        </ul>
      </nav>
    );
  }

  return nav;
};

export default navItems;
