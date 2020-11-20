import React from 'react';
import logo from '../../logo.svg';

import './Home.css';

const Home = () => {
    return (
        <>
            <div className='hero'>
                <img className='hero-logo' src={logo} alt='logo' />
                <div className='hero-text'>
                    <h1 className='hero-title'>Tic-Tac-Toe</h1>
                    <h3 className='hero-subtitle'>Version 3</h3>
                </div>
            </div>
            <div className='hero__btn-group'>
                <a href='/game' className='btn btn-hero'>
                    Play Offline
                </a>
                <a href='/game/online' className='btn btn-hero disabled'>
                    Play Online
                </a>
            </div>
        </>
    );
};

export default Home;
