// actions/authActions.js
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_PROFILE, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from './types';

export const login = (role, email, password) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:5000/api/auth/login/${role}`, { email, password });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data // Assuming the response contains user data or a token
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.message // Assuming the server returns an error message
        });
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:5000/api/users/register', userData);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
