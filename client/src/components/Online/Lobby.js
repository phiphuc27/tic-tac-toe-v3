import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { SocketProvider, useSocket } from '../../SocketProvider';

import './Lobby.css';

function Lobby({ auth: { user, loading } }) {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('new-game', ({ user, room }) => {
            console.log(`user ${user} join ${room}`);
        });
    }, [socket]);

    const findPlayer = () => {
        socket.emit('join-room', { user: user._id });
    };

    return loading ? (
        <Spinner />
    ) : (
        <div className='lobby'>
            <h2>Online Lobby</h2>
            <p>player: {user._id}</p>
            <button className='btn btn-lobby' onClick={findPlayer}>
                Find Player
            </button>
        </div>
    );
}

function LobbyContainer({ auth }) {
    const { user } = auth;
    return (
        <SocketProvider id={user._id}>
            <Lobby auth={auth} />
        </SocketProvider>
    );
}

Lobby.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
};

LobbyContainer.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(LobbyContainer);
