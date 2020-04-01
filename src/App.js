import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions/index";
import Layout from "./components/hoc/layout/Layout";
import EventForm from "./containers/eventForm/EventForm";
import UserCountdownTimers from "./containers/userCountdownTimers/UserCountdowmTimers";
import Auth from "./containers/auth/Auth";
import Signout from "./containers/auth/Signout";
import Home from "./components/home/home";
import UserAccount from "./containers/userAccount/UserAccount";
import NotFound from "./components/notFound/notFound";
import Loader from "./components/UI/loader/loader";

class App extends React.Component {
   componentDidMount() {
      this.props.onTryAutoSignUp();
   }

   render() {
      let content = null;
      const { isAuthenticated } = this.props;

      if (isAuthenticated !== null) {
         content = (
            <Switch>
               <Route
                  path="/new-countdown-timer"
                  component={() => (
                     <section>
                        <EventForm />
                     </section>
                  )}
               />
               <Route path="/my-countdown-timers" component={UserCountdownTimers} />
               <Route path="/user-account" component={UserAccount} />
               <Route path="/sign-out" component={Signout} />
               <Route path="/" exact component={Home} />
               <Route path="*" exact component={NotFound} />
            </Switch>
         );
      } else {
         content = (
            <Switch>
               <Route path="/new-countdown-timer" component={EventForm} />
               <Route path="/sign-in" component={() => <Auth signUp={false} />} />
               <Route path="/sign-up" component={() => <Auth signUp={true} />} />
               <Route path="/" exact component={Home} />
               <Route path="*" exact component={NotFound} />
            </Switch>
         );
      }

      return <Layout>{content}</Layout>;
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.token
});

const mapDispatchToProps = dispatch => ({
   onTryAutoSignUp: () => dispatch(authCheckState())
});

App.propTypes = {
   onTryAutoSignUp: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.string
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
