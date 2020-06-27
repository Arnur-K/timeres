import { auth } from '../firebase/firebase';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_SIGNOUT,
  SHOW_LOADER,
} from './actionTypes';

export const showLoader = (value) => ({
  type: SHOW_LOADER,
  value,
});

export const authStart = () => ({ type: AUTH_START });

export const authSuccess = (token, user) => ({
  type: AUTH_SUCCESS,
  token,
  user,
});

export const authFail = (error) => ({ type: AUTH_FAIL, error });

export const authSignout = () => ({
  type: AUTH_SIGNOUT,
});

export const checkAuthTimeout = (expTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authSignout());
  }, expTime);
};

export const authenticate = (email, password, signUp) => (dispatch) => {
  dispatch(authStart());

  if (signUp) {
    dispatch(showLoader(true));
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user.getIdToken().then((token) => {
          dispatch(showLoader(false));
          dispatch(authSuccess(token, response.user));

          response.user.sendEmailVerification();
        });
      })
      .catch((error) => {
        dispatch(authFail(error));
        dispatch(showLoader(false));
      });
  } else {
    dispatch(showLoader(true));
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        response.user.getIdToken().then((token) => {
          dispatch(showLoader(false));
          dispatch(authSuccess(token, response.user));
        });
      })
      .catch((error) => {
        dispatch(authFail(error));
        dispatch(showLoader(false));
      });
  }
};

export const authCheckState = () => {
  return (dispatch) => {
    dispatch(showLoader(true));
    auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          dispatch(showLoader(false));
          dispatch(authSuccess(token, user));
        });
      } else {
        dispatch(showLoader(false));
      }
    });
  };
};
