import { SET_EVENTS } from "../actions/actionTypes";

const initialState = {
  events: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        events: action.events
      };
    default:
      return state;
  }
};
