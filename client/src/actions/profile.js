import axios from 'axios';

import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    PROFILE_FETCHING,
    ACCOUNT_DELETED,
    LOGOUT,
} from '../actions/type';

import { setAlert } from './alert';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
    dispatch({ type: PROFILE_FETCHING });

    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Get profile by userID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Upload photo
export const uploadPhoto = (file) => async (dispatch) => {
    dispatch({ type: PROFILE_FETCHING });
    const formData = new FormData();
    formData.append('file', file);
    try {
        const res = await axios.post(
            'https://us-central1-carovn-v2.cloudfunctions.net/uploadFile',
            formData
        );

        dispatch(updateProfile({ avatar: res.data.downloadUrl }));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// update profile
export const updateProfile = (formData) => async (dispatch) => {
    dispatch({ type: PROFILE_FETCHING });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Profile Updated', 'success'));
    } catch (err) {
        const { errors } = err.response.data;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Change Password
export const changePassword = ({ currentPassword, newPassword }, history) => async (dispatch) => {
    dispatch({ type: PROFILE_FETCHING });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ currentPassword, newPassword });

        const res = await axios.put('/api/user/password', body, config);

        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: LOGOUT });
        dispatch(setAlert(res.data.msg, 'success'));

        history.push('/login');
    } catch (err) {
        const { errors } = err.response.data;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete(`/api/profile`);

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });
            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    }
};
