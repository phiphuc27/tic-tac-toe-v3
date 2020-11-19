const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    avatar: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
