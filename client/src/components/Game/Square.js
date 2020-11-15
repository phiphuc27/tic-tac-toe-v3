import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = ({ value, onClick, winner }) => {
    const winnerClass = winner && winner === value ? `winner--${winner.toLowerCase()}` : '';
    const SquareClass = value ? `square square--${value.toLowerCase()}` : 'square';
    return (
        <button className={`${SquareClass} ${winnerClass}`} onClick={onClick}>
            {value}
        </button>
    );
};

Square.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Square;
