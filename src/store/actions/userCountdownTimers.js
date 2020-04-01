import { SET_EVENTS } from "./actionTypes";
import { database } from "../firebase/firebase";

export const setEvents = events => ({
  type: SET_EVENTS,
  events: events
});
export const getData = userId => dispatch => {
  database()
    .ref("/users/" + userId + "/events/")
    .once("value")
    .then(snapshot => dispatch(setEvents(snapshot.val())));
};
