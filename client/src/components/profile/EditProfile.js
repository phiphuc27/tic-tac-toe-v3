/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profile';
import { Form, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

const EditProfile = ({ profile: { profile, loading }, setTab, updateProfile }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        gender: '',
        bio: '',
    });

    useEffect(() => {
        setFormData({
            firstName: loading || !profile.firstName ? '' : profile.firstName,
            lastName: loading || !profile.lastName ? '' : profile.lastName,
            birthday:
                loading || !profile.birthday ? '' : moment(profile.birthday).format('YYYY-MM-DD'),
            gender: loading || !profile.gender ? '' : profile.gender,
            bio: loading || !profile.bio ? '' : profile.bio,
        });
    }, [loading]);

    const { firstName, lastName, birthday, gender, bio } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        if (!loading) setTab(0);
    };

    return (
        <Form className='form' onSubmit={(e) => onSubmit(e)}>
            <Form.Group as={Row} controlId='formFirstName'>
                <Form.Label column sm={4}>
                    <h3>First Name</h3>
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name='firstName'
                        value={firstName}
                        onChange={(e) => onChange(e)}
                        type='text'
                    />
                </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId='formLastName'>
                <Form.Label column sm={4}>
                    <h3>Last Name</h3>
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name='lastName'
                        value={lastName}
                        onChange={(e) => onChange(e)}
                        type='text'
                    />
                </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId='formBirthDay'>
                <Form.Label column sm={4}>
                    <h3>Birth Day</h3>
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name='birthday'
                        value={birthday}
                        onChange={(e) => onChange(e)}
                        type='date'
                    />
                </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId='formGender'>
                <Form.Label column sm={4}>
                    <h3>Gender</h3>
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        as='select'
                        name='gender'
                        value={gender}
                        onChange={(e) => onChange(e)}
                    >
                        <option value='default'>Select Your Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId='formBio'>
                <Form.Label column sm={4}>
                    <h3>Bio</h3>
                </Form.Label>
                <Col sm={8}>
                    <Form.Control
                        name='bio'
                        value={bio}
                        onChange={(e) => onChange(e)}
                        as='textarea'
                        rows={5}
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

EditProfile.propTypes = {
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    setTab: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { updateProfile })(EditProfile);
