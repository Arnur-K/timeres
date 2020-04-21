import { TOGGLE_USER_MODAL, TOGGLE_LANGUAGE } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  showUserModal: false,
  lang: 'en',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_USER_MODAL:
      return action.isBtn === true
        ? updateObject(state, { showUserModal: !state.showUserModal })
        : updateObject(state, { showUserModal: false });
    case TOGGLE_LANGUAGE:
      return updateObject(state, { lang: action.lang });
    default:
      return state;
  }
};
