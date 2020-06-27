import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authenticate, showLoader } from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import ErrorMesasge from '../../components/errorMessage/errorMessage';
import './auth.scss';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            name: 'email',
            placeholder: 'Enter an email',
          },
          wrapperClassName: 'input-field input-field--text',
          inputClassName: 'input-field__text',
          label: 'Email',
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: {
            value: false,
            message: null,
          },
          touched: false,
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            name: 'password',
            placeholder: 'Enter a password',
          },
          label: 'Password',
          wrapperClassName: 'input-field input-field--text',
          inputClassName: 'input-field__text',
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: {
            value: false,
            message: null,
          },
          touched: false,
          redirect: null,
        },
      },
    };
  }

  inputChangedHandler = (event, elementId) => {
    const { controls } = this.state;
    const updatedControls = updateObject(controls, {
      [elementId]: updateObject(controls[elementId], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[elementId].validation,
        ),
        touched: true,
      }),
    });
    this.setState({
      controls: updatedControls,
    });
  };

  formSubmitHandler = (event) => {
    event.preventDefault();
    const { controls } = this.state;
    const { onAuth, signUp, onShowLoader } = this.props;

    onAuth(controls.email.value, controls.password.value, signUp);
    onShowLoader(true);
  };

  render() {
    const formElementsArray = [];
    const { controls } = this.state;

    for (const key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    const form = formElementsArray.map((element) => (
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
        changed={(event) => this.inputChangedHandler(event, element.id)}
        wrapperClassName={element.config.wrapperClassName}
        inputClassName={element.config.inputClassName}
      />
    ));

    const { signUp, error } = this.props;

    return (
      <section className="section-auth">
        <form onSubmit={this.formSubmitHandler} className="section-auth__form">
          <h2 className="section-auth__title">
            {signUp ? (
              <p className="section-auth__redirect-text">
                Already have an account?
                <NavLink to="/sign-in" className="section-auth__redirect-link">
                  Sign in
                </NavLink>
              </p>
            ) : (
                <p className="section-auth__redirect-text">
                  Don&#39;t have an account?
                  <NavLink to="/sign-up" className="section-auth__redirect-link">
                    Sign up
                </NavLink>
                </p>
              )}
          </h2>
          {form}
          <ErrorMesasge
            className="section-auth__error-msg"
            message={error && error.message}
          />
          <Button
            type="submit"
            className="button--primary"
            style={{
              marginTop: '4rem',
            }}
          >
            {signUp ? 'Sign up' : 'Sign in'}
          </Button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  showLoader: state.auth.showLoader,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, signUp) =>
    dispatch(authenticate(email, password, signUp)),
  onShowLoader: (value) => dispatch(showLoader(value)),
});

Auth.defaultProps = {
  error: null,
  signUp: null,
};

Auth.propTypes = {
  error: PropTypes.objectOf(PropTypes.any),
  onAuth: PropTypes.func.isRequired,
  signUp: PropTypes.bool,
  onShowLoader: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
