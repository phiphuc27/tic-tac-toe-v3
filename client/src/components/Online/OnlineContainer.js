import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SocketProvider } from '../../SocketProvider';

import Lobby from './Lobby';

function LobbyContainer({ auth: { user } }) {
    return (
        <SocketProvider id={user._id}>
            <Lobby />
        </SocketProvider>
    );
}

LobbyContainer.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(LobbyContainer);
