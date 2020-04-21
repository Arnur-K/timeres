import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleUserModal } from '../../store/actions/index';
import { ReactComponent as ManWatchSvg } from '../../images/man-watch.svg';
import Button from '../UI/button/button';
import './home.scss';

const Home = ({ content, history, onToggleUserModal, lang }) => {
  useEffect(() => {
    onToggleUserModal();
  }, []);

  let componentContent = {};

  if (lang === 'en' && content.en !== undefined && content !== null) {
    componentContent = {
      spanTitle1: content.en.home.spanTitle1,
      spanTitle2: content.en.home.spanTitle2,
      button: content.en.home.button,
    };
  } else if (lang === 'ru' && content.ru !== undefined && content !== null) {
    componentContent = {
      spanTitle1: content.ru.home.spanTitle1,
      spanTitle2: content.ru.home.spanTitle2,
      button: content.ru.home.button,
    };
  }

  return (
    <section className="section-home">
      <div className="section-home__text-box">
        <h1 className="section-home__title">
          <span className="section-home__span-1">
            {componentContent.spanTitle1}
          </span>
          <span className="section-home__span-2">
            {componentContent.spanTitle2}
          </span>
        </h1>
        <Button
          type="button"
          clicked={() => history.push('/new-event')}
          style={{
            marginTop: '4rem',
          }}
          className="button--primary"
        >
          {componentContent.button}
        </Button>
      </div>
      <ManWatchSvg className="section-home__img" />
    </section>
  );
};

const mapStateToProps = (state) => ({
  lang: state.ui.lang,
  content: state.content.content,
});

const mapDispatchToProps = (dispatch) => ({
  onToggleUserModal: () => dispatch(toggleUserModal()),
});

Home.defaultProps = {
  lang: 'en',
  content: {},
  history: null,
};

Home.propTypes = {
  lang: PropTypes.string,
  content: PropTypes.objectOf(PropTypes.any),
  onToggleUserModal: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
