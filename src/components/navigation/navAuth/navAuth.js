import React from 'react';
import NavItem from '../navItems/navItem/navItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const navAuth = ({ isAuthenticated, clicked, photoURL }) => {
  let nav = null;

  if (isAuthenticated !== null) {
    nav = (
      <nav className="header__nav">
        <button onClick={() => clicked(true)} className="header__user">
          {photoURL !== null ? (
            <img src={photoURL} alt="User" />
          ) : (
            <i className="fas fa-user-alt"></i>
          )}
        </button>
      </nav>
    );
  } else {
    nav = (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <NavItem
            link="/sign-in"
            listItemCn="header__list-item-auth"
            linkCn="header__link-sign-in"
          >
            Sign in
          </NavItem>
          <NavItem
            link="/sign-up"
            listItemCn="header__list-item-auth"
            linkCn="header__link-sign-up"
          >
            Sign up
          </NavItem>
        </ul>
      </nav>
    );
  }

  return nav;
};

const mapStateToProps = (state) => ({
  photoURL: state.auth.user !== null ? state.auth.user.photoURL : null,
});

navAuth.propTypes = {
  isAuthenticated: PropTypes.string,
  photoURL: PropTypes.string,
  clicked: PropTypes.func,
};

export default connect(mapStateToProps, null)(navAuth);
