import { CLICK_SQUARE, SET_WINNER, MOVE_JUMP, NEW_GAME } from '../actions/type';

const BOARD_SIZE = 20;

const initialState = {
    squares: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)),
    history: [],
    step: 0,
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
                history: [...state.history.splice(0, state.step), payload],
                step: (state.step += 1),
                xTurn: !state.xTurn,
            };
        case SET_WINNER:
            return {
                ...state,
                winner: payload,
            };
        case MOVE_JUMP:
            return {
                ...state,
                squares: payload.board,
                step: payload.step,
                xTurn: payload.step % 2 === 0,
                winner: null,
            };
        case NEW_GAME:
            return {
                ...state,
                squares: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)),
                history: [],
                step: 0,
                xTurn: true,
                winner: null,
            };
        default:
            return state;
    }
};

export default reducer;
