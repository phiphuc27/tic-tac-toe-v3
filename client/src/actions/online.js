import axios from 'axios';
import { setAlert } from './alert';

import { FIND_PLAYER, START_GAME, SET_TURN, ONLINE_ERROR, ONLINE_CLEAR } from './type';

export const findPlayer = () => (dispatch) => {
    dispatch({ type: FIND_PLAYER });
};

export const startGame = (opponent, room, cb) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/${opponent}`);

        dispatch({ type: START_GAME, payload: { opponent: res.data, room } });

        cb();
    } catch (err) {
        dispatch({
            type: ONLINE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const setTurn = (turn) => (dispatch) => {
    dispatch({ type: SET_TURN, payload: turn });
};

export const clearOnline = () => (dispatch) => {
    dispatch({ type: ONLINE_CLEAR });
    dispatch(setAlert('Your opponent left the game. Return to the lobby.', 'danger'));
};
