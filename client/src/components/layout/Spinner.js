import React from 'react';
import SpinnerBootstrap from 'react-bootstrap/Spinner';

const Spinner = () => {
    return (
        <div
            style={{
                height: '20vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <SpinnerBootstrap
                style={{ width: '100px', height: '100px' }}
                variant='dark'
                animation='border'
            />
        </div>
    );
};

export default Spinner;
