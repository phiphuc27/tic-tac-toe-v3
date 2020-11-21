/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/profile';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { setAlert } from '../../actions/alert';

const ChangePassword = ({ setTab, changePassword, history, setAlert }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        newPassword2: '',
    });

    const { currentPassword, newPassword, newPassword2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== newPassword2) setAlert('Password do not match!', 'danger');
        changePassword({ currentPassword, newPassword }, history);
    };

    return (
        <Form className='form' onSubmit={(e) => onSubmit(e)}>
            <Form.Group as={Row} controlId='formCurrentPassword'>
                <Form.Label column sm={4}>
                    <h3>
                        Current Password <span style={{ color: '#de3737' }}>*</span>
                    </h3>
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name='currentPassword'
                        value={currentPassword}
                        onChange={(e) => onChange(e)}
                        type='password'
                        required
                    />
                </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId='formNewPassword'>
                <Form.Label column sm={4}>
                    <h3>
                        New Password <span style={{ color: '#de3737' }}>*</span>
                    </h3>
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name='newPassword'
                        value={newPassword}
                        onChange={(e) => onChange(e)}
                        type='password'
                        required
                    />
                </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId='formNewPassword2'>
                <Form.Label column sm={4}>
                    <h3>
                        Repeat Password <span style={{ color: '#de3737' }}>*</span>
                    </h3>
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name='newPassword2'
                        value={newPassword2}
                        onChange={(e) => onChange(e)}
                        type='password'
                        required
                    />
                </Col>
            </Form.Group>

            <div className='info__btn-group' style={{ justifyContent: 'flex-end' }}>
                <Button variant='secondary' onClick={() => setTab(0)}>
                    Cancel
                </Button>
                <Button variant='primary' type='submit'>
                    Save changes
                </Button>
            </div>
        </Form>
    );
};

ChangePassword.propTypes = {
    setTab: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, { changePassword, setAlert })(withRouter(ChangePassword));
