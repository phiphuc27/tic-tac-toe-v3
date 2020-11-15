import { CLICK_SQUARE, SET_WINNER, MOVE_JUMP } from './type';

import getWinMoves from '../utils/getWinMoves';

export const clickSquare = (square, board) => (dispatch) => {
    dispatch({ type: CLICK_SQUARE, payload: square });
    const winner = getWinMoves(square, board);
    if (winner) {
        dispatch({ type: SET_WINNER, payload: winner });
    }
};
