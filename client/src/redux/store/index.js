import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

export let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)
    ));

