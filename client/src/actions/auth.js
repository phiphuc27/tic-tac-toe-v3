import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    USER_FETCHING,
    REGISTER_START,
    LOGIN_START,
} from '../actions/type';
import { setAlert } from './alert';
import { getCurrentProfile } from './profile';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispatch) => {
    dispatch({ type: USER_FETCHING });
    if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });

        dispatch(getCurrentProfile());
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register user
export const register = ({ username, email, password }) => async (dispatch) => {
    dispatch({ type: REGISTER_START });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ username, email, password });

    try {
        const res = await axios.post('/api/user', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const { errors } = err.response.data;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Login user
export const login = ({ email, password }) => async (dispatch) => {
    dispatch({ type: LOGIN_START });

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const { errors } = err.response.data;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// Logout
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};
