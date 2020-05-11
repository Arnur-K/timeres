import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './reducers/auth';
import userEventsReducer from './reducers/userEvents';
import eventFormReducer from './reducers/eventForm';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
  auth: authReducer,
  userEvents: userEventsReducer,
  eventData: eventFormReducer,
  ui: uiReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
