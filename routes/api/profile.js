const express = require('express');

const router = express.Router();

// @route   POST api/profile
// @desc    Register user
// @access  Public
router.get('/', async (req, res) => {
    res.send('Profile');
});

module.exports = router;
