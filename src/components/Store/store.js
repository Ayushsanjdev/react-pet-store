import { createStore, applyMiddleware } from 'redux';
import petReducers from "./Reducers/petsReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const store = createStore(
  petReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;