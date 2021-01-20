import { FIND_PLAYER, ONLINE_CLEAR, ONLINE_ERROR, SET_TURN, START_GAME } from '../actions/type';

const initialState = {
    room: null,
    opponent: null,
    loading: false,
    isFoundGame: false,
    error: {},
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FIND_PLAYER:
            return {
                ...state,
                loading: true,
                isFoundGame: false,
            };
        case START_GAME:
            return {
                ...state,
                room: payload.room,
                opponent: payload.opponent,
                loading: false,
                isFoundGame: true,
            };
        case SET_TURN:
            return {
                ...state,
                opponent: { ...state.opponent, turn: payload },
            };
        case ONLINE_CLEAR:
            return {
                ...state,
                room: null,
                opponent: null,
                loading: false,
                isFoundGame: false,
                error: {},
            };
        case ONLINE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
