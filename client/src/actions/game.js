import { CLICK_SQUARE, SET_WINNER, MOVE_JUMP, NEW_GAME } from './type';

import getWinMoves from '../utils/getWinMoves';

export const newGame = () => (dispatch) => {
    dispatch({ type: NEW_GAME });
};

export const clickSquare = (square, board) => (dispatch) => {
    dispatch({ type: CLICK_SQUARE, payload: square });
    const winner = getWinMoves(square, board);
    if (winner) {
        dispatch({ type: SET_WINNER, payload: winner });
    }
};

export const moveJump = (step, history, board) => (dispatch) => {
    const tmpBoard = Array.from(board).map((row) => row.map(() => null));
    const tmpHistory = [...history];
    const updatedHistory = tmpHistory.splice(0, step);
    const square = updatedHistory[step - 1];

    updatedHistory.forEach((item) => {
        tmpBoard[item.row][item.col] = item.name;
    });

    dispatch({ type: MOVE_JUMP, payload: { board: tmpBoard, step } });

    if (square) {
        const winner = getWinMoves(square, board);
        if (winner) {
            dispatch({ type: SET_WINNER, payload: winner });
        }
    }
};
