import { SET_CONTENT } from './actionTypes';
import { database } from '../firebase/firebase';

export const setContent = (content) => ({
  type: SET_CONTENT,
  content,
});

export const getContent = () => (dispatch) => {
  database()
    .ref('content')
    .once('value')
    .then((snapshot) => dispatch(setContent(snapshot.val())));
};
