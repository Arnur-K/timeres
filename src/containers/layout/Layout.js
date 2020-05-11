import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleUserModal } from '../../store/actions/index';
import transition025 from '../../shared/animationTransitions';
import UserPopup from '../../components/UI/userPopup/userPopup';
import NavBar from '../../components/navigation/navBar/navBar';
import Loader from '../../components/UI/loader/loader';
import Chat from '../chat/Chat';
import './layout.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChatButtonClicked: false,
    };
    this.chatButtonIconRef = React.createRef();
  }

  chatButtonClickHandler = () => {
    this.setState((prevState) => ({
      isChatButtonClicked: !prevState.isChatButtonClicked,
    }));
  };

  render() {
    const {
      showUserModal,
      isAuthenticated,
      onToggleUserModal,
      showLoader,
      history,
      children,
    } = this.props;

    const { isChatButtonClicked } = this.state;

    if (showLoader) return <Loader />;

    return (
      <>
        <NavBar clicked={onToggleUserModal} isAuthenticated={isAuthenticated} />

        <main onClick={onToggleUserModal} className="main">
          <AnimatePresence>
            {showUserModal && isAuthenticated !== null && (
              <motion.div
                transition={transition025}
                initial={{
                  opacity: 0,
                  top: '13rem',
                  right: '-10rem',
                }}
                animate={{
                  opacity: 1,
                  top: '13rem',
                  right: '5rem',
                }}
                exit={{
                  opacity: 0,
                  top: '13rem',
                  right: '-10rem',
                }}
                className="user-popup-wrapper"
              >
                <UserPopup />
              </motion.div>
            )}
          </AnimatePresence>
          {children}
        </main>

        {isAuthenticated !== null &&
          history.location.pathname !== '/user-account' && (
            <>
              <button
                type="button"
                onClick={this.chatButtonClickHandler}
                className="chat-show-button"
              >
                Chat
              </button>
              <AnimatePresence>
                {isChatButtonClicked && (
                  <motion.div
                    transition={transition025}
                    initial={{
                      opacity: 0,
                      x: '-55rem',
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: '-55rem',
                    }}
                    className="chat-wrapper"
                  >
                    <Chat clicked={this.shareButtonClickHandler} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token,
  showUserModal: state.ui.showUserModal,
  showLoader: state.auth.showLoader,
});

const mapDispatchToProps = (dispatch) => ({
  onToggleUserModal: (isBtn) => dispatch(toggleUserModal(isBtn)),
});

Layout.defaultProps = {
  isAuthenticated: null,
  showUserModal: false,
  showLoader: false,
  history: null,
};

Layout.propTypes = {
  isAuthenticated: PropTypes.string,
  showUserModal: PropTypes.bool,
  showLoader: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
  onToggleUserModal: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Layout);
