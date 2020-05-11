import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { connect } from 'react-redux';
import { authCheckState, getData } from './store/actions/index';
// containers
import Layout from './containers/layout/Layout';
import EventForm from './containers/eventForm/EventForm';
import UserEvents from './containers/userEvents/UserEvents';
import Auth from './containers/auth/Auth';
import Signout from './containers/auth/signout';
import UserAccount from './containers/userAccount/UserAccount';
// components
import Home from './components/home/home';
import NotFound from './components/notFound/notFound';
import './app.scss';

class App extends React.Component {
  componentDidMount() {
    const { onTryAutoSignUp } = this.props;
    onTryAutoSignUp();
  }

  componentDidUpdate() {
    const { onGetData, userId } = this.props;
    onGetData(userId);
  }

  render() {
    let content = null;
    const { isAuthenticated, location } = this.props;

    const pageVariants = {
      initial: {
        opacity: 0,
        x: '-100vw',
      },
      in: {
        opacity: 1,
        x: 0,
      },
      out: {
        opacity: 0,
        x: '100vw',
      },
    };

    const pageTransition = {
      type: 'tween',
      ease: 'anticipate',
      duration: 1,
    };

    if (isAuthenticated !== null) {
      content = (
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route
              path="/new-event"
              component={() => (
                <motion.section
                  className="component-new-event"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <EventForm />
                </motion.section>
              )}
            />
            <Route
              path="/my-events"
              component={() => (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="component-user-events"
                >
                  <UserEvents />
                </motion.div>
              )}
            />
            <Route
              path="/user-account"
              component={() => (
                <motion.div
                  className="component"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <UserAccount />
                </motion.div>
              )}
            />
            <Route path="/sign-out" component={Signout} />
            <Route
              path="/"
              exact
              component={() => (
                <motion.div
                  className="component"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              )}
            />
            <Route
              path="*"
              exact
              component={() => (
                <motion.div
                  className="component"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <NotFound />
                </motion.div>
              )}
            />
          </Switch>
        </AnimatePresence>
      );
    } else {
      content = (
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route
              path="/new-event"
              component={() => (
                <motion.section
                  className="component-new-event"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <EventForm />
                </motion.section>
              )}
            />
            <Route
              path="/sign-in"
              component={() => (
                <motion.div
                  className="component"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Auth signIn />
                </motion.div>
              )}
            />
            <Route
              path="/sign-up"
              component={() => (
                <motion.div
                  className="component"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Auth signUp />
                </motion.div>
              )}
            />
            <Route
              path="/"
              exact
              component={() => (
                <motion.div
                  className="component"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              )}
            />
            <Route
              path="*"
              exact
              component={() => (
                <motion.div
                  className="component"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <NotFound />
                </motion.div>
              )}
            />
          </Switch>
        </AnimatePresence>
      );
    }

    return <Layout>{content}</Layout>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token,
  userId: state.auth.user !== null ? state.auth.user.uid : null,
});

const mapDispatchToProps = (dispatch) => ({
  onGetData: (userId) => dispatch(getData(userId)),
  onTryAutoSignUp: () => dispatch(authCheckState()),
});

App.defaultProps = {
  isAuthenticated: null,
  userId: null,
};

App.propTypes = {
  onTryAutoSignUp: PropTypes.func.isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  isAuthenticated: PropTypes.string,
  userId: PropTypes.string,
  onGetData: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
