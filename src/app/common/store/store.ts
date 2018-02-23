import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

// tslint:disable-next-line:no-any
const composeEnhancers = (<any> window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default  store;