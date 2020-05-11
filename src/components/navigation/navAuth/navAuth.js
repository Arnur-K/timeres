import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavItem from '../navItems/navItem/navItem';

const NavAuth = ({
  isAuthenticated,
  clicked,
  photoURL,
  email,
  listItemCn,
  linkSignInCn,
  linkSignUpCn,
  navCn,
  ulCn,
  buttonUserCn,
  listSignUp,
  listSignIn,
  activeCn,
  clicknNone,
}) => {
  let nav = null;

  if (isAuthenticated !== null) {
    nav = (
      <nav className={navCn}>
        <ul className={ulCn}>
          <li className={listItemCn}>
            <button
              type="button"
              onClick={clicknNone ? null : () => clicked(true)}
              className={buttonUserCn}
            >
              {photoURL ? <img src={photoURL} alt="User" /> : <p>{email}</p>}
            </button>
          </li>
        </ul>
      </nav>
    );
  } else {
    nav = (
      <nav className={navCn}>
        <ul className={ulCn}>
          <NavItem
            link="/sign-in"
            listItemCn={listSignIn}
            linkCn={linkSignInCn}
            activeCn={activeCn}
          >
            Sign in
          </NavItem>
          <NavItem
            link="/sign-up"
            listItemCn={listSignUp}
            linkCn={linkSignUpCn}
            activeCn={activeCn}
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
  photoURL: state.auth.user && state.auth.user.photoURL,
  email: state.auth.user && state.auth.user.email,
});

NavAuth.propTypes = {
  isAuthenticated: PropTypes.string,
  photoURL: PropTypes.string,
  clicked: PropTypes.func,
};

export default connect(mapStateToProps, null)(NavAuth);
