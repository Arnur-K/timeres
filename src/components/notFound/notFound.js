import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import './notFound.scss';

const NotFound = ({ email }) => {
  const location = useLocation();
  let jsx = null;

  switch (location.pathname) {
    case '/sign-in':
      jsx = <h1>You are succesfully signed in! Redirecting...</h1>;
      return <Redirect to="/new-event" />;
    case '/sign-up':
      jsx = (
        <section className="section-not-found">
          <h1 className="section-not-found__title">
            You&#39;re succesfully signed up!
            <span className="section-not-found__subtitle">
              Email with verifycation link has been sent to
              <span className="section-not-found__email">{email}</span>
            </span>
          </h1>
          <NavLink to="user-account" className="section-not-found__link">
            Manage your account
          </NavLink>
        </section>
      );
      break;
    default:
      jsx = <h1>404</h1>;
  }

  return jsx;
};

const mapStateToProps = (state) => ({
  email: state.auth.user ? state.auth.user.email : null,
});

NotFound.propTypes = {
  email: PropTypes.string,
};

export default connect(mapStateToProps, null)(NotFound);
