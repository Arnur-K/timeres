import { ADD_EVENT } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  events: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return updateObject(state, { data: action.data });
    default:
      return state;
  }
};
