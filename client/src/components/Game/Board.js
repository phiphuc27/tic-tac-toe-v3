import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useSocket } from '../../SocketProvider';

import { clickSquare } from '../../actions/game';

import './Board.css';

import Square from './Square';

const Board = ({ game: { squares, isTurn, winner }, online: { opponent, room }, clickSquare }) => {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        const tmpSquares = [...squares];

        socket.on('receive-square', ({ square }) => {
            console.log(squares);
            clickSquare(square, tmpSquares);
        });

        return () => socket.offAny();
    });

    const handleClick = (row, col) => {
        if (winner || squares[row][col]) return;
        if (opponent && isTurn === opponent.turn) return;
        const square = {
            row,
            col,
            name: isTurn ? 'X' : 'O',
        };

        clickSquare(square, squares);
        if (socket) socket.emit('send-square', { square, room });
    };

    return (
        <div className='board'>
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
    online: PropTypes.objectOf(PropTypes.any).isRequired,
    clickSquare: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    game: state.game,
    online: state.online,
});

export default connect(mapStateToProps, { clickSquare })(Board);
