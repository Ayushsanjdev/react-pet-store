import { createStore, applyMiddleware } from 'redux';
import getPetReducers from "./Reducers/petsReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const store = createStore(
  getPetReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;