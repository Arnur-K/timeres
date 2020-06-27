import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleUserModal } from '../../store/actions/index';
import { ReactComponent as ManWatchSvg } from '../../images/man-watch.svg';
import Button from '../UI/button/button';
import './home.scss';

const Home = ({ history, onToggleUserModal }) => {
  useEffect(() => {
    onToggleUserModal();
  }, []);

  return (
    <section className="section-home">
      <div className="section-home__text-box">
        <h1 className="section-home__title">
          <span className="section-home__span-1">
            Create, share, discuss events
          </span>
          <span className="section-home__span-2">and get its countdown!</span>
        </h1>
        <Button
          type="button"
          clicked={() => history.push('/new-event')}
          style={{
            marginTop: '4rem',
          }}
          className="button--primary"
        >
          Get started
        </Button>
      </div>
      <ManWatchSvg className="section-home__img" />
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onToggleUserModal: () => dispatch(toggleUserModal()),
});

Home.defaultProps = {
  history: null,
};

Home.propTypes = {
  onToggleUserModal: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};

export default withRouter(connect(null, mapDispatchToProps)(Home));
