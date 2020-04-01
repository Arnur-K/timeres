import { ADD_EVENT } from "./actionTypes";

export const addEvent = eventData => ({
  type: ADD_EVENT,
  data: eventData
});
