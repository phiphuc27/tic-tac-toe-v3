import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

import Alert from '../layout/Alert';

import './Auth.css';

const Register = ({ auth: { loading, isAuthenticated, user }, register, setAlert }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const { username, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Password do not match!', 'danger');
        } else {
            register({ username, email, password });
        }
    };

    if (isAuthenticated && user) return <Redirect to={`/profile/${user._id}`} />;

    return (
        <div className='authenticate'>
            <h3>Sign Up</h3>
            <p>
                <i className='fas fa-user' /> Create Your Account
            </p>
            <Form className='form' onSubmit={(e) => onSubmit(e)}>
                <Alert />
                <Form.Group controlId='formEmail'>
                    <Form.Label>
                        Username <span style={{ color: '#de3737' }}>*</span>
                    </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={(e) => onChange(e)}
                        required
                    />
                </Form.Group>

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
                    <Form.Text className='text-muted'>
                        We{`'`}ll never share your email with anyone else.
                    </Form.Text>
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

                <Form.Group controlId='formPassword2'>
                    <Form.Label>
                        Repeat Password <span style={{ color: '#de3737' }}>*</span>
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Repeat Password'
                        name='password2'
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
                        'Sign Up'
                    )}
                </Button>
            </Form>
            <p>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};

Register.propTypes = {
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    register: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
