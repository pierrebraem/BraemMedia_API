const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    verified_email: {
        type: Boolean,
        required: true,
        default: false
    },
    birthdate: {
        type: Date,
        required: true
    },
    photo: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)