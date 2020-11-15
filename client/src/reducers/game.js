import { CLICK_SQUARE, SET_WINNER, MOVE_JUMP } from '../actions/type';

const BOARD_SIZE = 20;

const initialState = {
    squares: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)),
    history: [],
    xTurn: true,
    winner: null,
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CLICK_SQUARE:
            return {
                ...state,
                squares: state.squares.map((row, i) =>
                    i === payload.row
                        ? row.map((square, j) => (j === payload.col ? payload.name : square))
                        : row
                ),
                xTurn: !state.xTurn,
            };
        case SET_WINNER:
            return {
                ...state,
                winner: payload,
            };
        case MOVE_JUMP:
            return state;
        default:
            return state;
    }
};

export default reducer;
