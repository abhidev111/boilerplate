const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

var usersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Fullname can\'t be empty'
    },
    userName: {
        type: String,
        required: 'Username can\'t be empty'
    },

    email: {
        type: String
    },
    isEmailVerified :{
        type : Boolean
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    saltSecret: String,
    lastActiveAt: Date,
    profile_created_at :Date,
    profile_updated_at :Date
})

module.exports = mongoose.model('Users', userSchema);



