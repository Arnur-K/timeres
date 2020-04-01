import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavItem from '../../navigation/navItems/navItem/navItem';

const userPopup = ({ photoURL, displayName, email }) => {
  return (
    <div className="user-popup">
      {photoURL !== null ? (
        <img src={photoURL} alt="User" className="user-popup__user-photo" />
      ) : (
        <i className="fas fa-user-alt user-popup__user-icon"></i>
      )}

      <div className="user-popup__text-box">
        <p className="user-popup__name">{displayName}</p>
        <p className="user-popup__email">{email}</p>
      </div>
      <nav className="user-popup__nav">
        <NavItem link="/user-account" listItemCn="user-popup__list" linkCn="user-popup__link">
          Manage your account
        </NavItem>
        <NavItem
          link="/sign-out"
          listItemCn="user-popup__list--sign-out"
          linkCn="user-popup__link--sign-out"
          listCn
        >
          Sign-out
        </NavItem>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photoURL: state.auth.user !== null ? state.auth.user.photoURL : null,
  displayName: state.auth.user !== null ? state.auth.user.displayName : null,
  email: state.auth.user !== null ? state.auth.user.email : null,
});

userPopup.propTypes = {
  photoURL: PropTypes.string,
};

export default connect(mapStateToProps, null)(userPopup);
