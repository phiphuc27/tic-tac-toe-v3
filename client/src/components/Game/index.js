import React from 'react';

import './index.css';

import Board from './Board';
import GameInfo from './GameInfo';

const Game = () => {
    return (
        <div className='game'>
            <Board />
            <GameInfo />
        </div>
    );
};

export default Game;
