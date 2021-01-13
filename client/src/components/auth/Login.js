import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

import Alert from '../layout/Alert';

import './Auth.css';

const Login = ({ auth: { loading, isAuthenticated, user }, login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const location = useLocation();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        login({ email, password });
    };

    if (isAuthenticated && user)
        return <Redirect to={location.state ? location.state.from : `/profile/${user._id}`} />;

    return (
        <div className='authenticate'>
            <h3>Sign In</h3>
            <p>
                <i className='fas fa-user' /> Sign Into Your Account
            </p>
            <Form className='form' onSubmit={(e) => onSubmit(e)}>
                <Alert />
                <Form.Group controlId='formEmail'>
                    <Form.Label>
                        Email Address <span style={{ color: '#de3737' }}>*</span>
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        onChange={(e) => onChange(e)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='formPassword'>
                    <Form.Label>
                        Password <span style={{ color: '#de3737' }}>*</span>
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={(e) => onChange(e)}
                        required
                    />
                </Form.Group>

                <Button variant='primary' type='submit' className={loading && 'disabled'}>
                    {loading ? (
                        <>
                            <Spinner
                                animation='border'
                                variant='light'
                                size='md'
                                style={{ marginRight: '.5em' }}
                            />{' '}
                            Loading...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </Form>
            <p>
                Don{`'`}t have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </div>
    );
};

Login.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    login: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
