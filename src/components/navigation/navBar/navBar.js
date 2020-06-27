import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import transition025 from '../../../shared/animationTransitions';
import NavItem from '../navItems/navItem/navItem';
import Logo from '../logo/logo';
import NavItems from '../navItems/navItems';
import NavAuth from '../navAuth/navAuth';
import './navBar.scss';

const NavBar = ({ isAuthenticated, clicked }) => {
  const [isActive, setIsActive] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  };

  return (
    <header className="header">
      <div className="header__desktop-wrapper">
        <Logo />
        <NavItems
          isAuthenticated={isAuthenticated}
          navCn="header__nav"
          ulCn="header__nav-list"
          listItemCn="header__list-item"
          linkCn="header__link"
          activeCn="active"
        />
        <NavAuth
          clicked={clicked}
          isAuthenticated={isAuthenticated}
          buttonUserCn="header__user"
          navCn="header__nav"
          ulCn="header__nav-list"
          listItemCn="header__list-item-auth"
          listSignIn="header__list-item-sign-in"
          linkSignInCn="header__link-sign-in"
          linkSignUpCn="header__link-sign-up"
          buttonRuCn="header__button-ru"
          buttonEnCn="header__button-en"
        />

        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={
            isActive
              ? 'hamburger hamburger--spin is-active'
              : 'hamburger hamburger--spin'
          }
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          x: '100%',
        }}
        animate={isActive ? 'open' : 'closed'}
        variants={variants}
        transition={transition025}
        className="header__mobile-wrapper"
      >
        <NavAuth
          clicked={clicked}
          isAuthenticated={isAuthenticated}
          buttonUserCn="header__mobile-user"
          navCn="header__mobile-nav-auth"
          ulCn="header__mobile-nav-list-auth"
          listItemCn="header__mobile-list-item-auth"
          listSignIn="header__mobile-list-item-sign-in"
          listSignUp="header__mobile-list-item-sign-up"
          linkSignInCn="header__mobile-link-sign-in"
          linkSignUpCn="header__mobile-link-sign-up"
          buttonRuCn="header__mobile-button-ru"
          buttonEnCn="header__mobile-button-en"
          activeCn="active-yellow"
          clicknNone
        />
        <NavItems
          isAuthenticated={isAuthenticated}
          navCn="header__mobile-nav"
          ulCn="header__mobile-nav-list"
          listItemCn="header__mobile-list-item"
          linkCn="header__mobile-link"
          activeCn="active-yellow"
        />

        {isAuthenticated !== null && (
          <nav className="header__mobile-bottom-nav">
            <ul className="header__mobile-bottom-nav-list">
              <NavItem
                link="/user-account"
                listItemCn="header__mobile-bottom-nav-list-item"
                linkCn="header__mobile-bottom-nav-link"
                activeCn="active-yellow"
              >
                Mange your account
              </NavItem>
              <NavItem
                link="/sign-out"
                listItemCn="header__mobile-bottom-nav-list-item"
                linkCn="header__mobile-bottom-nav-link"
                activeCn="active-yellow"
              >
                Sign out
              </NavItem>
            </ul>
          </nav>
        )}
      </motion.div>
    </header>
  );
};

NavBar.defaultProps = {
  isAuthenticated: null,
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.string,
  clicked: PropTypes.func.isRequired,
};

export default NavBar;
