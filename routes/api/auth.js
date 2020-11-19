const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

// @route   GET api/auth
// @desc    Get token user
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json(req.user);
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please enter a valid email!').isEmail(),
        check('password', 'Password is required!').exists(),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err || !user) {
                    return res.status(400).json({ errors: [{ message: info.message }] });
                }

                req.login(user, { session: false }, (err) => {
                    if (err) return next(error);

                    const payload = {
                        user: {
                            id: user.id,
                        },
                    };

                    return jwt.sign(
                        payload,
                        config.get('jwtSecret'),
                        { expiresIn: 36000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });
                        }
                    );
                });
            } catch (err) {
                console.error(err.message);
                return res.status(500).send('Server Error.');
            }
        })(req, res, next);
    }
);

module.exports = router;
