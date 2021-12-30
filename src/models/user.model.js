const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { boolean } = require('webidl-conversions');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Fullname can\'t be empty'
    },
    userName: {
        type: String,
        required: 'Username can\'t be empty',
        min: 4,
        max: 20,
        unique: true
    },

    email: {
        type: String
    },
    isEmailVerified: {
        type: Boolean
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [6, 'Password must be atleast 4 character long']
    },
    profilePicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    // saltSecret: String,
    description: {
        type: String,
        max: 60
    }

}, { timestamps: true })

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        "SECRET#123",                   /////this secret key shuld be in env
        { expiresIn: '20m' });          // jwt token expires in 20 min
}

module.exports = mongoose.model('User', userSchema);



