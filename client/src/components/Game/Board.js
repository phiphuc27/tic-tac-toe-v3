import React, { useState } from 'react';

import './Board.css';

import Square from './Square';

const Board = () => {
  const size = 20;

  const [squares, setSquares] = useState(Array(size).fill(Array(size).fill(null)));
  const [xTurn, setXTurn] = useState(true);

  const status = `Next player: ${xTurn ? 'X' : 'O'}`;

  const handleClick = (row, col) => {
    const tmpSquares = [...squares];
    squares.forEach((square, i) => {
      tmpSquares[i] = [...square];
    });
    tmpSquares[row][col] = xTurn ? 'X' : 'O';
    setSquares(tmpSquares);
    setXTurn(!xTurn);
  };

  return (
    <div>
      <div className='status'>{status}</div>
      {squares.map((e, i) => (
        <div key={i} className='board-row'>
          {squares[i].map((e, j) => (
            <Square key={[i, j]} value={squares[i][j]} onClick={() => handleClick(i, j)} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
