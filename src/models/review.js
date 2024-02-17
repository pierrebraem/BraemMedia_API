const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    iduser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    idmedia: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Media"
    },
    rated: {
        type: Number,
        required: true,
        validate: {
            validator: rated => rated >= 1 && rated <= 5,
            message: "Rated must be between 1 and 5"
        }
    },
    comment: {
        type: String,
        required: true,
        minLength: 10
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

module.exports = mongoose.model('Review', reviewSchema)