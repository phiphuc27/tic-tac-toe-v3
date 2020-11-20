import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { newGame, moveJump } from '../../actions/game';

import './GameInfo.css';

import History from './History';

const GameInfo = ({ game: { winner, xTurn, history, squares, step }, newGame, moveJump }) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!winner) {
            setStatus(`Next player: ${xTurn ? 'X' : 'O'}`);
        } else {
            const { name } = winner;
            if (name === 'draw') {
                setStatus('Draw!');
            } else {
                setStatus(`Winner: ${name.toUpperCase()}`);
            }
        }
    }, [winner, xTurn]);

    return (
        <div className='info'>
            <div className='info__btn-group'>
                <button type='button' className='btn btn-info' onClick={newGame}>
                    New Game
                </button>
                <button
                    type='button'
                    className={`btn btn-info ${step < 1 && 'disabled'}`}
                    onClick={() => moveJump(step - 1, history, squares)}
                >
                    Undo
                </button>
                <button
                    type='button'
                    className={`btn btn-info ${step >= history.length && 'disabled'}`}
                    onClick={() => moveJump(step + 1, history, squares)}
                >
                    Redo
                </button>
            </div>
            <div className='status'>
                <p className='status__text'>{status}</p>
            </div>
            <History />
        </div>
    );
};

GameInfo.propTypes = {
    game: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    game: state.game,
});

export default connect(mapStateToProps, { newGame, moveJump })(GameInfo);
