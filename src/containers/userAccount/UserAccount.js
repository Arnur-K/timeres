import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import firebase from 'firebase';
import transition025 from '../../shared/animationTransitions';
import { updateObject, checkValidity } from '../../shared/utility';
import { toggleUserModal } from '../../store/actions/index';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import ErrorMessage from '../../components/errorMessage/errorMessage';
import './userAccount.scss';

const classNameSuccess =
  'section-user-account__message  section-user-account__message--green';
const classNameFail =
  'section-user-account__message  section-user-account__message--red';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      controls: {
        username: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            name: 'username',
            placeholder: 'Enter an username',
          },
          value: '',
          validation: {
            minLength: 3,
          },
          touched: false,
          valid: {
            value: false,
            message: '',
          },
          label: 'Username',
          wrapperClassName: 'input-field input-fielementd--text',
          inputClassName: 'input-field__text',
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            name: 'email',
            placeholder: 'Enter an email',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          touched: false,
          valid: {
            value: false,
            message: '',
          },
          isVerified: false,
          label: 'Email',
          wrapperClassName: 'input-field input-fielementd--text',
          inputClassName: 'input-field__text',
        },
        newPassword: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            name: 'newPassword',
            placeholder: 'Enter a new password',
          },
          value: '',
          validation: {
            minLength: 6,
            required: true,
          },
          touched: false,
          valid: {
            value: false,
            message: '',
          },
          disabled: true,
          label: 'New password',
          wrapperClassName: 'input-field input-fielementd--text',
          inputClassName: 'input-field__text',
        },
      },
      currentPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'currentPassword',
          placeholder: 'Enter the current password',
        },
        value: '',
        validation: {
          minLength: 6,
          required: true,
        },
        touched: false,
        valid: {
          value: false,
          message: '',
        },
        label: 'Current password',
        wrapperClassName: 'input-field input-fielementd--text',
        inputClassName: 'input-field__text',
      },
      showCurrentPasswordForm: false,
      userSelectedPhotoSrc: '',
      formMessage: '',
      userPhotoMessage: '',
      userPhotoMessageElementClassName: '',
      usernameMessage: '',
      usernameMessageElementClassName: '',
      emailMessage: '',
      emailMessageElementClassName: '',
      newPasswordMessage: '',
      newPasswordMessageElementClassName: '',
      currentPasswordMessage: '',
      currentPasswordMessageElementClassName: '',
    };
  }

  componentDidMount() {
    const { onToggleUserModal, user } = this.props;

    onToggleUserModal();

    const { displayName, photoURL, email } = user;
    const { controls } = this.state;

    const updatedControls = updateObject(controls, {
      username: updateObject(controls.username, {
        value: displayName && displayName,
      }),
      email: updateObject(controls.email, {
        value: email && email,
      }),
    });

    this.setState({
      controls: updatedControls,
    });

    if (photoURL !== null) {
      this.setState({
        userSelectedPhotoSrc: photoURL,
      });
    }
  }

  fileInputChangedHandler = (event) => {
    const file = event.target.files[0];
    const fileSrc = URL.createObjectURL(file);

    this.setState({
      userSelectedPhotoSrc: fileSrc,
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

  currentPasswordInputChangedHandler = (event) => {
    const { currentPassword } = this.state;
    const updatedPassword = updateObject(currentPassword, {
      value: event.target.value,
      valid: checkValidity(event.target.value, currentPassword.validation),
      touched: true,
    });
    this.setState({
      currentPassword: updatedPassword,
    });
  };

  currentPasswordButtonKeyDownHandler = (event) => {
    event.preventDefault();
    if (event.which === 13) {
      this.currentPasswordButtonClickHandler();
    }
  };

  buttonCancelClickHandler = () => {
    this.setState({
      showCurrentPasswordForm: false,
    });
  };

  updateUserPhoto = () => {
    const { user } = this.props;
    if (user === null) return;

    const storageRef = firebase
      .storage()
      .ref(`users/${user.uid}/photo/${user.uid}`);

    storageRef.getDownloadURL().then((photoURL) => {
      user
        .updateProfile({
          photoURL,
        })
        .then(
          () => {
            this.setState({
              userSelectedPhotoSrc: photoURL,
              userPhotoMessage: 'Photo updated.',
              userPhotoMessageElementClassName: classNameSuccess,
            });
          },
          (error) => {
            this.setState({
              userPhotoMessage: error.message,
              userPhotoMessageElementClassName: classNameFail,
              userSelectedPhotoSrc: '',
            });
          },
        );
    });
  };

  uploadUserPhoto = () => {
    const file = this.fileInput.current.files[0];
    const { user } = this.props;

    Object.defineProperty(file, 'name', {
      writable: true,
      value: user.uid,
    });

    const storageRef = firebase
      .storage()
      .ref(`users/${user.uid}/photo/${file.name}`);

    const task = storageRef.put(file);

    task.on(
      'state_changed',
      null,
      (error) => {
        this.setState({
          userPhotoMessage: error.message,
          userPhotoMessageElementClassName: classNameFail,
        });
      },
      () => {
        this.updateUserPhoto();
        this.setState({
          userPhotoMessage: 'Photo uploaded.',
          userPhotoMessageElementClassName: classNameSuccess,
        });
      },
    );
  };

  updateUsername = () => {
    const { controls } = this.state;
    const { user } = this.props;

    if (user === null || !controls.username.touched) return;

    user
      .updateProfile({
        displayName: controls.username.value,
      })
      .then(
        () => {
          this.setState({
            usernameMessage: 'Username updated.',
            usernameMessageElementClassName: classNameSuccess,
          });
        },
        (error) => {
          this.setState({
            usernameMessage: error.message,
            usernameMessageElementClassName: classNameFail,
          });
        },
      );
  };

  updateUserEmail = () => {
    const { controls } = this.state;
    const { user } = this.props;
    if (user === null || !controls.email.touched) return;

    user
      .verifyBeforeUpdateEmail(controls.email.value, null)
      .then(() => {
        this.setState({
          emailMessage: 'Email verification sent.',
          emailMessageElementClassName: classNameSuccess,
        });
      })
      .catch((error) => {
        this.setState({
          emailMessage: error.message,
          emailMessageElementClassName: classNameFail,
        });
      });
  };

  updateUserPassword = () => {
    const { controls } = this.state;
    const { user } = this.props;
    if (user === null || !controls.newPassword.touched) return;

    user
      .updatePassword(controls.newPassword.value)
      .then(() => {
        this.setState({
          newPasswordMessage: 'Password changed.',
          newPasswordMessageElementClassName: classNameSuccess,
        });
      })
      .catch((error) => {
        this.setState({
          newPasswordMessage: error.message,
          newPasswordMessageElementClassName: classNameFail,
        });
      });
  };

  mainFormSubmitHandler = (event) => {
    event.preventDefault();

    const { controls } = this.state;
    const { email, username, newPassword } = controls;

    if (
      this.fileInput.current.files.length === 0 &&
      !username.touched &&
      !email.touched &&
      !newPassword.touched
    ) {
      this.setState({
        formMessage: 'No changes appeared.',
      });
      return;
    }
    this.setState({
      formMessage: '',
    });

    if (username.valid.message !== '') {
      this.setState({
        usernameMessage: `Username ${username.valid.message}`,
        usernameMessageElementClassName: classNameFail,
      });
      return;
    }
    this.setState({
      usernameMessage: '',
      usernameMessageElementClassName: '',
    });

    if (email.valid.message !== '') {
      this.setState({
        emailMessage: `Email${email.valid.message}`,
        emailMessageElementClassName: classNameFail,
      });
      return;
    }
    this.setState({
      emailMessage: '',
      emailMessageElementClassName: '',
    });

    if (newPassword.valid.message !== '') {
      this.setState({
        newPasswordMessage: `New password${newPassword.valid.message}`,
        newPasswordMessageElementClassName: classNameFail,
      });
      return;
    }
    this.setState({
      newPasswordMessage: '',
      newPasswordMessageElementClassName: '',
    });

    this.setState({
      showCurrentPasswordForm: true,
    });
  };

  currentPasswordButtonClickHandler = () => {
    const { currentPassword } = this.state;
    const { user } = this.props;

    if (!currentPassword.touched) {
      this.setState({
        currentPasswordMessage: 'Current password is empty.',
        currentPasswordMessageElementClassName: classNameFail,
      });
      return;
    }
    this.setState({
      currentPasswordMessage: '',
      currentPasswordMessageElementClassName: '',
    });

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword.value,
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.setState(
          {
            showCurrentPasswordForm: false,
          },
          () => {
            if (this.fileInput.current.files.length !== 0) {
              this.uploadUserPhoto();
            }
            this.updateUsername();
            this.updateUserEmail();
            this.updateUserPassword();
          },
        );
      })
      .catch((error) => {
        this.setState({
          currentPasswordMessage: error.message,
          currentPasswordMessageElementClassName: classNameFail,
        });
      });
  };

  render() {
    const formElementsArray = [];
    const {
      controls,
      currentPassword,
      showCurrentPasswordForm,
      formMessage,
      userPhotoMessage,
      userPhotoMessageElementClassName,
      usernameMessage,
      usernameMessageElementClassName,
      emailMessage,
      emailMessageElementClassName,
      newPasswordMessage,
      newPasswordMessageElementClassName,
      currentPasswordMessage,
      currentPasswordMessageElementClassName,
      userSelectedPhotoSrc,
    } = this.state;

    for (const key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    const formElements = formElementsArray.map((element) => (
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

    const currentPasswordInput = (
      <Input
        elementType={currentPassword.elementType}
        elementConfig={currentPassword.elementConfig}
        value={currentPassword.value}
        shouldValidate={currentPassword.validation}
        touched={currentPassword.touched}
        valid={currentPassword.valid}
        name={currentPassword.elementConfig.name}
        label={currentPassword.label}
        changed={(event) => this.currentPasswordInputChangedHandler(event)}
        wrapperClassName={currentPassword.wrapperClassName}
        inputClassName={currentPassword.inputClassName}
      />
    );

    const currentPasswordForm = (
      <motion.div
        transition={transition025}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="section-user-account__backdrop"
      >
        <form
          onSubmit={(event) => event.preventDefault()}
          className="section-user-account__form-change-password"
        >
          {currentPasswordInput}
          <p className={currentPasswordMessageElementClassName}>
            {currentPasswordMessage !== '' && currentPasswordMessage}
          </p>
          <Button
            type="button"
            clicked={this.buttonCancelClickHandler}
            style={{ marginTop: '2rem', display: 'inline', float: 'left' }}
            className="button--secondary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            clicked={this.currentPasswordButtonClickHandler}
            style={{
              marginTop: '2rem',
              display: 'inline',
              float: 'right',
            }}
            className="button--primary"
          >
            Submit
          </Button>
        </form>
      </motion.div>
    );

    return (
      <section className="section-user-account">
        <AnimatePresence>
          {showCurrentPasswordForm && currentPasswordForm}
        </AnimatePresence>
        <div className="section-user-account__user-photo-wrapper">
          <div className="section-user-account__user-photo-box">
            {userSelectedPhotoSrc !== '' ? (
              <img src={userSelectedPhotoSrc} alt="User" />
            ) : (
              <i className="fas fa-user-alt" />
            )}
          </div>
          <div className="section-user-account__input-file-wrapper">
            <label htmlFor="file">Upload image</label>
            <input
              type="file"
              ref={this.fileInput}
              onChange={this.fileInputChangedHandler}
              name="file"
              className="section-user-account__input-file-input"
            />
          </div>
        </div>
        <form
          onSubmit={this.mainFormSubmitHandler}
          className="section-user-account__form"
        >
          {formElements}
          <ErrorMessage className={classNameFail} message={formMessage} />
          <ErrorMessage
            className={userPhotoMessageElementClassName}
            message={userPhotoMessage}
          />
          <ErrorMessage
            className={usernameMessageElementClassName}
            message={usernameMessage}
          />
          <ErrorMessage
            className={emailMessageElementClassName}
            message={emailMessage}
          />
          <ErrorMessage
            className={newPasswordMessageElementClassName}
            message={newPasswordMessage}
          />
          <Button
            type="submit"
            style={{
              marginTop: '4rem',
            }}
            className="button--primary"
          >
            Submit
          </Button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  onToggleUserModal: () => dispatch(toggleUserModal()),
});

UserAccount.defaultProps = {
  user: null,
};

UserAccount.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
  onToggleUserModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
