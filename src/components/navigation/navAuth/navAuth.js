import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavItem from '../navItems/navItem/navItem';
import { toggleLanguage } from '../../../store/actions/ui';

const NavAuth = ({
  isAuthenticated,
  clicked,
  photoURL,
  onToggleLanguage,
  content,
  lang,
  listItemCn,
  linkSignInCn,
  linkSignUpCn,
  navCn,
  ulCn,
  buttonRuCn,
  buttonEnCn,
  buttonUserCn,
  listSignUp,
  listSignIn,
  activeCn,
  clicknNone,
}) => {
  let nav = null;
  let componentContent = {};

  if (content.en !== undefined && lang === 'en') {
    componentContent = {
      signIn: content.en.nav.signIn,
      signUp: content.en.nav.signUp,
    };
  } else if (content.ru !== undefined && lang === 'ru') {
    componentContent = {
      signIn: content.ru.nav.signIn,
      signUp: content.ru.nav.signUp,
    };
  }

  const langButtonClick = useCallback((lang) => {
    onToggleLanguage(lang);
  }, []);

  if (isAuthenticated !== null) {
    nav = (
      <nav className={navCn}>
        <ul className={ulCn}>
          <li className={listItemCn}>
            <button
              type="button"
              onClick={() => langButtonClick('ru')}
              className={buttonRuCn}
            >
              RU
            </button>
          </li>
          <li className={listItemCn}>
            <button
              type="button"
              onClick={() => langButtonClick('en')}
              className={buttonEnCn}
            >
              EN
            </button>
          </li>

          <li className={listItemCn}>
            <button
              type="button"
              onClick={clicknNone ? null : () => clicked(true)}
              className={buttonUserCn}
            >
              {photoURL !== null && <img src={photoURL} alt="User" />}
            </button>
          </li>
        </ul>
      </nav>
    );
  } else {
    nav = (
      <nav className={navCn}>
        <ul className={ulCn}>
          <li className={listItemCn}>
            <button
              type="button"
              onClick={() => langButtonClick('ru')}
              className={buttonRuCn}
            >
              RU
            </button>
          </li>
          <li className={listItemCn}>
            <button
              type="button"
              onClick={() => langButtonClick('en')}
              className={buttonEnCn}
            >
              EN
            </button>
          </li>
          <NavItem
            link="/sign-in"
            listItemCn={listSignIn}
            linkCn={linkSignInCn}
            activeCn={activeCn}
          >
            {componentContent.signIn}
          </NavItem>
          <NavItem
            link="/sign-up"
            listItemCn={listSignUp}
            linkCn={linkSignUpCn}
            activeCn={activeCn}
          >
            {componentContent.signUp}
          </NavItem>
        </ul>
      </nav>
    );
  }
  return nav;
};

const mapStateToProps = (state) => ({
  photoURL: state.auth.user !== null ? state.auth.user.photoURL : null,
  content: state.content.content,
  lang: state.ui.lang,
});

const mapDispatchToProps = (dispatch) => ({
  onToggleLanguage: (lang) => dispatch(toggleLanguage(lang)),
});

NavAuth.propTypes = {
  isAuthenticated: PropTypes.string,
  photoURL: PropTypes.string,
  clicked: PropTypes.func,
  onToggleLanguage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavAuth);
