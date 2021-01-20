import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newGame } from '../../actions/game';

import '../Game/index.css';

import Board from '../Game/Board';

const Game = ({ newGame }) => {
    useEffect(() => {
        newGame();
    }, [newGame]);

    return (
        <div className='game'>
            <Board />
        </div>
    );
};

Game.propTypes = {
    newGame: PropTypes.func.isRequired,
};

export default connect(null, { newGame })(Game);
