import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shallowEqual } from 'recompose';
import { Redirect, NavLink } from 'react-router-dom';
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

  componentDidMount() {
    this.contentHandler();
  }

  componentDidUpdate(prevProps) {
    const { content, lang } = this.props;

    if (!shallowEqual(prevProps.content, content) || prevProps.lang !== lang) {
      this.contentHandler();
    }
  }

  contentHandler = () => {
    const { lang, content } = this.props;

    if (content.en === undefined) return;

    const { common } = content.en.auth;
    const commonRu = content.ru.auth.common;
    let componentContent = {};

    if (lang === 'en') {
      componentContent = {
        labels: {
          email: common.labels.email,
          password: common.labels.password,
        },
        placeholders: {
          email: common.placeholders.email,
          password: common.placeholders.password,
        },
      };
    } else if (lang === 'ru') {
      componentContent = {
        labels: {
          email: commonRu.labels.email,
          password: commonRu.labels.password,
        },
        placeholders: {
          email: commonRu.placeholders.email,
          password: commonRu.placeholders.password,
        },
      };
    }

    const { controls } = this.state;

    const updatedControls = updateObject(controls, {
      email: updateObject(controls.email, {
        label: componentContent.labels.email,
        elementConfig: updateObject(controls.email.elementConfig, {
          placeholder: componentContent.placeholders.email,
        }),
      }),
      password: updateObject(controls.password, {
        label: componentContent.labels.password,
        componentContent: updateObject(controls.password.elementConfig, {
          placeholder: componentContent.placeholders.password,
        }),
      }),
    });

    this.setState({
      controls: updatedControls,
    });
  };

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

    const { signUp, error, content, lang } = this.props;

    let errorMessage = null;

    if (lang === 'ru' && error !== null) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = content.ru.auth.error.invalidEmail;
          break;
        case 'auth/invalid-password':
          errorMessage = content.ru.auth.error.invalidPassword;
          break;
        case 'auth/user-not-found':
          errorMessage = content.ru.auth.error.userNotFound;
          break;
        case 'auth/wrong-password':
          errorMessage = content.ru.auth.error.wrongPassword;
          break;
        case 'auth/too-many-requests':
          errorMessage = content.ru.auth.error.tooManyRequests;
          break;
        case 'auth/email-already-in-use':
          errorMessage = content.ru.auth.error.emailAlreadyInUse;
          break;
        default:
          errorMessage = null;
          break;
      }
    } else if (lang === 'en' && error !== null) {
      errorMessage = error.message;
    }

    let h2Content = null;
    let questionContent = null;
    let buttonContent = null;

    if (lang === 'ru' && content.ru !== undefined) {
      h2Content = signUp
        ? content.ru.auth.signUp.method
        : content.ru.auth.signIn.method;
      buttonContent = content.ru.auth.common.button;
      questionContent = signUp ? (
        <p className="section-auth__redirect-text">
          {content.ru.auth.signUp.question}
          <NavLink to="/sign-up" className="section-auth__redirect-link">
            {content.ru.auth.signIn.method}
          </NavLink>
        </p>
      ) : (
        <p className="section-auth__redirect-text">
          {content.ru.auth.signIn.question}
          <NavLink to="/sign-up" className="section-auth__redirect-link">
            {content.ru.auth.signUp.method}
          </NavLink>
        </p>
      );
    } else if (lang === 'en' && content.en !== undefined) {
      h2Content = signUp
        ? content.en.auth.signUp.method
        : content.en.auth.signIn.method;
      buttonContent = content.en.auth.common.button;
      questionContent = signUp ? (
        <p className="section-auth__redirect-text">
          {content.en.auth.signUp.question}
          <NavLink to="/sign-in" className="section-auth__redirect-link">
            {content.en.auth.signIn.method}
          </NavLink>
        </p>
      ) : (
        <p className="section-auth__redirect-text">
          {content.en.auth.signIn.question}
          <NavLink to="/sign-up" className="section-auth__redirect-link">
            {content.en.auth.signUp.method}
          </NavLink>
        </p>
      );
    }

    return (
      <section className="section-auth">
        <form onSubmit={this.formSubmitHandler} className="section-auth__form">
          <h2 className="section-auth__title">{h2Content}</h2>
          {form}
          <ErrorMesasge
            className="section-auth__error-msg"
            message={errorMessage}
          />
          <Button
            type="submit"
            className="button--primary"
            style={{
              marginTop: '4rem',
            }}
          >
            {buttonContent}
          </Button>
          <div className="section-auth__redirect-box">{questionContent}</div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  showLoader: state.auth.showLoader,
  content: state.content.content,
  lang: state.ui.lang,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, signUp) =>
    dispatch(authenticate(email, password, signUp)),
  onShowLoader: (value) => dispatch(showLoader(value)),
});

Auth.defaultProps = {
  error: null,
  content: null,
  lang: 'en',
};

Auth.propTypes = {
  error: PropTypes.objectOf(PropTypes.any),
  onAuth: PropTypes.func.isRequired,
  signUp: PropTypes.bool.isRequired,
  onShowLoader: PropTypes.func.isRequired,
  content: PropTypes.objectOf(PropTypes.any),
  lang: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
