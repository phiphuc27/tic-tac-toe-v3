const express = require('express');
const router = express.Router();

const passport = require('passport');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or update profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { firstName, lastName, gender, birthday, avatar } = req.body;

    const profileFields = {};
    if (firstName) profileFields.firstName = firstName;
    if (lastName) profileFields.lastName = lastName;
    if (gender) profileFields.gender = gender;
    if (birthday) profileFields.birthday = birthday;
    if (avatar) profileFields.avatar = avatar;

    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
        );

        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id });

        if (!profile) return res.status(400).json({ msg: 'Profile not found!' });

        return res.json(profile);
    } catch (err) {
        console.error(error.message);

        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        return res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        return res.json({ msg: 'User deleted!' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
