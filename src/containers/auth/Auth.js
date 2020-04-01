import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { auth } from "../../store/actions/index";
import { Redirect, NavLink } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";
import Input from "../../components/UI/input/input";
import Button from "../../components/UI/button/button";

class Auth extends React.Component {
   state = {
      controls: {
         email: {
            elementType: "input",
            elementConfig: {
               type: "email",
               name: "email",
               placeholder: "Email"
            },
            wrapperClassName: "input-field input-field--text",
            inputClassName: "input-field__text",
            label: "Email",
            value: "",
            validation: {
               required: true,
               isEmail: true
            },
            valid: {
               value: false,
               message: null
            },
            touched: false
         },
         password: {
            elementType: "input",
            elementConfig: {
               type: "password",
               name: "password",
               placeholder: "Password"
            },
            label: "Password",
            wrapperClassName: "input-field input-field--text",
            inputClassName: "input-field__text",
            value: "",
            validation: {
               required: true,
               minLength: 6
            },
            valid: {
               value: false,
               message: null
            },
            touched: false,
            redirect: null
         }
      }
   };

   inputChangedHandler = (event, elementId) => {
      const { controls } = this.state;
      const updatedControls = updateObject(controls, {
         [elementId]: updateObject(controls[elementId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, controls[elementId].validation),
            touched: true
         })
      });
      this.setState({
         controls: updatedControls
      });
   };

   signUpRedirect = () =>
      this.setState({
         redirect: "/sign-up"
      });

   signInRedirect = () =>
      this.setState({
         redirect: "/sign-in"
      });

   formSubmitHandler = event => {
      event.preventDefault();
      const { controls } = this.state;

      this.props.onAuth(controls.email.value, controls.password.value, this.props.signUp);
   };

   render() {
      const formElementsArray = [];
      const { controls } = this.state;

      for (let key in controls) {
         formElementsArray.push({
            id: key,
            config: controls[key]
         });
      }

      const form = formElementsArray.map(element => (
         <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            valid={element.config.valid}
            name={element.config.elementConfig.name}
            label={element.config.label}
            changed={event => this.inputChangedHandler(event, element.id)}
            wrapperClassName={element.config.wrapperClassName}
            inputClassName={element.config.inputClassName}
         />
      ));

      const redirect = this.state.redirect !== null && this.state.redirect !== undefined && (
         <Redirect to={this.state.redirect} />
      );

      const { signUp, error } = this.props;

      return (
         <section className="section-auth">
            {redirect}
            <form onSubmit={this.formSubmitHandler} className="section-auth__form">
               <h2 className="section-auth__title">{signUp ? "Sign up" : "Sign in"}</h2>
               {form}
               <p className="section-auth__error-msg">{error !== null && error.message}</p>
               <Button
                  type="submit"
                  className="button--primary"
                  style={{
                     marginTop: "4rem"
                  }}
               >
                  SUBMIT
               </Button>
               {this.props.signUp ? (
                  <div className="section-auth__redirect-box">
                     <p className="section-auth__redirect-text">
                        Already have an account?
                        <NavLink to="/sign-in" className="section-auth__redirect-link">
                           Sign in
                        </NavLink>
                     </p>
                  </div>
               ) : (
                  <div className="section-auth__redirect-box">
                     <p className="section-auth__redirect-text">
                        Don't have an account?
                        <NavLink to="/sign-up" className="section-auth__redirect-link">
                           Sign up
                        </NavLink>
                     </p>
                  </div>
               )}
            </form>
         </section>
      );
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.token,
   error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
   onAuth: (email, password, signUp) => dispatch(auth(email, password, signUp))
});

Auth.propTypes = {
   isAuthenticated: PropTypes.string,
   error: PropTypes.object,
   onAuth: PropTypes.func.isRequired,
   signUp: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
