import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleUserModal } from "../../../store/actions/index";
import UserPopup from "../../UI/userPopup/userPopup";
import NavBar from "../../navigation/navBar/navBar";
import Loader from "../../UI/loader/loader";

class Layout extends React.Component {
   render() {
      const { showUserModal, isAuthenticated, onToggleUserModal, showLoader } = this.props;

      if (showLoader) return <Loader />;
      else
         return (
            <>
               <NavBar clicked={onToggleUserModal} isAuthenticated={this.props.isAuthenticated} />
               {showUserModal && isAuthenticated !== null && <UserPopup />}
               <main onClick={onToggleUserModal} className="main">
                  {this.props.children}
               </main>
            </>
         );
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.token,
   showUserModal: state.ui.showUserModal,
   showLoader: state.auth.showLoader
});

const mapDispatchToProps = dispatch => ({
   onToggleUserModal: isBtn => dispatch(toggleUserModal(isBtn))
});

Layout.propTypes = {
   isAuthenticated: PropTypes.string,
   showUserModal: PropTypes.bool,
   showLoader: PropTypes.bool,
   children: PropTypes.object,
   onToggleUserModal: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
