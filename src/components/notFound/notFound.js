import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const notFound = (props) => {
  const pathname = props.history.location.pathname;
  let content = <h1>404</h1>;

  switch (pathname) {
    case '/sign-in':
      content = <h1>You're succesfully signed in! Redirecting...</h1>;
      props.history.push('/new-countdown-timer');
      break;
    case '/sign-up':
      content = (
        <section className="section-not-found">
          <h1 className="section-not-found__title">
            You're succesfully signed in!
            <span className="section-not-found__subtitle">
              Email verification link has been sent to{' '}
              <span className="section-not-found__email">{props.user.email}</span>
            </span>
          </h1>
          <NavLink to="user-account" className="section-not-found__link">
            Manage your account
          </NavLink>
        </section>
      );
      break;
    default:
      return content;
  }

  return content;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(notFound);
