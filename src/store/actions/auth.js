import { _auth } from "../firebase/firebase";
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_SIGNOUT } from "./actionTypes";

const tokenExpTimeInMs = 3600000;

export const authStart = () => ({ type: AUTH_START });

export const authSuccess = (token, user) => ({
   type: AUTH_SUCCESS,
   token: token,
   user: user
});

export const authFail = error => ({ type: AUTH_FAIL, error: error });

export const authSignout = () => {
   return {
      type: AUTH_SIGNOUT
   };
};

export const checkAuthTimeout = expTime => dispatch => {
   setTimeout(() => {
      dispatch(authSignout());
   }, expTime);
};

export const auth = (email, password, signUp) => dispatch => {
   dispatch(authStart());

   if (signUp) {
      _auth()
         .createUserWithEmailAndPassword(email, password)
         .then(response => {
            response.user.getIdToken().then(token => {
               dispatch(authSuccess(token, response.user));

               response.user
                  .sendEmailVerification()
                  .then(() => {
                     console.log("Email verification after sign in sent");
                  })
                  .catch(error => {
                     console.error(error);
                  });
            });
         })
         .catch(error => {
            console.error(error);
            dispatch(authFail(error));
         });
   } else {
      _auth()
         .signInWithEmailAndPassword(email, password)
         .then(response => {
            response.user.getIdToken().then(token => {
               dispatch(authSuccess(token, response.user));
            });
         })
         .catch(error => {
            console.error(error);
            dispatch(authFail(error));
         });
   }
};

export const showLoader = value => ({
   type: "SHOW_LOADER",
   value: value
});

export const authCheckState = () => {
   return dispatch => {
      dispatch(showLoader(true));
      _auth().onAuthStateChanged(user => {
         if (user) {
            user.getIdToken().then(token => {
               dispatch(showLoader(false));
               dispatch(authSuccess(token, user));
            });
         }
      });
   };
};
