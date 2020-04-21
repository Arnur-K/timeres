import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavItem from '../../navigation/navItems/navItem/navItem';
import './userPopup.scss';

const userPopup = ({ photoURL, displayName, email, content, lang }) => {
  return (
    <div className="user-popup">
      {photoURL !== null ? (
        <img src={photoURL} alt="User" className="user-popup__user-photo" />
      ) : (
        <i className="fas fa-user-alt user-popup__user-icon" />
      )}
      <div className="user-popup__text-box">
        <p className="user-popup__name">{displayName}</p>
        <p className="user-popup__email">{email}</p>
      </div>
      <nav className="user-popup__nav">
        <NavItem
          link="/user-account"
          listItemCn="user-popup__list"
          linkCn="user-popup__link"
        >
          {lang === 'en' && content.en !== undefined && content !== null
            ? content.en.userPopup.link1
            : content.ru.userPopup.link1}
        </NavItem>
        <NavItem
          link="/sign-out"
          listItemCn="user-popup__list--sign-out"
          linkCn="user-popup__link--sign-out"
          listCn
        >
          {lang === 'en' && content.en !== undefined && content !== null
            ? content.en.userPopup.link2
            : content.ru.userPopup.link2}
        </NavItem>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  photoURL: state.auth.user !== null ? state.auth.user.photoURL : null,
  displayName: state.auth.user !== null ? state.auth.user.displayName : null,
  email: state.auth.user !== null ? state.auth.user.email : null,
  lang: state.ui.lang,
  content: state.content.content,
});

userPopup.defaultProps = {
  displayName: '',
  email: '',
  photoURL: '',
  lang: 'en',
  content: null,
};

userPopup.propTypes = {
  displayName: PropTypes.string,
  email: PropTypes.string,
  photoURL: PropTypes.string,
  lang: PropTypes.string,
  content: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, null)(userPopup);
