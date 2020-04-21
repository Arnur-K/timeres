import { SET_CONTENT } from '../actions/actionTypes';

const initialState = {
  content: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT:
      return {
        content: action.content,
      };
    default:
      return state;
  }
};
