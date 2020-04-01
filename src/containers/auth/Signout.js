import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authSignout } from "../../store/actions/index";

class Signout extends React.Component {
  componentDidMount() {
    this.props.onSignout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  onSignout: () => dispatch(authSignout())
});

export default connect(null, mapDispatchToProps)(Signout);
