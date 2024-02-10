const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    released: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
        validate: { validator: type => type == "Movie" || type == "Serie" || type == "Video game", message: "Type must be either Movie, Serie or Video game" }
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    poster: {
        type: String,
        default: null
    },
    /* Informations pour les films uniquement */
    runtime: {
        type: Number,
        default: null
    },
    dvd_released: {
        type: Date,
        default: null
    },
    /* Informations mise à jour */
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

module.exports = mongoose.model('Media', mediaSchema)