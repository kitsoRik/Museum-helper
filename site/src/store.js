import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { setStore } from './services/i18n/i18n';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

setStore(store);


export default store;