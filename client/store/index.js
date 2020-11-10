import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import appReducer from './redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

let middleware = [
  createLogger({ collapsed: true }),
  thunkMiddleware.withExtraArgument({ axios }),
];

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
