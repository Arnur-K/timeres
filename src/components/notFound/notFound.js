import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import './notFound.scss';

const NotFound = ({ email, lang, content }) => {
  const location = useLocation();
  let jsx = null;
  let componentContent = null;

  if (lang === 'en' && content.en !== undefined) {
    componentContent = {
      link: content.en.notFound.link,
      title: content.en.notFound.title,
      subtitle: content.en.notFound.subtitle,
    };
  } else if (lang === 'ru' && content.ru !== undefined) {
    componentContent = {
      link: content.ru.notFound.link,
      title: content.ru.notFound.title,
      subtitle: content.ru.notFound.subtitle,
    };
  }
  switch (location.pathname) {
    case '/sign-in':
      jsx = <h1>You are succesfully signed in! Redirecting...</h1>;
      return <Redirect to="/new-event" />;
    case '/sign-up':
      jsx = (
        <section className="section-not-found">
          <h1 className="section-not-found__title">
            {componentContent !== null && componentContent.title}
            <span className="section-not-found__subtitle">
              {componentContent !== null && componentContent.subtitle}{' '}
              <span className="section-not-found__email">{email}</span>
            </span>
          </h1>
          <NavLink to="user-account" className="section-not-found__link">
            {componentContent !== null && componentContent.link}
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
  email: state.auth.user !== null ? state.auth.user.email : null,
  lang: state.ui.lang,
  content: state.content.content,
});

NotFound.propTypes = {
  email: PropTypes.string,
  lang: PropTypes.string,
  content: PropTypes.objectOf(PropTypes.any),
};

export default connect(mapStateToProps, null)(NotFound);
