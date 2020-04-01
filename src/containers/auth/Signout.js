import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authSignout } from "../../store/actions/index";
import { _auth } from "../../store/firebase/firebase";

class Signout extends React.Component {
   componentDidMount() {
      this.props.onSignout();
      _auth()
         .signOut()
         .then(() => {
            console.log("Signed out successfully");
         })
         .catch(error => console.error(error));
   }

   render() {
      return <Redirect to="/" />;
   }
}

const mapDispatchToProps = dispatch => ({
   onSignout: () => dispatch(authSignout())
});

export default connect(null, mapDispatchToProps)(Signout);
