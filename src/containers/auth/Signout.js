import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authSignout } from '../../store/actions/index';
import { auth } from '../../store/firebase/firebase';

class Signout extends React.Component {
  componentDidMount() {
    const { onSignout } = this.props;

    onSignout();
    auth().signOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSignout: () => dispatch(authSignout()),
});

export default connect(null, mapDispatchToProps)(Signout);
