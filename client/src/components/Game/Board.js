import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clickSquare } from '../../actions/game';

import './Board.css';

import Square from './Square';

const Board = ({ game: { squares, xTurn, winner }, clickSquare }) => {
    const status = `Next player: ${xTurn ? 'X' : 'O'}`;

    const handleClick = (row, col) => {
        if (winner || squares[row][col]) return;

        const square = {
            row,
            col,
            name: xTurn ? 'X' : 'O',
        };

        clickSquare(square, squares);
    };

    return (
        <div>
            <div className='status'>{status}</div>
            {squares.map((e, i) => (
                <div key={i} className='board-row'>
                    {squares[i].map((e, j) => (
                        <Square
                            key={[i, j]}
                            value={squares[i][j]}
                            onClick={() => handleClick(i, j)}
                            winner={
                                winner &&
                                winner.moves.some((item) => item.row === i && item.col === j)
                                    ? winner.name
                                    : ''
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

Board.propTypes = {
    game: PropTypes.objectOf(PropTypes.any).isRequired,
    clickSquare: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    game: state.game,
});

export default connect(mapStateToProps, { clickSquare })(Board);
