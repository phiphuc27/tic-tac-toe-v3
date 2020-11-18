const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const config = require('config');

const User = require('../../models/User');

const BCRYPT_SALT_ROUNDS = 12;

// @route   POST api/user
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name is required!').not().isEmpty(),
        check('email', 'Please enter a valid email!').isEmail(),
        check('password', 'Password must be at least 6 characters!').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            const avatar = gravatar.url(
                email,
                {
                    s: '200',
                    r: 'x',
                    d: 'retro',
                },
                true
            );

            user = new User({
                name,
                email,
                avatar,
                password,
            });

            const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            return jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
