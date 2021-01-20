import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { useSocket } from '../../SocketProvider';
import { findPlayer, startGame, setTurn, clearOnline } from '../../actions/online';
import { formatName } from '../../utils/Helpers';

import Game from './Game';
import Alert from '../layout/Alert';

import './Lobby.css';

function Lobby({
    auth: { user, loading: authLoading },
    online: { loading: onlineLoading, isFoundGame, opponent },
    profile: { profile },
    findPlayer,
    startGame,
    setTurn,
    clearOnline,
}) {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('new-game', ({ player, room }) => {
            if (player === room) {
                console.log(`you join ${room}`);
                if (room === user._id) {
                    findPlayer();
                } else {
                    startGame(room, room, () => {
                        setTurn(true);
                    });
                }
            } else {
                console.log(`user ${player} join ${room}`);
                startGame(player, room, () => {
                    setTurn(false);
                });
            }
        });

        socket.on('player-leave', () => {
            clearOnline();
        });

        return () => socket.offAny();
    });

    const handleFindPlayer = () => {
        socket.emit('join-room', { user: user._id });
    };

    if (authLoading) return <Spinner />;

    if (isFoundGame)
        return (
            <>
                <Alert />
                <Game />
            </>
        );

    return (
        <div className='lobby'>
            <Alert />
            <h2>Online Lobby</h2>
            <div className='lobby-info'>
                {profile && (
                    <>
                        <img src={profile.avatar} alt='avatar' />
                        <h4>{formatName(profile)}</h4>
                    </>
                )}
            </div>
            {onlineLoading ? (
                <>
                    <Spinner />
                    <p>Finding Player...</p>
                </>
            ) : (
                <button className='btn btn-lobby' onClick={handleFindPlayer}>
                    Find Player
                </button>
            )}
        </div>
    );
}

Lobby.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    online: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    findPlayer: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    setTurn: PropTypes.func.isRequired,
    clearOnline: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
    online: state.online,
});

export default connect(mapStateToProps, { findPlayer, startGame, setTurn, clearOnline })(Lobby);
