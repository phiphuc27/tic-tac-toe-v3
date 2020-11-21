import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

import './Navbar.css';
import logo from '../../logo.svg';

const Navbar = ({ auth: { isAuthenticated, loading }, profile: { profile }, logout }) => {
    const guestLinks = (
        <ul>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    const authLinks = (
        <ul>
            {profile && (
                <li className='account'>
                    <div className='account-info'>
                        <img src={profile.avatar} alt='avatar' />
                        <span>
                            {!profile.firstName && !profile.lastName
                                ? profile.user.username
                                : `${profile.firstName} ${profile.lastName}`}
                        </span>
                        <i className='fas fa-caret-down' />
                    </div>
                    <div className='account-menu'>
                        <ul>
                            <li>
                                <Link to={`/profile/${profile.user._id}`}>
                                    <i className='fas fa-user' /> Profile
                                </Link>
                            </li>
                            <li>
                                <a href='/' onClick={() => logout()}>
                                    <i className='fas fa-sign-out-alt' />{' '}
                                    <span className='hide-sm'>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            )}
        </ul>
    );

    return (
        <nav className='navbar'>
            <h3>
                <Link to='/' className='navbar__title'>
                    <img className='navbar__logo' src={logo} alt='logo' />
                    Tic-Tac-Toe v3
                </Link>
            </h3>
            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </nav>
    );
};

Navbar.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { logout })(Navbar);
