import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateObject, checkValidity } from '../../shared/utility';
import { toggleUserModal } from '../../store/actions/index';
import firebase from 'firebase';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';

const classNameSuccess = 'section-user-account__message  section-user-account__message--green';
const classNameFail = 'section-user-account__message  section-user-account__message--red';

class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      user: null,
      controls: {
        username: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            name: 'username',
            placeholder: 'Enter username'
          },
          value: '',
          validation: {
            maxLength: 15,
            minLength: 3
          },
          touched: false,
          valid: {
            value: false,
            message: null
          },
          label: 'Username',
          wrapperClassName: 'input-field input-fielementd--text',
          inputClassName: 'input-field__text'
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            name: 'email',
            placeholder: 'Enter email'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          touched: false,
          valid: {
            value: false,
            message: null
          },
          isVerified: false,
          label: 'Email',
          wrapperClassName: 'input-field input-fielementd--text',
          inputClassName: 'input-field__text'
        },
        newPassword: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            name: 'newPassword',
            placeholder: 'Enter new password'
          },
          value: '',
          validation: {
            minLength: 6,
            required: true
          },
          touched: false,
          valid: {
            value: false,
            message: null
          },
          disabled: true,
          label: 'New password',
          wrapperClassName: 'input-field input-fielementd--text',
          inputClassName: 'input-field__text'
        }
      },
      currentPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'currentPassword',
          placeholder: 'Enter current password'
        },
        value: '',
        validation: {
          minLength: 6,
          required: true
        },
        touched: false,
        valid: {
          value: false,
          message: null
        },
        label: 'Current password',

        wrapperClassName: 'input-field input-fielementd--text',
        inputClassName: 'input-field__text'
      },
      showCurrentPasswordForm: false,
      userSelectedPhotoSrc: null,
      formMessage: null,
      userPhotoMessage: null,
      userPhotoMessageElementClassName: null,
      usernameMessage: null,
      usernameMessageElementClassName: null,
      emailMessage: null,
      emailMessageElementClassName: null,
      newPasswordMessage: null,
      newPasswordMessageElementClassName: null,
      currentPasswordMessage: null,
      currentPasswordMessageElementClassName: null
    };
  }

  componentDidMount() {
    this.props.onToggleUserModal();

    const { displayName, photoURL, email } = this.props.user;
    const { controls } = this.state;

    const updatedControls = updateObject(controls, {
      username: updateObject(controls.username, {
        value: displayName === null ? '' : displayName
      }),
      email: updateObject(controls.email, {
        value: email === null ? '' : email
      })
    });

    this.setState({
      controls: updatedControls
    });

    if (photoURL !== null) {
      this.setState({
        userSelectedPhotoSrc: photoURL
      });
    }
  }

  fileInputChangedHandler = event => {
    const file = event.target.files[0];
    const fileSrc = URL.createObjectURL(file);

    this.setState({
      userSelectedPhotoSrc: fileSrc
    });
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

  currentPasswordInputChangedHandler = event => {
    const { currentPassword } = this.state;
    const updatedPassword = updateObject(currentPassword, {
      value: event.target.value,
      valid: checkValidity(event.target.value, currentPassword.validation),
      touched: true
    });
    this.setState({
      currentPassword: updatedPassword
    });
  };

  buttonCancelClickHandler = () => {
    this.setState({
      showCurrentPasswordForm: false
    });
  };

  updateUserPhoto = () => {
    const { user } = this.props;
    if (user === null) return;

    const storageRef = firebase
      .storage()
      .ref('users/' + this.props.user.uid + '/photo/' + this.props.user.uid);

    storageRef.getDownloadURL().then(photoURL => {
      user
        .updateProfile({
          photoURL: photoURL
        })
        .then(
          () => {
            console.log('Photo updated');
            this.setState({
              userSelectedPhotoSrc: photoURL,
              userPhotoMessage: 'Photo updated.',
              userPhotoMessageElementClassName: classNameSuccess
            });
          },
          error => {
            console.error(error);
            this.setState({
              userPhotoMessage: error.message,
              userPhotoMessageElementClassName: classNameFail
            });
          }
        );
    });
  };

  uploadUserPhoto = () => {
    const file = this.fileInput.current.files[0];

    Object.defineProperty(file, 'name', {
      writable: true,
      value: this.props.user.uid
    });

    const storageRef = firebase
      .storage()
      .ref('users/' + this.props.user.uid + '/photo/' + file.name);

    const task = storageRef.put(file);

    task.on(
      'state_changed',
      null,
      error => {
        console.error(error);
        this.setState({
          userPhotoMessage: error.message,
          userPhotoMessageElementClassName: classNameFail
        });
      },
      () => {
        console.log('Photo uploaded');
        this.updateUserPhoto();
        this.setState({
          userPhotoMessage: 'Photo uploaded.',
          userPhotoMessageElementClassName: classNameSuccess
        });
      }
    );
  };

  updateUsername = () => {
    const { controls } = this.state;
    const { user } = this.props;

    if (user === null || !controls.username.touched) return;

    user
      .updateProfile({
        displayName: controls.username.value
      })
      .then(
        () => {
          console.log('Username updated');
          this.setState({
            usernameMessage: 'Username updated.',
            usernameMessageElementClassName: classNameSuccess
          });
        },
        error => {
          console.error(error);
          this.setState({
            usernameMessage: error.message,
            usernameElementClassName: classNameFail
          });
        }
      );
  };

  updateUserEmail = () => {
    const { controls } = this.state;
    const { user } = this.props;
    if (user === null || !controls.email.touched) return;

    user
      .verifyBeforeUpdateEmail(controls.email.value, null)
      .then(() => {
        console.log('Email verification sent');

        this.setState({
          emailMessage: 'Email verification sent.',
          emailMessageElementClassName: classNameSuccess
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          emailMessage: error.message,
          emailMessageElementClassName: classNameFail
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
        console.log('Password changed');

        this.setState({
          newPasswordMessage: 'Password changed.',
          newPasswordMessageElementClassName: classNameSuccess
        });
      })
      .catch(error => {
        console.log(error);

        this.setState({
          newPasswordMessage: error.message,
          newPasswordMessageElementClassName: classNameFail
        });
      });
  };

  mainFormSubmitHandler = event => {
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
        formMessage: 'No changes appeared.'
      });
      return;
    } else {
      this.setState({
        formMessage: null
      });
    }

    if (username.valid.message !== null) {
      this.setState({
        usernameMessage: 'Username ' + username.valid.message,
        usernameMessageElementClassName: classNameFail
      });
      return;
    } else {
      this.setState({
        usernameMessage: null,
        usernameMessageElementClassName: null
      });
    }

    if (email.valid.message !== null) {
      this.setState({
        emailMessage: 'Email ' + email.valid.message,
        emailMessageElementClassName: classNameFail
      });
      return;
    } else {
      this.setState({
        emailMessage: null,
        emailMessageElementClassName: null
      });
    }

    if (newPassword.valid.message !== null) {
      this.setState({
        newPasswordMessage: 'New password ' + newPassword.valid.message,
        newPasswordMessageElementClassName: classNameFail
      });
      return;
    } else {
      this.setState({
        newPasswordMessage: null,
        newPasswordMessageElementClassName: null
      });
    }

    this.setState({
      showCurrentPasswordForm: true
    });
  };

  currentPasswordButtonClickHandler = () => {
    const { currentPassword } = this.state;
    const { user } = this.props;

    if (!currentPassword.touched) {
      this.setState({
        currentPasswordMessage: 'Current password is empty.',
        currentPasswordMessageElementClassName: classNameFail
      });
      return;
    } else {
      this.setState({
        currentPasswordMessage: null,
        currentPasswordMessageElementClassName: null
      });
    }

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword.value
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        console.log('Reauthenticated successfully');
        this.setState(
          {
            currentPasswordError: false,
            showCurrentPasswordForm: false
          },
          () => {
            if (this.fileInput.current.files.length !== 0) {
              this.uploadUserPhoto();
            }
            this.updateUsername();
            this.updateUserEmail();
            this.updateUserPassword();
          }
        );
      })
      .catch(error => {
        console.log(error);
        this.setState({
          currentPasswordMessage: error.message,
          currentPasswordMessageElementClassName: classNameFail
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
      currentPasswordMessageElementClassName
    } = this.state;

    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      });
    }

    const formElements = formElementsArray.map(element => (
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
        changed={event => this.currentPasswordInputChangedHandler(event)}
        wrapperClassName={currentPassword.wrapperClassName}
        inputClassName={currentPassword.inputClassName}
      />
    );

    const currentPasswordForm = (
      <>
        <div className="section-user-account__backdrop"></div>
        <form className="section-user-account__form-change-password">
          {currentPasswordInput}
          <p className={currentPasswordMessageElementClassName}>
            {currentPasswordMessage !== null && currentPasswordMessage}
          </p>
          <Button
            type="button"
            clicked={this.buttonCancelClickHandler}
            style={{ marginTop: '1rem' }}
            className="button--secondary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            clicked={this.currentPasswordButtonClickHandler}
            style={{
              marginTop: '4rem'
            }}
            className="button--primary"
          >
            SUBMIT
          </Button>
        </form>
      </>
    );

    return (
      <section className="section-user-account">
        {showCurrentPasswordForm && currentPasswordForm}
        <div className="section-user-account__user-photo-wrapper">
          <div className="section-user-account__user-photo-box">
            {this.props.user.photoURL !== null || this.state.userSelectedPhotoSrc !== null ? (
              <img src={this.state.userSelectedPhotoSrc} alt="User" />
            ) : (
              <i className="fas fa-user-alt"></i>
            )}
          </div>
          <div className="section-user-account__input-file-wrapper">
            <label htmlFor="file" className="section-user-account__input-file-label"></label>
            Upload image
            <input
              type="file"
              ref={this.fileInput}
              onChange={this.fileInputChangedHandler}
              name="file"
              className="section-user-account__input-file-input"
            />
          </div>
        </div>
        <form onSubmit={this.mainFormSubmitHandler} className="section-user-account__form">
          {formElements}
          <p className={classNameFail}>{formMessage !== null && formMessage}</p>
          <p className={userPhotoMessageElementClassName}>
            {userPhotoMessage !== null && userPhotoMessage}
          </p>
          <p className={usernameMessageElementClassName}>
            {usernameMessage !== null && usernameMessage}
          </p>
          <p className={emailMessageElementClassName}>{emailMessage !== null && emailMessage}</p>
          <p className={newPasswordMessageElementClassName}>
            {newPasswordMessage !== null && newPasswordMessage}
          </p>
          <Button
            type="submit"
            style={{
              marginTop: '4rem'
            }}
            className="button--primary"
          >
            SUBMIT
          </Button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  onToggleUserModal: () => dispatch(toggleUserModal())
});

UserAccount.propTypes = {
  user: PropTypes.object,
  onToggleUserModal: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
