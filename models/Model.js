const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: "Username is required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is required"
    },
    recent_search: [{
        type: String,
        trim: true
    }],
    home: {
        type: String,
        trim: true
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;