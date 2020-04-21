import React from 'react';
import { connect } from 'react-redux';
import NavItem from './navItem/navItem';

const navItems = ({
  isAuthenticated,
  content,
  lang,
  listItemCn,
  linkCn,
  navCn,
  ulCn,
  activeCn,
}) => {
  let nav = null;

  let componentContent = {};
  if (content.en !== undefined && lang === 'en') {
    componentContent = {
      home: content.en.nav.home,
      myEvents: content.en.nav.myEvents,
      newEvent: content.en.nav.newEvent,
    };
  } else if (content.ru !== undefined && lang === 'ru') {
    componentContent = {
      home: content.ru.nav.home,
      myEvents: content.ru.nav.myEvents,
      newEvent: content.ru.nav.newEvent,
    };
  }

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
            {componentContent.home}
          </NavItem>
          <NavItem
            link="/new-event"
            listItemCn={listItemCn}
            linkCn={linkCn}
            activeCn={activeCn}
          >
            {componentContent.newEvent}
          </NavItem>
          <NavItem
            link="/my-events"
            listItemCn={listItemCn}
            linkCn={linkCn}
            activeCn={activeCn}
          >
            {componentContent.myEvents}
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
            {componentContent.home}
          </NavItem>
          <NavItem
            link="/new-event"
            listItemCn={listItemCn}
            linkCn={linkCn}
            activeCn={activeCn}
          >
            {componentContent.newEvent}
          </NavItem>
        </ul>
      </nav>
    );
  }

  return nav;
};

const mapStateToProps = (state) => ({
  content: state.content.content,
  lang: state.ui.lang,
});

export default connect(mapStateToProps, null)(navItems);
