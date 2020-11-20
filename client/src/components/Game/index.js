import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newGame } from '../../actions/game';

import './index.css';

import Board from './Board';
import GameInfo from './GameInfo';

const Game = () => {
    useEffect(() => {
        newGame();
    }, []);

    return (
        <div className='game'>
            <Board />
            <GameInfo />
        </div>
    );
};

Game.propTypes = {
    newGame: PropTypes.func.isRequired,
};

export default connect(null, { newGame })(Game);
