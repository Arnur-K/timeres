import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_SIGNOUT,
  SHOW_LOADER,
} from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  user: null,
  showLoader: false,
  error: null,
};

const authStart = (state) => updateObject(state, { error: null });

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
  });
};

const authFail = (state, action) =>
  updateObject(state, {
    error: action.error,
  });

const authSignout = (state) => updateObject(state, { token: null, user: null });

const showLoader = (state, action) =>
  updateObject(state, { showLoader: action.value });

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_SIGNOUT:
      return authSignout(state, action);
    case SHOW_LOADER:
      return showLoader(state, action);
    default:
      return state;
  }
};
