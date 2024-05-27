// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Make sure this import is correct

export default combineReducers({
    auth: authReducer
});
