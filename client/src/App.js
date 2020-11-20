import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import './App.css';

import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Game from './components/Game/';

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
                </Switch>
            </div>
        </>
    );
}

export default connect(null, { loadUser })(App);
