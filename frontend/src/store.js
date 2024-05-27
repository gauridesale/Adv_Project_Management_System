import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import thunk directly
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware) // Apply middleware directly
);

export default store;



