import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { moveJump } from '../../actions/game';

import './History.css';

const History = ({ game: { history, squares, step }, moveJump }) => {
    const [isAscending, toggleSort] = useState(true);

    const historyList = history.map((item, index) => (
        <li
            key={index + 1}
            className='history__item'
            onClick={() => moveJump(index + 1, history, squares)}
        >
            <input type='radio' id={index + 1} className='radio' name='history' />
            <label htmlFor={index + 1} className='radio--label'>
                {`${item.name.toUpperCase()} move to (${item.row + 1}, ${item.col + 1})`}
            </label>
        </li>
    ));

    return (
        <div className='history'>
            <div className='history__menu'>
                <div className='status'>
                    <p className='status__text'>Past Moves</p>
                </div>
                <select
                    name='sort'
                    className='history__sort'
                    onChange={() => toggleSort(!isAscending)}
                >
                    <option value='0'>Ascending</option>
                    <option value='1'>Descending</option>
                </select>
            </div>
            <ol className='history__list'>
                {!isAscending && historyList.sort((a, b) => b.key - a.key)}
                <li className='history__item' onClick={() => moveJump(0, history, squares)}>
                    <input type='radio' id={0} className='radio' name='history' defaultChecked />
                    <label htmlFor={0} className='radio--label'>
                        Go to game start
                    </label>
                </li>
                {isAscending && historyList.sort((a, b) => a.key - b.key)}
            </ol>
        </div>
    );
};

History.propTypes = {
    game: PropTypes.objectOf(PropTypes.any).isRequired,
    moveJump: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    game: state.game,
});

export default connect(mapStateToProps, { moveJump })(History);
