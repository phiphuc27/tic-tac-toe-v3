import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, PROFILE_FETCHING } from '../actions/type';

const initialState = {
    profile: null,
    loading: false,
    error: {},
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PROFILE_FETCHING:
            return {
                ...state,
                loading: true,
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                error: {},
            };
        default:
            return state;
    }
};

export default reducer;
