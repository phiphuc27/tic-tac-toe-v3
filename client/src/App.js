import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import './App.css';

import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Game from './components/Game/';
import Lobby from './components/Online/Lobby';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';

if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
}

function App({ loadUser }) {
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <>
            <Navbar />
            <div className='container'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/game' component={Game} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/profile/:user_id' component={Profile} />
                    <PrivateRoute exact path='/game/online' component={Lobby} />
                </Switch>
            </div>
        </>
    );
}

export default connect(null, { loadUser })(App);
