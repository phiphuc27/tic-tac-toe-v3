import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Alert from '../layout/Alert';
import { getProfileById, uploadPhoto } from '../../actions/profile';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';

import './Profile.css';

import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const Profile = ({
    auth: { user, isAuthenticated },
    profile: { profile, loading },
    match,
    getProfileById,
    uploadPhoto,
}) => {
    const [tab, setTab] = useState(0);

    useEffect(() => {
        getProfileById(match.params.user_id);
    }, [getProfileById, match.params.user_id]);

    useEffect(() => {
        if (!isAuthenticated) setTab(0);
    }, [isAuthenticated]);

    return (
        <>
            {loading || profile === null ? (
                <Spinner />
            ) : (
                <div className='profile'>
                    <div className='profile-sidebar'>
                        <div className='profile__image'>
                            <img src={profile.avatar} alt={profile.user._id} />
                            {isAuthenticated && !loading && user._id === profile.user._id && (
                                <div className='profile__image-overlay'>
                                    <label htmlFor='editPhoto'>
                                        <i className='far fa-edit' />
                                        <input
                                            type='file'
                                            id='editPhoto'
                                            name='editPhoto'
                                            onChange={(e) => uploadPhoto(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                        <h2>@{profile.user.username}</h2>
                        {isAuthenticated && !loading && user._id === profile.user._id && (
                            <div className='profile__btn-group'>
                                <button className='btn btn-game' onClick={() => setTab(1)}>
                                    Edit Profile
                                </button>
                                <button className='btn btn-game' onClick={() => setTab(2)}>
                                    Change Password
                                </button>
                            </div>
                        )}
                    </div>
                    <div className='profile-info'>
                        <Alert />
                        {tab === 0 && (
                            <>
                                <h2>Profile</h2>
                                <div className='form'>
                                    <Row>
                                        <Col sm={4}>
                                            <h3>Name</h3>
                                        </Col>
                                        <Col sm={8}>
                                            <p>
                                                {profile.firstName} {profile.lastName}
                                            </p>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={4}>
                                            <h3>Birth Day</h3>
                                        </Col>
                                        <Col sm={8}>
                                            <p>
                                                {profile.birthday && (
                                                    <Moment format='YYYY/MM/DD'>
                                                        {profile.birthday}
                                                    </Moment>
                                                )}
                                            </p>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={4}>
                                            <h3>Gender</h3>
                                        </Col>
                                        <Col sm={8}>
                                            <p>{profile.gender}</p>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                        <Col sm={4}>
                                            <h3>Bio</h3>
                                        </Col>
                                        <Col sm={8}>
                                            <p>{profile.bio}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </>
                        )}
                        {tab === 1 && isAuthenticated && (
                            <>
                                <h2>Edit Profile</h2>
                                <EditProfile setTab={setTab} />
                            </>
                        )}
                        {tab === 2 && isAuthenticated && (
                            <>
                                <h2>Change Password</h2>
                                <ChangePassword setTab={setTab} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

Profile.propTypes = {
    profile: PropTypes.objectOf(PropTypes.any).isRequired,
    auth: PropTypes.objectOf(PropTypes.any).isRequired,
    getProfileById: PropTypes.func.isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, uploadPhoto })(Profile);
